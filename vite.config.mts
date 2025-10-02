import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const repoName = "farmadyn-react";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? `/${repoName}/` : "/";

  return {
    base,
    server: {
      host: true
    },
    plugins: [
      react(),
      qrcode(),
      {
        name: "copy-404",
        closeBundle() {
          const outDir = resolve(process.cwd(), "dist");
          const indexHtml = resolve(outDir, "index.html");
          const notFoundHtml = resolve(outDir, "404.html");
          if (existsSync(indexHtml)) {
            copyFileSync(indexHtml, notFoundHtml);
          }
        }
      }
    ]
  };
});
