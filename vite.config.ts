import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/newsapi': {
          target: 'https://newsapi.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/newsapi/, ''),
          headers: {
            'X-Api-Key': env.VITE_NEWS_API_KEY || '',
          },
        },
      },
    },
  }
})
