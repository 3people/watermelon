import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import obfuscator from 'rollup-plugin-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        plugins: [
          obfuscator(),
        ],
      },
    },
    sourcemap: true,
  },
  base: '/',
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
