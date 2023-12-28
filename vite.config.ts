import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  base: '/WEB_5_sem_frontend/',
  plugins: [react()],
 
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:7070',
  //   },
  // },
  server: { port: 3000 },
})
