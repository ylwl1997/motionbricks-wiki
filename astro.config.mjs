// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://motionbricks.wiki',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
