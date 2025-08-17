import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, GitBranch, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { useParallax } from '../../hooks/useParallax';
import EnhancedFloatingElements from '../animations/EnhancedFloatingElements';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const { ref: parallaxRef, transform } = useParallax({ speed: 0.3 });

  useEffect(() => {
    if (!textRef.current) return;

    const textElement = textRef.current;
    
    gsap.fromTo(
      textElement.querySelectorAll('.gradient-text'),
      { 
        backgroundPosition: '0% 50%',
      },
      { 
        backgroundPosition: '100% 50%', 
        duration: 5, 
        repeat: -1, 
        yoyo: true,
        ease: "sine.inOut" 
      }
    );

    // Clean up GSAP animation
    return () => {
      gsap.killTweensOf(textElement.querySelectorAll('.gradient-text'));
    };
  }, []);
  
  return (
    <section 
      ref={parallaxRef}
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 parallax" 
      style={{ transform }}
      role="region" 
      aria-labelledby="hero-heading"
    >
      {/* Enhanced floating elements animation */}
      <EnhancedFloatingElements variant="digital-rain" density="light" />
      <div className="absolute inset-0 pointer-events-none transform-gpu overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 text-primary-500/20"
          animate={{ 
            y: [0, -30, 0], 
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        >
          <Code size={80} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 text-secondary-500/20"
          animate={{ 
            y: [0, 40, 0], 
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        >
          <Terminal size={100} />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/3 text-accent-500/20"
          animate={{ 
            y: [0, 20, 0], 
            x: [0, -20, 0], 
            rotate: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        >
          <GitBranch size={60} />
        </motion.div>

        {/* Floating code blocks - mobile-safe positioning */}
        <motion.div
          className="absolute top-16 right-4 md:right-16 bg-dark-700/30 backdrop-blur-sm border border-primary-500/20 rounded-lg p-3 font-mono text-xs text-primary-300 hidden sm:block"
          animate={{ 
            y: [0, -15, 0], 
            x: [0, 10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="leading-relaxed">
            <span className="text-blue-400">function</span> <span className="text-yellow-400">createMagic</span>() {"{"}
            <br />
            <span className="ml-2 text-gray-400">return</span> <span className="text-green-400">"✨"</span>;
            <br />
            {"}"}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-4 md:right-12 bg-dark-700/40 backdrop-blur-sm border border-secondary-500/30 rounded-lg px-3 py-2 font-mono text-xs text-secondary-300 hidden sm:block"
          animate={{ 
            y: [0, 15, 0], 
            x: [0, -8, 0],
            rotate: [0, -1, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          aria-hidden="true"
        >
          <div className="leading-tight">
            <span className="text-purple-400">const</span> <span className="text-yellow-400">skills</span> = [
            <br />
            <span className="ml-2 text-green-400">"C"</span>, <span className="text-green-400">"JS"</span>, <span className="text-green-400">"TS"</span>, <span className="text-green-400">"Java"</span>,
            <br />
            <span className="ml-2 text-green-400">"Python"</span>, <span className="text-green-400">"C#"</span>, <span className="text-green-400">"React"</span>
            <br />
            ];
          </div>
        </motion.div>

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-1/2 left-8 w-16 h-16 border-2 border-primary-500/30 rounded-lg"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "linear" 
          }}
          aria-hidden="true"
        />

        <motion.div
          className="absolute bottom-1/3 right-8 w-12 h-12 border-2 border-secondary-500/30 rounded-full"
          animate={{ 
            rotate: [0, -360],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        />

        {/* Sophisticated gradient orb with subtle pulse */}
        <motion.div
          className="absolute top-1/5 right-1/5 w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1), transparent 70%)',
            filter: 'blur(12px)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        />
        
        {/* Additional floating orbs */}
        <motion.div
          className="absolute bottom-1/4 left-1/5 w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.08), transparent 60%)',
            filter: 'blur(6px)'
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          aria-hidden="true"
        />
        
        {/* Subtle ring effect */}
        <motion.div
          className="absolute top-1/5 right-1/5 w-12 h-12 border border-primary-500/20 rounded-full"
          style={{ left: '0.125rem', top: '0.125rem' }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block bg-primary-500/20 px-4 py-1 rounded-full"
          >
            <span className="text-primary-400 font-mono">Hello, I'm Nonso Nkire</span>
          </motion.div>
          
          <motion.h1
            id="hero-heading"
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="block">Bridging ideas with</span>
            <span 
              className="gradient-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-300% font-mono"
            >
              elegant code
            </span>
          </motion.h1>
          
          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Computer & Software Systems Engineering student passionate about creating seamless digital experiences. Proficient in web development, C#, and Python.
          </motion.p>
          
          <motion.nav
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            role="navigation"
            aria-label="Hero section navigation"
          >
            <motion.a
              href="#projects"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-primary-500/20 flex items-center justify-center smooth-hover will-change-transform"
              whileHover={{ 
                y: -8, 
                boxShadow: '0 20px 40px -5px rgba(139, 92, 246, 0.6)',
                scale: 1.05
              }}
              whileTap={{ y: -2, scale: 0.98 }}
              aria-label="View my projects"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center smooth-hover will-change-transform"
              whileHover={{ 
                y: -8, 
                boxShadow: '0 20px 40px -5px rgba(255, 255, 255, 0.15)',
                scale: 1.05,
                borderColor: 'rgba(139, 92, 246, 0.5)'
              }}
              whileTap={{ y: -2, scale: 0.98 }}
              aria-label="Get in touch with me"
            >
              Get In Touch
            </motion.a>
          </motion.nav>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <motion.a 
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
          whileHover={{ color: '#8B5CF6' }}
          className="flex flex-col items-center justify-center min-h-[44px] px-4"
          aria-label="Scroll down to about section"
        >
          <span className="text-sm mb-2 text-center">Scroll Down</span>
          <ArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;