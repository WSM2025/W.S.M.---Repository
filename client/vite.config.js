import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  test: {
    globals: true,
    environment: 'node',

    include: ['test/**/*.test.js'],

    // 🔥 ESSENCIAL PRA PEGAR ARQUIVOS FORA DO CLIENT
    server: {
      deps: {
        inline: ['../src']
      }
    },

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',

      // 🔥 CAMINHO CORRETO
      include: ['../src/controller/**/*.js'],

      exclude: [
        'node_modules/',
        'test/',
      ]
    }
  }
})