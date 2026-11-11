# Measuring whether the website leads to donations

## Three tiers — never mix them

| Tier | What it means | Where it comes from |
|---|---|---|
| **Verified** | A Venmo payment whose note reads "Toy Drive (web)" | Venmo transaction history |
| **Organiser-reported** | Toys counted, shipped parcels received, Venmo payments without that note | The donation log |
| **Unverified actions** | Someone tapped a button on the site | Analytics |

A tap is never counted as a donation.

## What the site records

| Event | Fires when | Funnel step |
|---|---|---|
| Page view | A page loads | 1. Arrived |
| `donate_view` | The donation cards reach the middle of the screen, or the Donate page opens. Once per page load. | 2. Viewed donation information |
| `method_select` (`method`: venmo / dropoff / ship) | A method chip or "Drop-off details" is tapped | 3. Selected a method |
| `venmo_open` | "Give with Venmo" is tapped | 3 + 4 |
| `directions_click` (`location`) | "Directions" is tapped | 3 + 4 |
| `address_copy` | "Copy address" is tapped | 3 + 4 |
| `share_click` | "Share this page" is tapped | — |

Step 3 = `method_select` **or** any step-4 event (on the home page the cards let people act without a separate "select" tap).

Not recorded: names, emails, payment details, anything typed. No cookies.

## Weekly routine (about five minutes)

1. Open Venmo → the account’s transaction history (or Statements → download CSV).
2. For each new toy-drive payment, add a row to the donation log. Mark **Website note = Yes** if the note says "Toy Drive (web)".
3. Add rows for toys dropped off and parcels received since last time.

## Working out the numbers

| Metric | How |
|---|---|
| Visitor → verified donation rate | Verified Venmo donations ÷ unique visitors |
| Venmo completion rate | Verified Venmo donations ÷ `venmo_open` events |
| Drop-off at each step | Compare the counts for steps 1 → 2 → 3 → 4 in Umami |
| Average web donation | Total of verified Venmo amounts ÷ number of them |
| Donations by method | Count rows in the log by method |

Always quote the raw counts beside any percentage: with a few hundred visitors, one donation moves the rate a lot.

## Limits to keep in mind

- Donors can edit the Venmo note, so "verified" is a **minimum**.
- The flyer’s QR code opens Venmo with no note. Those payments are organiser-reported, not website donations.
- Shipped toys and drop-offs cannot be tied to a website visit.
- Visitors with ad blockers may not be counted.
- Umami does not use cookies, so "returning visitor" figures are approximate.

## Switching to Google Analytics later

In `src/data/site.json` set `"provider": "ga4"` and fill in `ga4MeasurementId`. Event names stay the same. Google Analytics uses cookies, so add a consent notice if you switch.

## Local previews are not counted

The tracking tag only reports visits on `samrpat.github.io` (`umamiDomains` in `src/data/site.json`), so testing on your own computer never inflates the numbers. If the site moves to another address, update that setting.
