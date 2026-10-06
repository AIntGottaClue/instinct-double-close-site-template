import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://atlanta.wholesaledoubleclose.click',
  base: process.env.BASE ?? '/', 
  integrations: [sitemap({ filenameBase: 'sitemap' })],
  trailingSlash: 'always',
  build: { format: 'directory' }
});

