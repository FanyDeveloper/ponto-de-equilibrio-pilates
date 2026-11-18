import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Modo "prévia": caminhos relativos para rodar em qualquer subpasta
const relativeImages = (): Plugin => ({
  name: 'relative-images',
  transform(code, id) {
    if (id.includes('/src/') && /\.(tsx?|css)$/.test(id)) return code.replaceAll('/images/', './images/')
  },
})

export default defineConfig(({ mode }) => ({
  base: mode === 'preview-hash' ? './' : '/',
  plugins: [react(), tailwindcss(), ...(mode === 'preview-hash' ? [relativeImages()] : [])],
}))
