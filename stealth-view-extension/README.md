# StealthView

StealthView is a Chrome extension built to restore control over your YouTube experience. It skips ads automatically when possible, and when YouTube fights back with ad-blocker restrictions, StealthView has a smart fallback: just add the video to the StealthView Playlist and watch it outside of YouTube—smooth, clean, and ad-free.

✨ Features:
🧘‍♀️ Zen Mode: Enjoy YouTube without distractions.
⏩ Auto Ad Skipping: Automatically skips most ads while you're on YouTube.
🕶️ StealthView Playlist: Play videos outside YouTube to avoid ad-blocker detection.
🌌 Minimalist UI: Sleek, focused interface to help you stay in the zone.
🔐 Privacy Respecting: We don’t track you. Your data stays yours.

## How to build the extension

```bash
npm install -g pnpm
pnpm install

pnpm build // for cromium based browsers
pnpm build:firefox // for firefox
```

Then import the generated files from `.output` folder.

#### Versions

```
node: >= v18.20.6
pnpm: >= 10.4.1
```

## How to disable it

To change the settings, right-click the extension icon -> options. You'll see the available settings options.
