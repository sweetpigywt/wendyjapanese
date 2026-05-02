import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // 这个 base 选项能帮助浏览器在 GitHub Pages 上正确找到你的网页文件
  base: "/wendyjapanese/",
  
  plugins: [
    react()
  ],
  
  // 这个 resolve 配置是为了支持项目里的 "@/" 快捷路径寻找文件
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
