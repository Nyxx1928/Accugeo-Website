# Accugeo — Construction Materials & Testing Center

[![CI](https://github.com/Insentient57/Accugeo-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Insentient57/Accugeo-Website/actions/workflows/ci.yml)

Accugeo is a modern, responsive website for Accugeo Construction Materials and Testing Center. It showcases laboratory and field testing services (material testing, geotechnical investigation, quality inspection, non‑destructive testing) and provides an interactive contact flow for inquiries and consultations.

Quick GitHub About blurb (copy this into the repo description):

> Accugeo — Next.js site for Accugeo Construction Materials & Testing Center. Lab & field testing, geotechnical investigation, NDT, inspection, and consulting.

## Highlights

- Built with Next.js 14, TypeScript and Tailwind CSS
- Interactive sections: smooth navigation, services accordion, contact form with service selection
- Responsive design with accessible navigation and reduced-motion support
- Docker-ready (development and production compose profiles)

## Try it locally

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000 and try the interactive features:

- Click **Get in Touch** to open the contact form and send an inquiry
- Click **View Services** to scroll to the services section and open sub-service details

## Useful scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm start` — run production build
- `npm run test` — run unit tests (Jest)
- `npm run test:e2e` — run Playwright e2e tests

## Docker (quick)

Development (hot reload):

```bash
npm run docker:dev
```

Production:

```bash
npm run docker:prod
```

If port 3000 conflicts, set `HOST_PORT` (PowerShell example):

```powershell
$env:HOST_PORT=3001; npm run docker:prod
```

## Project structure (important files)

```
app/           # Next.js app routes + global styles
components/    # Reusable UI sections (Hero, About, Services, Contact, Navbar)
public/        # Images and static assets
lib/           # Utilities (e.g. cn helper)
package.json   # Scripts and dependencies
```

## Development notes

- Content and copy live inside the components in `/components` — edit those to update page text.
- Images are in `/public` — swap them to change visuals.
- The contact form posts to `/api/contact` — update the route if you change the shape of the form payload.

## Contribution

PRs are welcome. For fixes or small changes, open a branch, push and create a PR. If you plan larger work, open an issue first to discuss.

---

If you'd like, I can also:

- add a short `CONTRIBUTING.md` and `DEVELOPMENT.md` with common workflows
- create a small demo GIF or screenshot and add it to the README
