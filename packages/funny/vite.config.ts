import { defineConfig } from 'vite'
import tailwind from 'tailwindcss'
import vue from '@vitejs/plugin-vue'
import path, {resolve} from 'path'
// 自动引入 element vue vue-router
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
 
export default defineConfig({
  // base: '/base/',
  build: {
    target: 'es2018',
    outDir: '../../dist/language',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      }
    }
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`
    }
  },
  plugins: [
    vue(),
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue'],
      dts: './auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwind(),
        // autoprefixer(),
      ]
    }
  },
  server: {
    port: 1998,
    // proxy 
  }
})