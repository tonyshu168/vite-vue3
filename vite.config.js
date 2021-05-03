import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // css: {},
  // esbuild: {},
  alias: {
    '@': path.resolve(__dirname, 'src'),
    'comps': path.resolve(__dirname, 'src/components'),
    'apis': path.resolve(__dirname, 'src/apis'),
    'views': path.resolve(__dirname, 'src/views'),
    'utils': path.resolve(__dirname, 'src/utils'),
    'routes': path.resolve(__dirname, 'src/routes'),
    'router': path.resolve(__dirname, 'src/router'),
    'styles': path.resolve(__dirname, 'src/styles'),
    'store': path.resolve(__dirname, 'src/store'),
    'plugins': path.resolve(__dirname, 'src/plugins')
  },
  plugins: [vue(), vueJsx(), viteMockServe({
    supportTs: false               // 对typescript的支持的开关
  })]
})
