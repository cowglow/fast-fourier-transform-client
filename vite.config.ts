import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: "/fast-fourier-transform-client",
    plugins: [react()],
    server: {
        proxy: {
            "/rf": {
                target: "ws://localhost:3001",
                ws: true,
                changeOrigin: true
            }
        }
    }
})
