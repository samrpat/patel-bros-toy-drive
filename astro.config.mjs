import { defineConfig } from 'astro/config';

// `site` + `base` together are the public address of the site.
// GitHub Pages (reusing last year's repository): https://samrpat.github.io/patel-bros-toy-drive/
// With a custom domain or Cloudflare Pages, set `site` to that address and `base` to '/'.
export default defineConfig({
  site: 'https://samrpat.github.io',
  base: '/patel-bros-toy-drive',
  trailingSlash: 'always',
  server: { port: 4321 },
});
