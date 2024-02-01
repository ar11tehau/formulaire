import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
   return {
      plugins: [
         vue(),
      ],
      server: {
         port: 8000,
         open: true,
         proxy: {
            '^/api/.*': {
               target: 'https://tickets.domelier.fr',
               ws: true,
               secure: false,
               changeOrigin: true,
            },
         }
      },
   }
})