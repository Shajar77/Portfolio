# Shajar Ali — Creative Frontend & Blockchain Developer Portfolio

An Awwward-inspired personal portfolio built with **Next.js 15**, **React 19**, **GSAP 3**, and **Lenis** smooth scrolling. Featuring physics-based interactions, scroll-linked animations, and a custom SVG page transition system.

🔗 **Live:** [shajar-portfolio.vercel.app](https://shajar-portfolio.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Animation | GSAP 3.12 + ScrollTrigger + InertiaPlugin |
| Smooth Scroll | Lenis 1.1 |
| Styling | Vanilla CSS (modular partials) |
| Fonts | DM Sans + Epilogue (variable, self-hosted) |
| Deployment | Vercel |

## Features

### Animation & Interaction
- **Page Transition Scribble** — Full-screen SVG stroke draw with randomized color palette, scroll lock, and logo reveal
- **Velocity-based Inertia** — Cards and labels respond to mouse speed via GSAP InertiaPlugin
- **Cursor Bubble** — Magnetic cursor follower with context-aware labels ("click", "to home")
- **Horizontal Scroll Section** — Pinned scroll with per-letter elastic bounce, sticker pop-ins, and SVG arrow draw
- **Showreel** — Horizontal project gallery with intro zoom sequence and parallax text
- **Navbar Hover Pop-outs** — Scale from icon center with blob spin, staggered item reveals
- **Footer Sticker Push** — Proximity-based physics: stickers get pushed by nearby cursor movement

### Performance
- Dynamic imports (`next/dynamic`) for all below-fold components
- Font preloading to prevent FOUT
- Hero video preloaded with `fetchPriority="high"`
- Aggressive static asset caching (1-year immutable for fonts/assets)
- AVIF/WebP auto-conversion via Next.js Image
- `ResizeObserver` with rAF debounce for ScrollTrigger refresh

### Accessibility
- `@media (prefers-reduced-motion: reduce)` — disables all animations, hides custom cursors
- Lenis smooth scroll skipped entirely for reduced-motion users
- `aria-hidden` on decorative SVGs/images
- `aria-label` on icon buttons
- Semantic HTML structure

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── about/           # About page (route: /about)
│   ├── styles/          # Modular CSS partials (13 files)
│   │   ├── base.css     # Fonts, tokens, reset, reduced-motion
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── vimeo-hero.css
│   │   ├── motion-cards.css
│   │   ├── showreel.css
│   │   ├── cards.css
│   │   ├── horizontal-words.css
│   │   ├── marquee.css
│   │   ├── footer.css
│   │   ├── cursor.css
│   │   └── responsive.css
│   ├── globals.css      # Import orchestrator
│   ├── layout.jsx       # Root layout + SEO metadata
│   └── page.jsx         # Home page
├── components/
│   ├── about/           # About page sub-components
│   ├── Navbar.jsx       # Adaptive navbar with pop-out menus
│   ├── VimeoHero.jsx    # Hero video player + headline
│   ├── HorizontalWords.jsx
│   ├── MotionCards.jsx
│   ├── Showreel.jsx
│   ├── ServiceCards.jsx
│   ├── DoubleMarquee.jsx
│   ├── Footer.jsx
│   ├── TransitionScribble.jsx
│   ├── CursorBubble.jsx
│   ├── SmoothScroll.jsx
│   └── ClientProviders.jsx
├── lib/
│   ├── data.js          # Static data (projects, social links, configs)
│   └── utils.js         # GSAP wiggle utility
└── public/
    ├── assets/          # SVGs, stickers, brand logos
    └── fonts/           # DM Sans + Epilogue variable fonts
```

## Credits

- **Design & Code:** [Shajar Ali](https://github.com/Shajar77)
- **Design Inspiration:** [Truus.co](https://www.truus.co) — original Awwward-winning agency site
