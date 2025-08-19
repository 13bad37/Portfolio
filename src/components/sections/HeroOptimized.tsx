import React, { useRef, memo } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroOptimized: React.FC = memo(() => {
  const textRef = useRef<HTMLHeadingElement>(null);

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20" 
      role="region" 
      aria-labelledby="hero-heading"
    >
      {/* Minimal CSS-only background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/5 right-1/5 w-24 h-24 rounded-full opacity-30 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1), transparent 70%)',
            filter: 'blur(20px)',
            animationDuration: '8s'
          }}
        />
        
        <div
          className="absolute bottom-1/4 left-1/5 w-16 h-16 rounded-full opacity-20 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.08), transparent 60%)',
            filter: 'blur(15px)',
            animationDelay: '3s',
            animationDuration: '12s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block bg-primary-500/20 px-4 py-1 rounded-full animate-fade-in">
            <span className="text-primary-400 font-mono">Hello, I'm Nonso Nkire</span>
          </div>
          
          <h1
            id="hero-heading"
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="block">Bridging ideas with</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 font-mono">
              elegant code
            </span>
          </h1>
          
          <p
            className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Computer & Software Systems Engineering student passionate about creating seamless digital experiences. Proficient in web development, C#, and Python.
          </p>
          
          <nav
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
            role="navigation"
            aria-label="Hero section navigation"
          >
            <a
              href="#projects"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-primary-500/20 flex items-center justify-center transform hover:-translate-y-2 hover:scale-105"
              aria-label="View my projects"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center transform hover:-translate-y-2 hover:scale-105 hover:border-primary-500/50"
              aria-label="Get in touch with me"
            >
              Get In Touch
            </a>
          </nav>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 flex flex-col items-center text-white/60 z-20 animate-bounce-gentle"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <a 
          href="#about"
          onClick={handleScrollToAbout}
          className="flex flex-col items-center justify-center min-h-[44px] px-4 hover:text-primary-500 transition-colors duration-300"
          aria-label="Scroll down to about section"
        >
          <span className="text-sm mb-2 text-center">Scroll Down</span>
          <ArrowDown size={24} />
        </a>
      </div>

    </section>
  );
});

HeroOptimized.displayName = 'HeroOptimized';

export default HeroOptimized;