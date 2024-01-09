import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path, { resolve } from 'path'
import tailwind from 'tailwindcss'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const env = 'dev'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: [
        'src/components',
      ]
    })
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer(),
      ]
    }
  },
  server: {
    port: 1993,
  },
})
