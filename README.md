# LuxeTravel

A modern, premium travel agency website built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and shadcn/ui components.

## Theme: LuxeTravel

A modern, premium travel + AI-forward theme with:
- Global, sleek, premium, airy aesthetic
- Deep blue primary with teal/gold accents
- High readability, strong hierarchy, modern motion (subtle)
- Full Light and Dark mode support
- Excellent mobile + desktop responsiveness

## Features

- **Sticky Navigation** with blur effect and mobile sheet menu
- **Hero Section** with video/image background
- **Packages Listing** with filters (Price, Duration, Type)
- **Package Details** with tabs (Overview, Itinerary, Includes, FAQ)
- **Destinations Grid** with hover effects
- **Contact Page** with validation and office info
- **Inquiry Form** reusable component
- **Dark Mode** toggle
- **Responsive Design** for all screen sizes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion & Tailwind Animate
- **Forms**: React Hook Form (or simple state)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

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
│   ├── api/                 # API routes
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── destinations/        # Destinations listing
│   ├── packages/            # Packages listing & details
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── shared/              # Shared components (Navbar, Footer, Cards, etc.)
│   ├── ui/                  # shadcn/ui primitives
│   ├── theme-provider.tsx   # Next-themes provider
│   └── scroll-to-top.tsx    # Scroll to top button
├── data/
│   ├── packages.ts          # Mock package data
│   └── destinations.ts      # Mock destination data
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## License

MIT
