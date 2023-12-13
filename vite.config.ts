import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/DevelopmentNetworkApplicationFrontend/"
// })

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://github.com/Summit2/WEB_5_sem_frontend',
  plugins: [react()],
 
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:7070',
  //   },
  // },
  server: { port: 3000 },
})
