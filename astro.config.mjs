import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'hybrid',
  build: {
    outDir: './dist',
  },

  env: {
    schema: {
      TMDB_API_KEY: envField.string({ context: 'server', access: 'secret' })
    }
  },

  adapter: vercel()
});