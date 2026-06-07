# Kanit Mann - Portfolio

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features tactile fidget-toy interactions, dynamic project/article pages, and a like system.

## Live Demo

Visit: [kanit.codes](https://kanit.codes)

## Features

- **Tactile Feedback System**: Physics-based interactions including magnetic hover, 3D card tilt, inset shadow press effects, synthesized audio feedback, and haptic vibration patterns
- **Dynamic Content**: Projects and articles use dynamic routes with content registry pattern
- **Like System**: Per-item like/unlike with localStorage persistence and server-side count tracking
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Fast Performance**: Optimized images, code splitting, and static generation
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, and reduced motion support
- **TypeScript**: Full type safety and better development experience

## Tactile Feedback System

The portfolio includes a comprehensive tactile feedback system that creates a "fidget toy" experience:

- **Magnetic Hover**: Buttons and cards pull toward the cursor (8px max, 120px radius) with spring physics
- **3D Card Tilt**: Project cards rotate up to 8deg based on cursor position for parallax depth
- **Inset Shadow Press**: Press state adds inset shadow creating a "sinking into surface" effect
- **Audio Feedback**: Synthesized click, toggle, and whoosh sounds (default muted, user opts in)
- **Haptic Feedback**: Vibration patterns for button presses and interactions (mobile only)
- **Reduced Motion**: All motion respects `prefers-reduced-motion` and can be muted via speaker icon in nav

Architecture: React Context (`TactileFeedbackProvider`) manages mute state with localStorage persistence. Audio buffers are preloaded on mount for instant playback.

## Tech Stack

- **Framework**: Next.js 16.3.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel/Netlify ready

## Project Structure

```
profile-kanitmann/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── articles/          # Article listing + dynamic [slug] route
│   ├── projects/          # Project listing + dynamic [slug] route
│   ├── contact/           # Contact page
│   ├── api/likes/         # Likes API (GET/POST)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with TactileFeedbackProvider
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── animations/        # Animation components (FadeIn, ScaleOnHover, etc.)
│   ├── ui/               # shadcn/ui components
│   ├── tactile-button.tsx # Button with magnetic hover + inset shadow
│   ├── tactile-card.tsx   # Card with 3D tilt + inset shadow
│   ├── tactile-feedback-provider.tsx # Audio/haptic context provider
│   ├── like-button.tsx    # Presentational like button with particles
│   ├── navigation.tsx     # Navigation with speaker icon toggle
│   └── theme-provider.tsx # Theme provider
├── hooks/                 # Custom React hooks
│   ├── use-likes.ts       # Bulk like count fetcher
│   ├── use-like-item.ts   # Per-item like toggle manager
│   ├── use-magnetic-hover.ts # Magnetic cursor attraction
│   ├── use-card-tilt.ts   # 3D perspective tilt
│   ├── use-reduced-motion.ts # Reduced motion detection
│   └── use-tap-feedback.ts # Tap ripple effect
├── content/               # Content components (projects, articles)
├── data/                  # Static data (projects, articles, experiences)
├── docs/adr/              # Architectural Decision Records
└── lib/                   # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kanitmann01/profile-kanitmann.git
   cd profile-kanitmann
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Testing

```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
```

## Content Management

### Adding New Projects

1. Add project data to `data/projects.ts`
2. Create content component in `content/projects/[slug].tsx`
3. Add slug to content registry in `content/projects/index.ts`
4. Add images to `public/images/`

### Adding New Articles

1. Add article data to `data/articles.ts`
2. Create content component in `content/articles/[slug].tsx`
3. Add slug to content registry in `content/articles/index.ts`

### Updating Experience

Edit `data/experiences.ts` for the timeline data.

## Customization

### Colors and Theme

- Edit `styles/globals.css` for CSS custom properties (light/dark themes)
- Modify `tailwind.config.ts` for theme customization

### Tactile Feedback

- Mute/unmute via speaker icon in navigation
- Preference persisted in localStorage
- Respects `prefers-reduced-motion` system setting
- Audio/haptic systems in `components/tactile-feedback-provider.tsx`

### Animations

- Animation components in `components/animations/`
- Tactile hooks in `hooks/`
- Built with Framer Motion

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Static Generation**: Projects and articles pre-rendered at build time
- **Image Optimization**: WebP/AVIF with responsive images
- **Code Splitting**: Route-level splitting with Next.js

## SEO Features

- Meta tags for all pages
- Open Graph and Twitter cards
- Structured data (JSON-LD) for WebSite and SiteNavigation
- XML sitemap and RSS/Atom feeds
- Robots.txt
- Canonical URLs

## Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Reduced motion support via `useReducedMotion` hook
- High contrast ratios
- Screen reader friendly

## Recent Improvements

- Dynamic routes for projects and articles (ADR 0001, 0002)
- Like system refactored to two-hook design (ADR 0003)
- Centralized test mocks in vitest.setup.ts (ADR 0004)
- Dead code cleanup (~1100 lines removed) (ADR 0005)
- Shared utilities extracted (ADR 0006)
- Tactile feedback system with magnetic hover, 3D tilt, audio, and haptics (ADR 0007)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: kanitmann01@gmail.com
- **LinkedIn**: [kanitmann](https://linkedin.com/in/kanitmann)
- **GitHub**: [kanitmann01](https://github.com/kanitmann01)
- **Website**: [kanit.codes](https://kanit.codes)

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Next.js](https://nextjs.org/) for the amazing framework

---

Built with ❤️ by [Kanit Mann](https://kanit.codes) 