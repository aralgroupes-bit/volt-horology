import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    // Le fichier App.jsx contient des images base64 de plusieurs Mo,
    // on augmente la limite d'avertissement.
    chunkSizeWarningLimit: 5000,
  },
});
