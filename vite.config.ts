import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { wrapperEnv } from "./build/getEnv";
import { createVitePlugins } from "./build/plugins";
import { createProxy } from "./build/proxy";
import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;

// APP创建信息
const __APP_INFO__ = {
  pkg: {
    dependencies,
    devDependencies,
    name,
    version
  },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取用户项目根目录
  const root = process.cwd();
  // 获取用户运行环境
  const env = loadEnv(mode, root);
  // 获取vite当前current运行环境对象
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      /* esbuild 模式打包会快，但是不能够移除console.log，terser模式打包虽然慢一些，但是可以
        移除console.log
        minify: "terser",
        terserOptions: {
          compress: {
            drop_console: viteEnv.VITE_DROP_CONSOLE,
            drop_debugger: true
          }
        }
      */
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 静态资源分类和打包
          chunkFileNames: "aseets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
