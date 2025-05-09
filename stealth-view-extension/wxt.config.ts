import { defineConfig, UserManifest } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "StealthView",
    description: "Skip or bypass youtube ads.",
    version: "1.0.0",
    permissions: ["tabs", "storage"],

    content_scripts: [
      {
        matches: ["*://*.youtube.com/*"],
        css: ["assets/style.css"],
      },
    ],
  },
});
