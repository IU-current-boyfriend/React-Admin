import type { PluginOption } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa"; // PWA应用
import { visualizer } from "rollup-plugin-visualizer"; // Visualize包分析大小
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";

export function createVitePlugins(viteConfig: ViteEnv): (PluginOption | PluginOption[])[] {
  console.log("report: =>", viteConfig.VITE_REPORT);

  return [
    react(),
    // esLint 错误消息显示在浏览器界面上
    checker({ typescript: true }),
    // 创建打包压缩配置
    createCompression(viteConfig),
    // 向html页面中注入变量
    createHtmlPlugin({
      inject: {
        data: {
          title: viteConfig.VITE_GLOB_APP_TITLE
        }
      }
    }),
    // 创建svg icons
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd()), "src/assets/icons"],
      symbolId: "icon-[dir]-[name]"
    }),
    // vitePWA
    viteConfig.VITE_PWA && createVitePwa(viteConfig),
    // 是否生成包预览，分析相关的包大小以进行优化
    viteConfig.VITE_REPORT && (visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true }) as PluginOption)
  ];
}

function createCompression(viteConfig: ViteEnv): PluginOption | PluginOption[] {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteConfig;
  const compressionList = VITE_BUILD_COMPRESS.split(",");
  const plugins: PluginOption[] = [];
  if (compressionList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressionList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
}

function createVitePwa(viteConfig: ViteEnv): PluginOption | PluginOption[] {
  const { VITE_GLOB_APP_TITLE } = viteConfig;

  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        // src路径针对于public文件夹
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
    // devOptions: {
    //   // 如果想在`vite dev`命令下调试PWA, 必须启用它
    //   enabled: true,
    //   // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致
    //   type: "module"
    // }
  });
}
