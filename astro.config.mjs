// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // PENDENTE: confirmar o domínio registrado no Registro.br
  site: 'https://www.cefon.com.br',

  build: {
    // CSS embutido no HTML: uma requisição a menos antes de desenhar a página
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
