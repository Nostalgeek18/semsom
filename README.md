# semsom.ca — Semsom Resto-Lounge

Static, bilingual (FR/EN) one-page site for Semsom Resto-Lounge, 771 boul. Décarie, Saint-Laurent.
No build step, no framework: plain HTML, CSS and a small script. Host it anywhere (Netlify, GitHub Pages, cPanel…).

## Structure

```
index.html            French page (default, https://www.semsom.ca/)
en/index.html         English page (https://www.semsom.ca/en/)
css/base.css          Shared styles: colours, type, buttons, cards, menu items
css/mobile.css        Mobile layout only (loaded below 768px)
css/desktop.css       Desktop/tablet layout only (loaded from 768px)
js/main.js            Menu tabs (without JS, every category shows in a list)
images/               Photos, logo, favicon, hiring poster
robots.txt, sitemap.xml
```

### Desktop vs mobile

Both layouts share the same HTML, so the content (menu, hours, text) is written once.
The layout files are separate and only load at their screen size:

```html
<link rel="stylesheet" href="css/mobile.css"  media="(max-width: 767px)">
<link rel="stylesheet" href="css/desktop.css" media="(min-width: 768px)">
```

- Mobile-only elements: section chips under the header, round call button, bottom action bar (Réserver / Itinéraire / Menu).
- Desktop-only elements: header navigation; the phone number shows as text instead of a call button.

To change the breakpoint, update both `media` attributes in **both** HTML files.

## Editing content

French and English are two separate pages. When you change the menu, prices, hours or text,
edit `index.html` **and** `en/index.html`.

- **Menu:** each category is a `<div class="panel">` with `<li class="item">` rows (name, price, other-language name, description).
- **Hours:** "Visit" section, plus `openingHoursSpecification` in the JSON-LD block in `<head>` (used by Google).
- **Map:** the Google Maps `<iframe>` in the "Visit" section.

## To confirm with the owner

- Postal code: the old site says **H4L 3L3**, Google lists **H4L 3L5**. Update the address, JSON-LD and footer once confirmed.
- Hiring: phone only for now (514 919-5126). An email or form would be a better way to receive CVs.
- Photos: current ones are ~500px wide; higher-resolution originals would look sharper on large screens.

## Deploy

**Netlify:** drag the folder onto app.netlify.com/drop, or connect the GitHub repo (no build command, publish directory `/`).
**GitHub Pages:** Settings → Pages → Branch `main`, folder `/ (root)`.
Then point the `semsom.ca` domain at the host.
