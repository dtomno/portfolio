# Dennis Tomno — Portfolio

My interactive personal portfolio.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v3** — design tokens in `tailwind.config.js`
- **Framer Motion** — magnetic buttons, card tilt, lightbox, mobile menu
- **Lenis** — smooth momentum scrolling

## Interaction highlights

- Pointer-reactive flow-field canvas in the hero (`HeroCanvas.tsx`), theme-aware,
  pauses when the tab is hidden, degrades to a static dot grid under
  `prefers-reduced-motion`.
- Custom two-part cursor with magnetic hover (`Cursor.tsx`, `Magnetic.tsx`),
  fine-pointer devices only.
- Decode/scramble headline (`ScrambleText.tsx`).
- CSS + IntersectionObserver scroll reveals (`Reveal.tsx`) — no JS animation loop,
  so content can never get stuck mid-tween; anything on screen at mount reveals
  immediately.
- Rect-based scrollspy driving the top progress bar, nav underline, and the
  left section rail (`useActiveSection.ts`, `SideRail.tsx`).
- Project gallery lightbox with keyboard nav (`←` `→` `Esc`).
- Dark / light theme, persisted to `localStorage`, honours system preference on
  first visit.

## Content

All copy, projects, skills, links, and images live in `src/data/content.ts`.
Edit that one file to update the site.

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview
```

## Notes

- Source images were downscaled/re-encoded once with `sharp`
- `public/favicon.png` / `public/DennisTomno.png` are copies of the portrait
  asset used for the favicon and OpenGraph image.
