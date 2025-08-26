# Portfolio Development Commands

## Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Quality Control
- Always run `npm run lint` before committing
- Check build output with `npm run build` for production readiness
- Use `npm run preview` to test production build locally

## System Commands (Linux)
- `git status` - Check repository status
- `git branch` - View available branches  
- `ls -la` - List files with details
- `find . -name "*.tsx" -type f` - Find TypeScript React files
- `grep -r "performance" src/` - Search for performance-related code

## Performance Testing
- Use browser DevTools Performance tab
- Monitor with `npm run dev` and check console for performance metrics
- Test on mobile devices for mobile optimizations