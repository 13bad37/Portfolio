# Portfolio Project Overview

## Purpose
Personal portfolio website (nonso.software) showcasing modern web development skills through interactive features, smooth animations, and responsive design. Features include:
- Algorithm visualizer with sorting algorithms
- Interactive C programming examples 
- Project showcase with filtering
- Contact form and professional presentation

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1 + PostCSS
- **Animations**: Framer Motion 11.0.3 + GSAP 3.12.5
- **Icons**: Lucide React
- **Utilities**: React Intersection Observer
- **Linting**: ESLint 9.9.1 with TypeScript ESLint
- **Performance**: Custom performance management system

## Project Structure
```
src/
├── components/
│   ├── animations/     # Background, particles, loaders, cursors
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, About, Skills, Projects, Contact
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Performance utilities and managers
├── main.tsx           # App entry point
└── App.tsx            # Main app component
```

## Performance Focus
- Lazy loading of heavy components
- Performance manager for 60-120fps optimization  
- Adaptive quality based on device capabilities
- Memory optimization and cleanup
- Mobile-specific optimizations
- Advanced debounce/throttle utilities