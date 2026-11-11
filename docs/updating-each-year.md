# Starting a new year’s drive

1. Copy `src/data/campaigns/2026.json` to `src/data/campaigns/2027.json`.
2. In the new file update: `year`, `edition`, `deadline` (YYYY-MM-DD), `deadlineLabel`, locations, partners, and set `finalToyCount` back to `null`.
3. Add the new sign photo to `src/assets/photos/` and list it last under `signPhotos` with the label "This year". Remove that label from the previous year’s entry.
4. Add last year’s result to `src/data/history.json` (year, headline such as "912 toys", photo).
5. In `src/data/site.json` set `currentYear` to the new year.
6. Run `npm run dev`, check every page, then publish.

## What happens automatically

- **Countdown:** the strip at the top counts down to the deadline.
- **After the deadline:** from the day after `deadline` (US Eastern time) donation buttons disappear and a thank-you message appears. Add `finalToyCount` when you have it and the number shows on the home and Impact pages.
- To see the after-drive version early, add `?state=ended` to any page address.

## Changing where the site lives

`astro.config.mjs` holds the public address (`site` and `base`). With a custom domain, set `site` to it and `base` to `/`.
