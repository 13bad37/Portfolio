import React, { useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = memo(() => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20" 
      role="region" 
      aria-labelledby="hero-heading"
    >
      {/* Subtle background elements with Apple-style sophistication */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Minimal floating orbs with subtle animation */}
        <motion.div
          className="absolute top-1/5 right-1/5 w-24 h-24 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1), transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/5 w-16 h-16 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.08), transparent 60%)',
            filter: 'blur(15px)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
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
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 font-mono"
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
        className="absolute bottom-8 left-1/2 flex flex-col items-center text-white/60 z-20"
        style={{ transform: 'translateX(-50%)' }}
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
});

Hero.displayName = 'Hero';

export default Hero;