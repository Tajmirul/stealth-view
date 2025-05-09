browser.tabs.create({
  url: browser.runtime.getURL("/player.html"),
  active: true,
});
