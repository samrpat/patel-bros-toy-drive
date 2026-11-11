import { href, REVIEW } from '../lib/campaign.js';
export function GET({ site }) {
  const body = REVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(href('/sitemap.xml'), site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
