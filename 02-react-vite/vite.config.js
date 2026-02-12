import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000, //Muda a porta padrão vite e react
    open: true, //Abre o navegador automaticamente
    host: true, //Permite que tenha acesso via IP na rede local
  },
})
