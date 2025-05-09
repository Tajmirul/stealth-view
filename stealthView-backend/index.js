const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// YouTube video info endpoint
app.get("/api/youtube-videos", async (req, res) => {
  try {
    const { videoIds } = req.query;

    if (!videoIds) {
      return res.json({ items: [] });
    }

    // YouTube API key from environment variable
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "YouTube API key is not configured",
      });
    }

    // Fetch video information from YouTube API
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&part=snippet,contentDetails,statistics&key=${apiKey}`
    );

    // Return the video information
    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching YouTube video info:", error);
    return res.status(500).json({
      error: "Failed to fetch video information",
      message: error.message,
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless deployment
module.exports = app;
