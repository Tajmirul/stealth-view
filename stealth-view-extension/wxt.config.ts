import { defineConfig, UserManifest } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "StealthView",
    description: "Bypass youtube ads.",
    version: "1.0.1",
    permissions: ["tabs", "storage"],

    content_scripts: [
      {
        matches: ["*://*.youtube.com/*"],
        css: ["assets/style.css"],
      },
    ],
  },
});
