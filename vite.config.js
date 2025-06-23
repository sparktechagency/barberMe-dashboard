import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // host: "10.0.70.111",
    host: "172.31.3.6",
    // port: 3000,
  },
});
