import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Si vous avez des variables ou des mixins globales, vous pouvez les ajouter ici
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
})
