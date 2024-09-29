import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        // Add id="vscode-codicon-stylesheet" to the existing link tag
        return html.replace(/<link rel="stylesheet" href="\.\/assets\/index-[^"]+\.css">/, (match) =>
          match.replace("<link", '<link id="vscode-codicon-stylesheet"')
        );
      },
    },
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
