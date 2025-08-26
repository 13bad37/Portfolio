import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['framer-motion']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          ui: ['lucide-react'],
          // Separate large components to enable better caching
          programming: ['src/components/sections/ProgrammingExpertise.tsx'],
          projects: ['src/components/sections/Projects.tsx']
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `${facadeModuleId}-[hash].js`;
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none'
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
