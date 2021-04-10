import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // css: {},
  // esbuild: {},
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [vue(), vueJsx()]
})
