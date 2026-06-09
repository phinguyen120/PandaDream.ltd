# Panda Dream — Studio Website

Official website for **Panda Dream**, an iOS & Android mobile game and app studio based in Hanoi, Vietnam. Founded 2026.

Single-page company site built with **Node.js + Express**, served as a static frontend with a small JSON API for content.

## Features

- Modern dark landing page (coral + amber on midnight navy)
- Animated aurora background, scroll progress bar, 3D phone tilt, scroll-reveal, count-up stats
- Sections: Hero, Stats, About, Services, **Business models (IAA / IAP / Hybrid)**, Products, Values, Contact
- All content lives in the `company` object in `server.js` — easy to edit or wire to a database later

## Getting started

```bash
npm install
npm start
# open http://localhost:3000
```

Dev mode with auto-reload:

```bash
npm run dev
```

## Project structure

```
server.js          Express server + company data + JSON API
public/
  index.html       Page markup
  styles.css       Styles & animations
  app.js           Renders content, animations, interactions
```

## API

- `GET /api/company` — company info (name, intro, stats, services, business, products, values)
- `GET /api/health` — health check

## License

MIT © 2026 Panda Dream
