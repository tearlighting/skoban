import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import react from "@vitejs/plugin-react"
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), react()],
  //   esbuild: {
  //     jsxFactory: "h",
  //     jsxFragment: "Fragment",
  //   },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
