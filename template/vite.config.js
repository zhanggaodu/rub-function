import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path, { resolve } from 'path'
import tailwind from 'tailwindcss'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const env = 'dev'
const rewriteDefaultConfig = {
  changeOrigin: true,
  // target: `https://art-my-${env}.windimg.com/`,
  target: `http://10.129.152.57:8080/`,
  ws: true,
  headers: {
    referer: 'windimg.com'
  },

  logLevel: 'debug',
  configure: proxy => {
    proxy.on('proxyReq', (req, a) => {
      req.removeHeader('Connection') // npm node-http-proxy
    })
  },
  onProxyRes: proxyResponse => {
    if (proxyResponse.headers['set-cookie']) {
      const cookies = proxyResponse.headers['set-cookie'].map(cookie =>
        cookie.replace(/; secure/gi, '')
      );
      proxyResponse.headers['set-cookie'] = cookies;
    }
  }
}

const proxy = {
  '/api': rewriteDefaultConfig,
  '/passport': rewriteDefaultConfig,
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rush_assets_cdnhost/projectName/',
  build: {
    target: 'es2018',
    outDir: '../../dist/projectName',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      }
    }
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: [
        'src/components',
      ]
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
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
    proxy
  },
})
