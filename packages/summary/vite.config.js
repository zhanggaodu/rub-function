import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path, { resolve } from 'path'
import tailwind from 'tailwindcss'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'

const env = 'dev'
const rewriteDefaultConfig = {
  changeOrigin: true,
  // target: `https://art-my-${env}.windimg.com/`,
  target: `http://10.129.154.63:8080/`,
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
  base: '/rush_assets_cdnhost/summary/',
  build: {
    target: 'es2018',
    outDir: '../../dist/summary',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        detail: resolve(__dirname, 'detail.html')
      }
    }
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: [
        'src/components',
      ],
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
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
