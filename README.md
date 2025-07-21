# Kanit Mann - Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Showcasing data science projects, professional experience, and technical expertise.

## 🚀 Live Demo

Visit: [kanit.codes](https://kanit.codes)

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Fast Performance**: Optimized images, code splitting, and static generation
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
kanitmann-portfolio/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── articles/          # Blog articles
│   ├── projects/          # Project case studies
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── animations/        # Animation components
│   ├── ui/               # shadcn/ui components
│   ├── footer.tsx        # Footer component
│   ├── navigation.tsx    # Navigation component
│   └── theme-provider.tsx # Theme provider
├── public/               # Static assets
│   ├── images/           # Images and icons
│   ├── robots.txt        # SEO robots file
│   └── sitemap.xml       # SEO sitemap
└── lib/                  # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kanitmann01/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📝 Content Management

### Adding New Projects

1. Create a new file in `app/projects/[project-name]/page.tsx`
2. Add project data to the projects array in `app/page.tsx` and `app/projects/page.tsx`
3. Add images to `public/images/case-studies/`

### Adding New Articles

1. Create a new file in `app/articles/[article-name]/page.tsx`
2. Add article data to the articles array in `app/page.tsx`
3. Update sitemap.xml with the new URL

### Updating Experience

Edit the `experiences` array in:
- `app/page.tsx` (homepage timeline)
- `app/about/page.tsx` (detailed experience)

## 🎨 Customization

### Colors and Theme

- Edit `app/globals.css` for color variables
- Modify `tailwind.config.ts` for theme customization
- Update `components/theme-provider.tsx` for theme behavior

### Styling

- Use Tailwind CSS classes for styling
- Custom CSS in `app/globals.css`
- Component-specific styles in individual component files

### Animations

- Animation components in `components/animations/`
- Built with Framer Motion
- Easily customizable timing and effects

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://web.site
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Next.js Config

Key optimizations in `next.config.mjs`:
- Image optimization with WebP/AVIF
- Package import optimization
- Compression enabled
- TypeScript and ESLint checks disabled for faster builds

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 SEO Features

- Meta tags for all pages
- Open Graph and Twitter cards
- Structured data (JSON-LD)
- XML sitemap
- Robots.txt
- Canonical URLs

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast ratios
- Screen reader friendly

The project is compatible with any platform that supports Next.js static exports.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Email**: kanitmann01@gmail.com
- **LinkedIn**: [kanitmann](https://linkedin.com/in/kanitmann)
- **GitHub**: [kanitmann01](https://github.com/kanitmann01)
- **Website**: [kanit.codes](https://kanit.codes)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Next.js](https://nextjs.org/) for the amazing framework

---

Built with ❤️ by [Kanit Mann](https://kanit.codes) 