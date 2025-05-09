/**
 * urlString can be link of video or shorts. e.g:
 * /watch?v=EtbZSggo7sk
 * /shorts/gs1kAlN1NIw
 * @param url
 * @returns
 */
export const getVideoIdFromUrl = (url?: string | null) => {
  if (!url) return null;

  const regex = /\/?(watch\/?)?(shorts\/)?\??v?=?([^#&?]*)/;

  const match = url.toString().match(regex);

  return match?.[3] || null;
};
