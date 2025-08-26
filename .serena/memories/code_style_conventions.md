# Portfolio Code Style & Conventions

## TypeScript & React
- **Strict TypeScript**: All files use .tsx/.ts extensions
- **Function Components**: React.FC with explicit typing
- **Interfaces**: Clear type definitions for props and configs
- **Imports**: ES6 imports, organized by external/internal
- **Lazy Loading**: React.lazy() for heavy components

## Naming Conventions
- **Components**: PascalCase (e.g., `OptimizedBackground`, `HeroOptimized`)
- **Files**: PascalCase for components, camelCase for utilities
- **Hooks**: Custom hooks prefixed with `use` (e.g., `useMousePosition`)
- **Constants**: UPPER_CASE for config values
- **CSS Classes**: Tailwind utility classes, kebab-case for custom

## Performance Patterns
- **Memoization**: Strategic use of React.memo and useMemo
- **RAF Optimization**: requestAnimationFrame for animations
- **Debounce/Throttle**: Performance utilities for events
- **Lazy Components**: Suspense boundaries with fallbacks
- **Memory Management**: Cleanup functions in useEffect

## Code Organization
- **Separation**: Clear separation of concerns (animations, layout, sections)
- **Reusability**: Shared utilities in `/utils`, hooks in `/hooks`
- **Performance First**: Performance manager pattern throughout
- **Accessibility**: ARIA labels, semantic HTML, role attributes

## ESLint Rules
- React Hooks rules enforced
- TypeScript strict mode
- React Refresh for development