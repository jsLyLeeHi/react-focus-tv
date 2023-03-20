import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacyPlugin from '@vitejs/plugin-legacy'
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacyPlugin({
      targets: ['chrome 52'],  // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    })
  ],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        //启用或禁用 Less 中的 JavaScript 支持
        javascriptEnabled: true,
      },
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 10010,
    host: "0.0.0.0",
  },
})
