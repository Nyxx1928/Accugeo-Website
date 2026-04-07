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
