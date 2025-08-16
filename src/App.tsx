import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Showcase from './components/sections/Showcase';
import ParticleBackground from './components/animations/ParticleBackground';
import CustomCursor from './components/animations/CustomCursor';
import ScrollProgress from './components/animations/ScrollProgress';
import Loader from './components/animations/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-500 text-white font-sans overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomCursor />
          <ParticleBackground />
          <ScrollProgress />
          <Header role="banner" />
          <main className="relative z-10" role="main" aria-label="Main content">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Showcase />
            <Contact />
          </main>
          <Footer role="contentinfo" />
        </>
      )}
    </div>
  );
};

export default App;