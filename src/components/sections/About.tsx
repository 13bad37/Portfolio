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

  const parallaxRef = useRef<HTMLDivider>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || rafId) return;
      
      rafId = requestAnimationFrame(() => {
        if (!parallaxRef.current) {
          rafId = null;
          return;
        }
        
        const { clientX, clientY } = e;
        const { width, height, left, top } = parallaxRef.current.getBoundingClientRect();
        
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        const elements = parallaxRef.current.querySelectorAll('.parallax-element');
        
        elements.forEach((el) => {
          const depth = parseFloat((el as HTMLElement).dataset.depth || '5');
          const translateX = x * depth;
          const translateY = y * depth;
          
          // Use translate3d for hardware acceleration and better performance
          (el as HTMLElement).style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });
        
        rafId = null;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden content-auto" role="region" aria-labelledby="about-heading">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={titleRef}
          className="flex flex-col items-center mb-16 text-center"
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">About Me</span>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4 heading-enhanced">Who I Am</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300 text-lg">Get to know more about me, my background, and what drives my passion for technology.</p>
        </motion.div>

        {/* Redesigned: Perfect center alignment with optimized layout */}
        <div className="flex flex-col items-center max-w-7xl mx-auto space-y-12">
          {/* Enhanced centered content */}
          <motion.article 
            ref={textRef} 
            role="article" 
            aria-labelledby="about-content-heading" 
            className="text-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 25, stiffness: 400 }}
          >
            <h3 id="about-content-heading" className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Transforming Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Digital Realities</span>
            </h3>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm Nonso Nkire, an engineering student with a focus on computer and software systems. My journey in technology is driven by curiosity and a passion for solving complex problems through elegant code.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                With experience in web development, C#, and Python, I continuously expand my skillset to become a versatile software engineer. I believe in creating intuitive, efficient solutions that make a positive impact.
              </p>
            </div>
          </motion.article>

          {/* Enhanced Current Focus Areas widget */}
          <motion.div 
            className="bg-dark-600/70 backdrop-blur-sm rounded-2xl p-8 border border-dark-400/40 w-full max-w-6xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", damping: 25, stiffness: 400 }}
            whileHover={{ 
              boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)",
              transition: { type: "spring", damping: 25, stiffness: 400 }
            }}
          >
            <h4 className="text-xl font-semibold mb-8 text-primary-400 text-center">Current Focus Areas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { color: 'bg-primary-500', text: 'Full-Stack Development' },
                { color: 'bg-secondary-500', text: 'System Architecture' },
                { color: 'bg-accent-500', text: 'Performance Optimization' },
                { color: 'bg-warning-500', text: 'User Experience Design' }
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  className="flex items-center gap-4 p-3 rounded-lg bg-dark-500/50 hover:bg-dark-500/70 transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.1, 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 400 
                  }}
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", damping: 20, stiffness: 400 }
                  }}
                >
                  <div className={`w-3 h-3 ${item.color} rounded-full flex-shrink-0`}></div>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Redesigned: Perfectly balanced grid layout */}
          <motion.div 
            ref={cardsRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl" 
            role="list" 
            aria-label="Personal qualities and skills"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", damping: 25, stiffness: 400 }}
          >
            {[
              {
                icon: Rocket,
                title: "Goal-Oriented",
                description: "Committed to becoming a professional software engineer with a focus on creating impactful applications.",
                color: "primary-500",
                bgColor: "primary-500/10",
                hoverBgColor: "primary-500/20"
              },
              {
                icon: Zap,
                title: "Fast Learner",
                description: "Quick to adopt new languages and frameworks, with a natural ability to apply concepts across different technologies.",
                color: "secondary-400",
                bgColor: "secondary-500/10",
                hoverBgColor: "secondary-500/20"
              },
              {
                icon: LightbulbIcon,
                title: "Creative Problem Solver",
                description: "Approaching challenges with innovative thinking and determination to find optimal solutions.",
                color: "accent-400",
                bgColor: "accent-500/10",
                hoverBgColor: "accent-500/20"
              },
              {
                icon: Brain,
                title: "Continuous Learner",
                description: "Dedicated to ongoing education and staying current with emerging technologies and best practices.",
                color: "success-500",
                bgColor: "success-500/10",
                hoverBgColor: "success-500/20"
              }
            ].map((card, index) => (
              <motion.div 
                key={card.title}
                className="bg-dark-600/80 backdrop-blur-sm p-6 rounded-2xl border border-dark-400/40 transition-all duration-300 group transform-gpu will-change-transform apple-button shadow-lg"
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1 + index * 0.15, 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 400 
                }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.3)",
                  transition: { type: "spring", damping: 20, stiffness: 400 }
                }}
                whileTap={{
                  y: -2,
                  scale: 0.98,
                  transition: { type: "spring", damping: 30, stiffness: 500 }
                }}
              >
                <div className={`bg-${card.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${card.hoverBgColor} transition-colors duration-300`}>
                  <card.icon className={`h-7 w-7 text-${card.color}`} aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold mb-3 text-white">{card.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <AnimatedDivider type="gradient" />
    </section>
  );
});

About.displayName = 'About';

export default About;
