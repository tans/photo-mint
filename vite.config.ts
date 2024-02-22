import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import moduleWorkerChunkPlugin from "./vite-plugin.js";
import path from "path";
// https://vitejs.dev/config/

export default defineConfig(async () => ({
  plugins: [moduleWorkerChunkPlugin(), react()],
  optimizeDeps: {
    exclude: [
      "@jsquash/avif",
      "@jsquash/jpeg",
      "@jsquash/jxl",
      "@jsquash/png",
      "@jsquash/oxipng",
      "@jsquash/webp",
    ],
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
