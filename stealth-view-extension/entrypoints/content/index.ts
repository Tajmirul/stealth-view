import { SV_STATUS, ISettings, Storage } from "@/types";
import { getVideoIdFromUrl } from "@/utils/getVideoIdFromUrl";
import stealthViewLogo from "@/assets/icons/svg/stealth-view.svg";

let adCheckInterval: NodeJS.Timeout;

const buttonSizes = {
  sm: {
    width: "22px",
    height: "22px",
  },
  md: {
    width: "30px",
    height: "30px",
  },
  lg: {
    width: "40px",
    height: "40px",
  },
};

const getAddToBlockerButton = (
  videoId: string,
  size: keyof typeof buttonSizes = "sm"
) => {
  // const stealthViewButtonImg = `<img src="${stealthViewLogo}" alt="Logo" width="${buttonSizes[size].width}" />`;
  const stealthViewButtonImg = document.createElement("img");
  stealthViewButtonImg.src = stealthViewLogo;
  stealthViewButtonImg.alt = "Logo";
  stealthViewButtonImg.width = parseInt(buttonSizes[size].width);

  const blockerSaveButton = document.createElement("button");
  blockerSaveButton.classList.add("ytp-button", "add-to-blocker-button");
  blockerSaveButton.style.display = "inline-flex";
  blockerSaveButton.style.justifyContent = "center";
  blockerSaveButton.ariaLabel = "Add to StealthView";

  blockerSaveButton.addEventListener("click", async () => {
    if (!videoId) {
      return;
    }

    const svVideoIdsStr = (await storage.getItem(Storage.LOCAL_SV_VIDEO_IDS, {
      fallback: "[]",
    })) as string;
    const svVideoIds = JSON.parse(svVideoIdsStr) as string[];

    if (svVideoIds.includes(videoId)) return;

    svVideoIds.push(videoId);
    await storage.setItem(
      Storage.LOCAL_SV_VIDEO_IDS,
      JSON.stringify(svVideoIds)
    );

    blockerSaveButton.style.opacity = "0";
    blockerSaveButton.style.visibility = "hidden";
  });

  blockerSaveButton.innerHTML = "";
  blockerSaveButton.appendChild(stealthViewButtonImg);

  return blockerSaveButton;
};

const clickSkipButton = () => {
  const skipButton = document.querySelector(
    ".ytp-skip-ad-button"
  ) as HTMLDivElement;
  const skipButtonModern = document.querySelector(
    ".ytp-ad-skip-button-modern"
  ) as HTMLDivElement;

  if (!!skipButtonModern) {
    skipButtonModern.click();
  }

  if (!!skipButton) {
    skipButton.click();
  }
};

const skipAds = () => {
  const adElement = document.querySelector(
    ".ad-showing.ad-interrupting video"
  ) as HTMLVideoElement;

  if (!adElement) {
    return;
  }

  if (adElement.readyState >= 3) {
    adElement.currentTime = adElement.duration;
  }

  setTimeout(clickSkipButton, 500);

  // const overlayAds = document.querySelectorAll(
  //   ".ytp-ad-overlay-slot"
  // ) as NodeListOf<HTMLElement>;

  // overlayAds.forEach((overlayAd) => {
  //   overlayAd.style.visibility = "hidden";
  // });
};

// This function is used to add the "Add to Blocker" button to the video player
const addSvToVideoPlayer = async () => {
  const videoId = new URLSearchParams(window.location.search).get("v");

  const addToBlockerButton = await getAddToBlockerButton(videoId || "");

  const youtubeRightControl = document.querySelector(".ytp-right-controls");

  youtubeRightControl?.querySelector(".add-to-blocker-button")?.remove();

  youtubeRightControl?.prepend(addToBlockerButton);
};
const addSvToVideoPlayerThumbnail = () => {
  const thumbnailLinks = document.querySelectorAll(
    "ytd-watch-flexy ytd-thumbnail a.ytd-thumbnail"
  );

  Array.from(thumbnailLinks).forEach((thumbnailLink) => {
    const thumbnailLinkParent = thumbnailLink.parentElement;
    thumbnailLinkParent?.classList.add("add-to-blocker-button-parent");
    const link = thumbnailLink.getAttribute("href");
    const videoId = getVideoIdFromUrl(link);

    if (!videoId) return;

    const addToBlockerButton = getAddToBlockerButton(videoId || "", "md");

    thumbnailLinkParent?.append(addToBlockerButton);
  });
};
const addSvToHomePage = () => {
  const mutationTarget = document.querySelector("ytd-video-preview");

  if (mutationTarget) {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes") {
          const link = mutationTarget.querySelector("#media-container-link");
          const href = link?.getAttribute("href");
          const videoId = getVideoIdFromUrl(href);

          if (!videoId) return;

          // Remove existing buttons to avoid duplicates
          mutationTarget
            .querySelectorAll(".add-to-blocker-button")
            ?.forEach((el) => el.remove());

          const addToBlockerButton = getAddToBlockerButton(videoId, "lg");

          mutationTarget.appendChild(addToBlockerButton);
        }
      }
    });

    observer.observe(mutationTarget, {
      attributes: true,
    });

    // To stop observing later: observer.disconnect();
  }
};

// add StealthView functions depending on page url
const addSvToPage = async (url: URL) => {
  const pathname = url.pathname;

  const settings: ISettings = (await browser.storage.sync.get([
    Storage.IS_AUTO_SKIP_ENABLED,
    Storage.IS_SV_PLAYLIST_ENABLED,
  ])) as ISettings;
  const { isAutoSkipEnabled = true, isSVPlaylistEnabled = true } = settings;

  if (pathname === "/watch") {
    if (isAutoSkipEnabled) {
      adCheckInterval = setInterval(skipAds, 300);
      skipAds();
    }

    if (isSVPlaylistEnabled) {
      await addSvToVideoPlayer();
      setTimeout(addSvToVideoPlayerThumbnail, 2000);
    }
  }

  if (isSVPlaylistEnabled && (pathname === "/" || pathname === "/results")) {
    setTimeout(addSvToHomePage, 1000);
    clearInterval(adCheckInterval);
  }
};

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  async main(ctx) {
    const { isEnabled = true } = await browser.storage.sync.get(
      Storage.IS_ENABLED
    );

    if (!isEnabled) return;

    // add event listeners to the page url changes
    ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
      await addSvToPage(new URL(newUrl));
    });

    await addSvToPage(new URL(window.location.href));
  },
});
