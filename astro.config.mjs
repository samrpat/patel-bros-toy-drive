import { defineConfig } from 'astro/config';

// `site` + `base` together are the public address of the site.
// Hosted on GitHub Pages with the custom domain patelbrostoydrive.org (see public/CNAME).
// Without a custom domain it would be site 'https://samrpat.github.io' + base '/patel-bros-toy-drive'.
export default defineConfig({
  site: 'https://patelbrostoydrive.org',
  base: '/',
  trailingSlash: 'always',
  server: { port: 4321 },
});
