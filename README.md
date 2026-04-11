# Accugeo Website

[![CI](https://github.com/Insentient57/Accugeo-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Insentient57/Accugeo-Website/actions/workflows/ci.yml)

A modern website for Accugeo Construction Materials and Testing Center built with Next.js and Tailwind CSS.

## Features

- Responsive navigation bar with smooth scrolling
- Hero section with background image and gradient overlay
- About section with fade-up animations
- Services carousel with navigation arrows
- Contact section with location map
- Custom Sansation font
- Text shadow effects throughout
- Smooth animations and transitions

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker

This repository includes a multi-stage Dockerfile and Docker Compose setup for both development and production.

### Prerequisites

- Docker Desktop (or Docker Engine + Compose plugin)

### Environment files

Production container:

```bash
cp .env.docker.example .env.docker
```

Development container:

```bash
cp .env.example .env.local
```

### Run production container

```bash
docker compose up --build web
```

If port 3000 is already in use, set `HOST_PORT`:

```bash
HOST_PORT=3001 docker compose up --build web
```

PowerShell:

```powershell
$env:HOST_PORT=3001; docker compose up --build web
```

Or with npm scripts:

```bash
npm run docker:prod
```

App URL: [http://localhost:3000](http://localhost:3000)
Health URL: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Run development container (hot reload)

```bash
docker compose --profile dev up --build web-dev
```

If port 3000 is already in use, set `HOST_PORT`:

```bash
HOST_PORT=3001 docker compose --profile dev up --build web-dev
```

PowerShell:

```powershell
$env:HOST_PORT=3001; docker compose --profile dev up --build web-dev
```

Or with npm scripts:

```bash
npm run docker:dev
```

### Useful Docker commands

```bash
npm run docker:build
npm run docker:up
npm run docker:logs
npm run docker:down
npm run docker:dev:down
```

Check container health status:

```bash
docker compose ps
```

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── Services.tsx
├── public/
│   ├── hero-bg.png
│   ├── logo.png
│   ├── NavBar-BG.png
│   ├── Location Image.png
│   ├── arrowleft.png
│   └── arrowright.png
└── package.json
```

## Customization

- Update images in the `/public` folder
- Modify text content in each component
- Adjust colors in `tailwind.config.ts`
- Change font in `app/layout.tsx`

## Deployment

Deploy easily to Vercel:

```bash
npm run build
```

Then push to GitHub and connect to Vercel for automatic deployments.
