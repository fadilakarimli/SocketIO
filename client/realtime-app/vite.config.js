import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://socketio-qvbx.onrender.com",
        ws: true,
      },
    },
  },
});
