import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"
import path from "path";

export default defineConfig({
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
