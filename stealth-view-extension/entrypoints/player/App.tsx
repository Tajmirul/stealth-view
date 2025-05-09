import { Storage, Video } from "@/types";
import { cn } from "@/utils";
import { fetchVideoDetails } from "@/utils/fetchVideoDetails";
import { RefreshCcw, Trash } from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [viewFullDescription, setViewFullDescription] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    const videoIdsString = (await storage.getItem(Storage.LOCAL_SV_VIDEO_IDS, {
      fallback: "[]",
    })) as string;
    const parsedVideoIds = JSON.parse(videoIdsString) as string[];

    return parsedVideoIds;
  };

  useEffect(() => {
    handleListRefresh();
  }, []);

  useEffect(() => {
    storage.watch(Storage.LOCAL_SV_VIDEO_IDS, () => {
      handleListRefresh();
    });

    return () => {
      storage.unwatch();
    };
  }, []);

  const handleVideoClick = (index: number) => {
    setSelectedVideo(videos[index]);
  };

  const handleListRefresh = () => {
    fetchVideos()
      .then(fetchVideoDetails)
      .then((videoDetails) => {
        if (!videoDetails.length) return;

        setVideos(videoDetails);
        if (!selectedVideo) setSelectedVideo(videoDetails[0]);
      });
  };

  const handleVideoRemove = (videoId: string) => {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);

    const updatedVideoIds = updatedVideos.map((video) => video.id);
    storage.setItem(
      Storage.LOCAL_SV_VIDEO_IDS,
      JSON.stringify(updatedVideoIds)
    );

    if (videoId === selectedVideo?.id) {
      setSelectedVideo(updatedVideos[0] || null);
    }
  };

  const handleClearList = () => {
    setVideos([]);
    setSelectedVideo(null);
    storage.removeItem(Storage.LOCAL_SV_VIDEO_IDS);
  };

  return (
    <div className="max-w-[1536px] px-4 grid lg:grid-cols-12 gap-5 mx-auto my-10">
      <div className="lg:col-span-8">
        {selectedVideo ? (
          <>
            <iframe
              id="youTubeIframe"
              width="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&enablejsapi=1`}
              title={selectedVideo.snippet.title}
              className="aspect-video w-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <h1 className="text-lg font-semibold mt-4">
              {selectedVideo.snippet.title}
            </h1>

            <p
              className={cn(
                "text-sm text-neutral-200 mt-2 whitespace-pre-wrap bg-neutral-600 p-4 rounded-lg cursor-pointer hover:bg-neutral-700",
                {
                  "line-clamp-3": !viewFullDescription,
                }
              )}
              onClick={() => setViewFullDescription((prev) => !prev)}
            >
              {selectedVideo.snippet.description}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center aspect-video bg-neutral-700 rounded-xl">
            <img src="/icon/128.png" alt="" className="opacity-10" />
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="border border-neutral-600 rounded-xl overflow-hidden">
          <div className="bg-neutral-700 flex justify-between items-center px-5 py-3">
            <div className="">
              <h5 className="text-xl font-medium">Queue</h5>
              <p className="text-xs text-neutral-400 font-medium">
                {videos.length} videos
              </p>
            </div>

            <button
              className="py-2 px-4 flex items-center justify-center hover:bg-neutral-800 border border-neutral-500/50 rounded-full group transition-all"
              onClick={handleClearList}
            >
              <Trash
                size={18}
                className="group-hover:rotate-[30deg] transition-all"
              />
              <span className="ml-2">Clear</span>
            </button>
          </div>

          <div className="my-4 min-h-[100px]">
            {!videos.length ? (
              <div className="text-center px-4 pt-5">
                <p className="text-neutral-400">No videos found</p>
                <p className="text-neutral-400">
                  Please add some videos to the list.
                </p>
              </div>
            ) : (
              videos.map((video, index) => (
                <div key={video.id} className={cn("relative group")}>
                  <div
                    className={cn(
                      "flex items-center gap-4 cursor-pointer px-5 py-2 transition-all hover:bg-neutral-700/70",
                      {
                        "bg-neutral-700/50": selectedVideo?.id === video.id,
                      }
                    )}
                    onClick={() => handleVideoClick(index)}
                  >
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="aspect-video w-[120px] rounded-md"
                      loading="lazy"
                    />
                    <h3 className="text-sm font-medium line-clamp-2">
                      {video.snippet.title}
                    </h3>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 right-5 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      className="size-10 bg-red-500 text-white rounded-lg flex items-center justify-center"
                      onClick={() => handleVideoRemove(video.id)}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
