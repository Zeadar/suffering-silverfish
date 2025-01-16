import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(() => {
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:7878",
                    changeOrigin: true,
                },
            },
        },
    }
})
