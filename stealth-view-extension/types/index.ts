export enum Storage {
  IS_ENABLED = "isEnabled",
  IS_SV_PLAYLIST_ENABLED = "isSVPlaylistEnabled",
  IS_AUTO_SKIP_ENABLED = "isAutoSkipEnabled",

  LOCAL_SV_VIDEO_IDS = "local:sv-video-ids",
}

export type SV_STATUS = "activated" | "not-activated";

export interface ISettings {
  isEnabled: boolean;
  isSVPlaylistEnabled: boolean;
  isAutoSkipEnabled: boolean;
}

/*
{
"kind": "youtube#video",
"etag": "FVdiO_ZH9Bl1xKx4TTHHVPJOhSk",
"id": "W8YURGBzmPA",
"snippet": {
"publishedAt": "2024-12-31T11:35:36Z",
"channelId": "UC0d7NGWkJkc5HbjXh9cLTKA",
"title": "Youtube distraction blocker browser extension React, Typescript, WXT framework",
"description": "In this video, I show you how to create a cross browser extension that works with all the major browsers like chrome, firefox, edge and safari with just one codebase. \n\nWe are gonna be using all the modern tools like Vite, React and Tailwindcss. \n\nThank you.\n\nGithub repo: https://github.com/adityasinghcodes/wxt-browser-extension",
"thumbnails": {
"default": {
"url": "https://i.ytimg.com/vi/W8YURGBzmPA/default.jpg",
"width": 120,
"height": 90
},
"medium": {
"url": "https://i.ytimg.com/vi/W8YURGBzmPA/mqdefault.jpg",
"width": 320,
"height": 180
},
"high": {
"url": "https://i.ytimg.com/vi/W8YURGBzmPA/hqdefault.jpg",
"width": 480,
"height": 360
},
"standard": {
"url": "https://i.ytimg.com/vi/W8YURGBzmPA/sddefault.jpg",
"width": 640,
"height": 480
},
"maxres": {
"url": "https://i.ytimg.com/vi/W8YURGBzmPA/maxresdefault.jpg",
"width": 1280,
"height": 720
}
},
"channelTitle": "Aditya Singh - Codes",
"categoryId": "22",
"liveBroadcastContent": "none",
"localized": {
"title": "Youtube distraction blocker browser extension React, Typescript, WXT framework",
"description": "In this video, I show you how to create a cross browser extension that works with all the major browsers like chrome, firefox, edge and safari with just one codebase. \n\nWe are gonna be using all the modern tools like Vite, React and Tailwindcss. \n\nThank you.\n\nGithub repo: https://github.com/adityasinghcodes/wxt-browser-extension"
}
},
"contentDetails": {
"duration": "PT45M30S",
"dimension": "2d",
"definition": "hd",
"caption": "false",
"licensedContent": true,
"contentRating": {},
"projection": "rectangular"
},
"statistics": {
"viewCount": "1615",
"likeCount": "69",
"favoriteCount": "0",
"commentCount": "26"
}
},
*/

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    duration: string; // ISO 8601 duration format
    dimension: string; // "2d" or "3d"
    definition: string; // "sd" or "hd"
    caption: boolean; // true or false
    licensedContent: boolean; // true or false
    contentRating?: Record<string, unknown>; // Optional field for content rating
    projection: string; // "rectangular" or other values
  };
  statistics?: {
    viewCount?: string; // Optional field for view count
    likeCount?: string; // Optional field for like count
    favoriteCount?: string; // Optional field for favorite count
    commentCount?: string; // Optional field for comment count
  };
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
