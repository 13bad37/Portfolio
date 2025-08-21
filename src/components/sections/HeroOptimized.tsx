import React, { useRef, memo } from 'react';
import { ArrowDown } from 'lucide-react';
import ParallaxSection from '../animations/ParallaxSection';
import AppleButton from '../ui/AppleButton';

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
      className="min-h-[92vh] flex flex-col justify-center relative overflow-hidden pt-16 apple-section content-auto" 
      role="region" 
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Apple-style background with parallax */}
      <ParallaxSection speed={0.3} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0">
          {/* Dynamic gradient orbs with improved animations */}
          <div
            className="absolute top-1/5 right-1/5 w-32 h-32 rounded-full opacity-40 apple-glow"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15), transparent 70%)',
              filter: 'blur(25px)',
            }}
          />
          
          <div
            className="absolute bottom-1/4 left-1/5 w-24 h-24 rounded-full opacity-30 apple-glow"
            style={{
              background: 'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.12), transparent 60%)',
              filter: 'blur(20px)',
              animationDelay: '2s'
            }}
          />
          
          {/* Additional floating elements for depth */}
          <div
            className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full opacity-20 apple-float"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 60%)',
              filter: 'blur(15px)',
              animationDelay: '4s'
            }}
          />
        </div>
      </ParallaxSection>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block bg-primary-500/20 backdrop-blur-sm px-4 py-2 rounded-full animate-fade-in border border-primary-500/30">
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
            className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Computer & Software Systems Engineering student passionate about creating seamless digital experiences. Proficient in web development, C#, and Python.
          </p>
          
          <nav
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up mb-4 sm:mb-0"
            style={{ animationDelay: '0.6s' }}
            role="navigation"
            aria-label="Hero section navigation"
          >
            <AppleButton
              variant="primary"
              size="lg"
              href="#projects"
            >
              View My Work
            </AppleButton>
            <AppleButton
              variant="ghost"
              size="lg"
              href="#contact"
            >
              Get In Touch
            </AppleButton>
          </nav>
        </div>
      </div>
      
      <div 
        className="absolute bottom-3 md:bottom-16 left-1/2 flex flex-col items-center text-white/60 z-20 animate-bounce-gentle hide-if-short"
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
