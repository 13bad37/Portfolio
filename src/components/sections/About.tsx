import React, { useEffect, useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Rocket, Zap, LightbulbIcon } from 'lucide-react';
import { useAppleAnimation, useStaggeredAnimation } from '../../hooks/useAppleAnimations';
import FloatingElements from '../animations/FloatingElements';
import EnhancedFloatingElements from '../animations/EnhancedFloatingElements';
import AnimatedDivider from '../ui/AnimatedDivider';

const About: React.FC = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const { ref: titleRef } = useAppleAnimation({ delay: 0 });
  const { ref: textRef } = useAppleAnimation({ delay: 300, animationType: 'slide-left' });
  const { ref: cardsRef } = useStaggeredAnimation(4, 150);

  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = parallaxRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = parallaxRef.current.querySelectorAll('.parallax-element');
      
      elements.forEach((el) => {
        const depth = parseFloat((el as HTMLElement).dataset.depth || '5');
        const translateX = x * depth;
        const translateY = y * depth;
        
        (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden content-auto" role="region" aria-labelledby="about-heading">
      <FloatingElements variant="tech" density="light" />
      <EnhancedFloatingElements variant="data-streams" density="light" />
      
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y, opacity }}
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary-500/10 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className="flex flex-col items-center mb-12 text-center"
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">About Me</span>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4 heading-enhanced">Who I Am</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">Get to know more about me, my background, and what I do.</p>
        </div>

        {/* REDESIGNED: Centered layout with no blank space */}
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          {/* REDESIGNED: Centered content with proper hierarchy */}
          <article ref={textRef} role="article" aria-labelledby="about-content-heading" className="text-center w-full mb-12">
            <h3 id="about-content-heading" className="text-3xl md:text-4xl font-bold mb-8">Transforming Ideas into Digital Realities</h3>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm Nonso Nkire, an engineering student with a focus on computer and software systems. My journey in technology is driven by curiosity and a passion for solving complex problems through elegant code.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                With experience in web development, C#, and Python, I continuously expand my skillset to become a versatile software engineer. I believe in creating intuitive, efficient solutions that make a positive impact.
              </p>
            </div>
          </article>

          {/* REDESIGNED: Elongated Current Focus Areas widget spanning full width with fixed color dot */}
          <div className="bg-dark-600/50 backdrop-blur-sm rounded-xl p-8 mb-6 border border-dark-400/30 w-full max-w-5xl">
            <h4 className="text-xl font-semibold mb-6 text-primary-400 text-center">Current Focus Areas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 font-medium">Full-Stack Development</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-secondary-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 font-medium">System Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-accent-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 font-medium">Performance Optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-warning-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 font-medium">User Experience Design</span>
              </div>
            </div>
          </div>

          {/* REDESIGNED: Single line of cards on desktop */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl" role="list" aria-label="Personal qualities and skills">
              <div 
                className="bg-dark-600 p-5 rounded-xl border border-dark-400 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl transform-gpu will-change-transform apple-button"
                role="listitem"
              >
                <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <Rocket className="h-6 w-6 text-primary-400" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Goal-Oriented</h4>
                <p className="text-gray-400 text-sm">Committed to becoming a professional software engineer with a focus on creating impactful applications.</p>
              </div>
              
              <div 
                className="bg-dark-600 p-5 rounded-xl border border-dark-400 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl transform-gpu will-change-transform apple-button"
                role="listitem"
              >
                <div className="bg-secondary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary-500/20 transition-colors">
                  <Zap className="h-6 w-6 text-secondary-400" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Fast Learner</h4>
                <p className="text-gray-400 text-sm">Quick to adopt new languages and frameworks, with a natural ability to apply concepts across different technologies.</p>
              </div>
              
              <div 
                className="bg-dark-600 p-5 rounded-xl border border-dark-400 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl transform-gpu will-change-transform apple-button"
                role="listitem"
              >
                <div className="bg-accent-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-500/20 transition-colors">
                  <LightbulbIcon className="h-6 w-6 text-accent-400" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Creative Problem Solver</h4>
                <p className="text-gray-400 text-sm">Approaching challenges with innovative thinking and determination to find optimal solutions.</p>
              </div>
              
              <div 
                className="bg-dark-600 p-5 rounded-xl border border-dark-400 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl transform-gpu will-change-transform apple-button"
                role="listitem"
              >
                <div className="bg-success-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success-500/20 transition-colors">
                  <Brain className="h-6 w-6 text-success-500" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Continuous Learner</h4>
                <p className="text-gray-400 text-sm">Dedicated to ongoing education and staying current with emerging technologies and best practices.</p>
              </div>
            </div>
          </div>
        </div>
      
      <AnimatedDivider type="gradient" />
    </section>
  );
});

About.displayName = 'About';

export default About;
