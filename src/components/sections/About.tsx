import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Rocket, Zap, LightbulbIcon } from 'lucide-react';
import { useAppleAnimation, useStaggeredAnimation } from '../../hooks/useAppleAnimations';
import FloatingElements from '../animations/FloatingElements';
import EnhancedFloatingElements from '../animations/EnhancedFloatingElements';
import AnimatedDivider from '../ui/AnimatedDivider';

const About: React.FC = () => {
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
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden" role="region" aria-labelledby="about-heading">
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

      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className="flex flex-col items-center mb-16 text-center"
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">About Me</span>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">Get to know more about me, my background, and what I do.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div 
            ref={parallaxRef}
            className="relative h-[300px] lg:h-[420px] rounded-2xl overflow-hidden bg-dark-400 border border-dark-300 order-2 lg:order-1 apple-animate"
            role="img"
            aria-label="Interactive visual representation of fast learning and problem solving"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dark-500/40 to-dark-500/60 z-10"></div>
            <div className="parallax-element absolute inset-0 flex flex-col justify-center items-center text-center px-8 z-20" data-depth="2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.2)',
                    '0 0 40px rgba(139, 92, 246, 0.4)',
                    '0 0 20px rgba(139, 92, 246, 0.2)'
                  ]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="p-6 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm mb-8 border border-primary-500/40"
                aria-hidden="true"
              >
                <Brain className="h-16 w-16 text-primary-400" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Fast Learner & Problem Solver</h3>
              <p className="text-gray-300">I thrive in challenging environments that push me to expand my knowledge and skills.</p>
            </div>
            <div className="parallax-element absolute top-10 left-10 w-16 h-16 rounded-lg bg-secondary-500/20 backdrop-blur-sm z-0" data-depth="8"></div>
            <div className="parallax-element absolute bottom-20 right-20 w-20 h-20 rounded-full bg-primary-500/10 backdrop-blur-sm z-0" data-depth="12"></div>
            <div className="parallax-element absolute top-1/2 right-10 w-12 h-12 rounded-lg bg-accent-500/15 backdrop-blur-sm z-0" data-depth="6"></div>
          </div>

          <article ref={textRef} role="article" aria-labelledby="about-content-heading" className="order-1 lg:order-2">
            <h3 id="about-content-heading" className="text-2xl font-bold mb-6">Transforming Ideas into Digital Realities</h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm Nonso Nkire, an engineering student with a focus on computer and software systems. My journey in technology is driven by curiosity and a passion for solving complex problems through elegant code.
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              With experience in web development, C#, and Python, I continuously expand my skillset to become a versatile software engineer. I believe in creating intuitive, efficient solutions that make a positive impact.
            </p>

            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list" aria-label="Personal qualities and skills">
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
          </article>
        </div>
      </div>
      
      <AnimatedDivider type="gradient" />
    </section>
  );
};

export default About;