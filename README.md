# Patel Brothers’ Toy Drive website

A small static site built with [Astro](https://astro.build). No server, no database, no cost.

## Everyday tasks

| I want to… | Edit this |
|---|---|
| Change the deadline, addresses, Venmo handle, partners | `src/data/campaigns/2026.json` |
| Add drop-off hours | `hours` / `instructions` for the location in that file |
| Add toy guidance, the Venmo explanation, the brothers’ story, a contact email | the `content` section of that file |
| Publish past totals and last year’s photos | set the matching item under `confirmed` to `true` |
| Show the final toy count after the drive | `finalToyCount` in that file |
| Turn on analytics | paste the Umami website ID into `src/data/site.json` |
| Replace a photo | swap the file in `src/assets/photos/` (keep the name) |

Anything left as `null` is simply not shown on the public site.

## Running it

```bash
npm install        # once
npm run dev        # preview at http://localhost:4321/patel-bros-toy-drive/ (exactly what the public will see)
npm run build      # the real public site, written to dist/
```

## More

- `docs/updating-each-year.md` — starting next year’s drive
- `docs/measurement.md` — what is tracked and how to count real donations
- `docs/donation-log-template.csv` — the donation log
