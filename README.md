# Voyage Collective by VTS

A modern, premium travel agency landing page built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Theme: "Voyage Collective by VTS"

A modern, premium travel + AI-forward theme with:
- Global, sleek, premium, airy aesthetic
- Apple-clean design + airline premium cabin + map/aviation hints
- High readability, strong hierarchy, modern motion (subtle)
- Full Light and Dark mode support
- Excellent mobile + desktop responsiveness

## Features

- **Sticky Navigation** with blur effect and gradient line
- **Hero Section** with search form and popular destinations
- **Destination Cards** with hover effects and badges
- **Testimonials** section with ratings
- **Footer** with contact information and social links
- **Dark Mode** toggle with local storage persistence
- **Responsive Design** for all screen sizes
- **Accessibility** features (AA contrast, focus outlines)

## Color System

### Light Mode
- Primary (Ocean): #2563EB
- Accent (Aurora): #22C55E
- Accent 2 (Sunset): #F59E0B
- Background: #FFFFFF
- Surface-2: #F5F7FB

### Dark Mode
- Background: #070B14
- Surface: #0B1220
- Surface-2: #0F172A
- Text: #E5E7EB

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── input.tsx
│   ├── navbar.tsx           # Navigation component
│   ├── hero.tsx             # Hero section
│   ├── destinations.tsx     # Destinations grid
│   ├── testimonials.tsx     # Testimonials section
│   └── footer.tsx           # Footer component
├── lib/
│   └── utils.ts             # Utility functions
├── .vscode/
│   └── settings.json        # VS Code settings
├── .eslintrc.json         # ESLint configuration
├── .stylelintrc.json      # Stylelint configuration
├── .prettierrc.json       # Prettier configuration
└── public/                  # Static assets
```

## Component Library

This project uses shadcn/ui as the component library. Components are built with:

- **Tailwind CSS** for styling
- **class-variance-authority** for variant management
- **clsx** and **tailwind-merge** for className merging
- **Lucide React** for icons

## Custom Components

### Button
```tsx
<Button variant="default" size="default">Click me</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Badge
```tsx
<Badge variant="default">Label</Badge>
```

## Styling System

### Utility Classes

- `.container` - Max-width container with padding
- `.section` - Section with vertical padding
- `.card` - Card component with hover effect
- `.btn` - Button base styles
- `.input` - Input field styles
- `.badge` - Badge component
- `.overline` - Section label/overline

### Animations

- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-slide-down` - Slide down animation
- `animation-delay-100` - 0.1s delay
- `animation-delay-200` - 0.2s delay
- `animation-delay-300` - 0.3s delay

### Responsive Typography

- `text-responsive-h1` - Responsive H1 (clamp-based)
- `text-responsive-h2` - Responsive H2 (clamp-based)

## Configuration Files

### VS Code Settings
The [`.vscode/settings.json`](.vscode/settings.json:1) file configures VS Code to:
- Disable CSS validation for Tailwind CSS
- Enable stylelint for CSS and SCSS files
- Associate `.css` files with Tailwind CSS syntax

### Stylelint Configuration
The [`.stylelintrc.json`](.stylelintrc.json:1) file configures Stylelint to:
- Ignore Tailwind-specific at-rules (`@tailwind`, `@apply`, `@layer`)
- Disable rules that conflict with Tailwind's utility classes
- Support PostCSS syntax for CSS files

### ESLint Configuration
The [`.eslintrc.json`](.eslintrc.json:1) file extends Next.js core web vitals and customizes rules.

### Prettier Configuration
The [`.prettierrc.json`](.prettierrc.json:1) file configures code formatting rules.

## Accessibility

- AA contrast ratio compliance
- Visible focus outlines
- Keyboard navigation support
- Screen reader friendly
- `prefers-reduced-motion` support

## License

MIT
