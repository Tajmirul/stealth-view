export {};

declare global {
  interface Window {
    YT: any; // YouTube player object
    onYouTubeIframeAPIReady: () => void; // Function to be called when the YouTube IFrame API is ready
  }
}
