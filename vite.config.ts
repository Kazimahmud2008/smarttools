import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client", // Vite will look for index.html in client/
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  build: {
    outDir: "../dist", // output goes outside client/, in dist/
    emptyOutDir: true,
  },
});
