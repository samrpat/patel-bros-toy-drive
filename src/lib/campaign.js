// Loads the current campaign and exposes helpers used by pages and components.
import site from '../data/site.json';
import history from '../data/history.json';

const campaigns = import.meta.glob('../data/campaigns/*.json', { eager: true, import: 'default' });
const campaign = campaigns[`../data/campaigns/${site.currentYear}.json`];
if (!campaign) throw new Error(`No campaign file for ${site.currentYear} in src/data/campaigns/`);

// Review mode shows unconfirmed content with a yellow tag. It is OFF unless
// you run `npm run build:review` (or start the preview with REVIEW=1).
export const REVIEW = process.env.REVIEW === '1';

/** Has the organiser confirmed this item? */
export const isConfirmed = (key) => campaign.confirmed?.[key] === true;
/** Should this item be rendered at all? */
export const canShow = (key) => isConfirmed(key) || REVIEW;

// Links must include the site's base path (e.g. /patel-bros-toy-drive/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path = '/') => `${base}${path}`;

export const venmoUrl = () =>
  `https://venmo.com/${campaign.venmo.handle}?txn=pay&note=${encodeURIComponent(campaign.venmo.note)}`;

export const directionsUrl = (loc) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.street}, ${loc.city}`)}`;

// Photos and logos are imported so Astro can resize and compress them.
const photos = import.meta.glob('../assets/photos/*', { eager: true, import: 'default' });
const logos = import.meta.glob('../assets/logos/*', { eager: true, import: 'default' });
export const photo = (file) => {
  const p = photos[`../assets/photos/${file}`];
  if (!p) throw new Error(`Missing photo: src/assets/photos/${file}`);
  return p;
};
export const logo = (file) => {
  const l = logos[`../assets/logos/${file}`];
  if (!l) throw new Error(`Missing logo: src/assets/logos/${file}`);
  return l;
};

export { site, campaign, history };
