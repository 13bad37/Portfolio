import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroOptimized from './components/sections/HeroOptimized';
import Loader from './components/animations/Loader';
import ScrollProgress from './components/animations/ScrollProgress';
import { getPerformanceManager } from './utils/performanceManager';

// Lazy load heavy components
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));
const ProgrammingExpertise = lazy(() => import('./components/sections/ProgrammingExpertise'));
const OptimizedBackground = lazy(() => import('./components/animations/OptimizedBackground'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize performance manager for optimal performance
    const performanceManager = getPerformanceManager({
      targetFPS: 60, // Reduced from 120 for better performance
      adaptiveQuality: true,
      optimizeForMobile: true
    });

    // Reduced loading time for faster initial render
    const timer = setTimeout(() => {
      setLoading(false);
      // Optimize memory after initial load
      setTimeout(() => {
        performanceManager.optimizeMemory();
      }, 500);
    }, 800); // Reduced from 2000ms to 800ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-500 text-white font-sans overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Always render scroll progress for better UX */}
          <ScrollProgress />
          <Suspense fallback={null}>
            <OptimizedBackground />
          </Suspense>
          <Header role="banner" />
          <main className="relative z-10" role="main" aria-label="Main content">
            <HeroOptimized />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin transform-gpu" />
              </div>
            }>
              <About />
              <Skills />
              <Projects />
              <ProgrammingExpertise />
              <Contact />
            </Suspense>
          </main>
          <Footer role="contentinfo" />
        </>
      )}
    </div>
  );
};

export default App;