import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    // Requests to /api go to the Express server, so React and the server work as one site.
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});
