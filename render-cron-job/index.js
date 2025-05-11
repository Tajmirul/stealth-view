fetch("https://stealth-view.onrender.com/api/youtube-videos")
  .then((res) => {
    if (res.ok) {
      console.log("Render cron job executed successfully");
    } else {
      console.error("Failed to execute Render cron job");
    }
  })
  .catch((err) => {
    console.error("Error executing Render cron job:", err);
  });
