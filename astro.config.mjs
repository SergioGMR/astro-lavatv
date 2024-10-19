import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon()],
  output: 'server',
  build: {
    outDir: './dist',
  },

  env: {
    schema: {
      TMDB_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      OPENWEATHER_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    }
  },

  adapter: vercel()
});