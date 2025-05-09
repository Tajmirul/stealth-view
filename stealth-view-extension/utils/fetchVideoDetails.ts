import { Video } from "@/types";
import axios from "axios";

export const fetchVideoDetails = async (videoIds: string[]) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const res = await axios.get(`${BACKEND_URL}/api/youtube-videos`, {
    params: {
      videoIds: videoIds.join(","),
    },
  });

  return res.data.items as Video[];
};
