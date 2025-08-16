import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, GitBranch, Terminal } from 'lucide-react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

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
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20" role="region" aria-labelledby="hero-heading">
      {/* Floating elements animation */}
      <div className="absolute inset-0 pointer-events-none">
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
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/20 flex items-center justify-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ y: -2 }}
              aria-label="View my projects"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.1)' }}
              whileTap={{ y: -2 }}
              aria-label="Get in touch with me"
            >
              Get In Touch
            </motion.a>
          </motion.nav>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60"
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
          className="flex flex-col items-center"
          aria-label="Scroll down to about section"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;