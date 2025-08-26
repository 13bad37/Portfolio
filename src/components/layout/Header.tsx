import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Code2 } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Programming', href: '#programming-expertise' },
  { name: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHiddenForModal, setIsHiddenForModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Use passive listener with throttling for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    const onProjectOpen = () => {
      setIsHiddenForModal(true);
      setIsMenuOpen(false);
    };
    const onProjectClose = () => {
      setIsHiddenForModal(false);
    };
    window.addEventListener('project:open', onProjectOpen as EventListener);
    window.addEventListener('project:close', onProjectClose as EventListener);
    return () => {
      window.removeEventListener('project:open', onProjectOpen as EventListener);
      window.removeEventListener('project:close', onProjectClose as EventListener);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Enhanced Apple-inspired animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 400,
        mass: 0.8
      } 
    },
  };

  const menuVariants = {
    closed: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 400
      }
    },
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 400,
        mass: 0.8
      } 
    },
  };

  // Enhanced smooth scroll function
  const smoothScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-dark-500/95 backdrop-blur-xl py-3 shadow-lg border-b border-dark-400/30' 
          : 'bg-transparent py-4'
      }`}
      variants={headerVariants}
      initial="initial"
      animate={isHiddenForModal ? { 
        y: -100, 
        opacity: 0, 
        zIndex: -1,
        transition: { type: "spring", damping: 30, stiffness: 400 }
      } : 'animate'}
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="flex items-center gap-2 text-white font-bold text-xl md:text-2xl font-mono touch-target"
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", damping: 20, stiffness: 300 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { type: "spring", damping: 30, stiffness: 400 }
            }}
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#home');
            }}
            aria-label="Nonso Nkire - Software Engineer, go to home section"
          >
            <Code2 className="text-primary-500" />
            <span>nonso<span className="text-primary-500">.</span>software</span>
          </motion.a>

          {/* Desktop Navigation - Enhanced */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 font-medium transition-all duration-200 hover-underline touch-target ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ 
                  y: -2,
                  transition: { type: "spring", damping: 20, stiffness: 400 }
                }}
                whileTap={{ 
                  y: 0,
                  transition: { type: "spring", damping: 30, stiffness: 500 }
                }}
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(item.href);
                }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-full"
                    layoutId="underline"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scaleX: 1,
                      transition: { type: "spring", damping: 25, stiffness: 400 }
                    }}
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Enhanced Social Links */}
          <div className="hidden md:flex items-center gap-4" role="complementary" aria-label="Social media links">
            {[
              { href: "https://github.com/13bad37", icon: Github, label: "GitHub", color: "#6366F1" },
              { href: "https://www.linkedin.com/in/nonso-nkire-1578122a7/", icon: Linkedin, label: "LinkedIn", color: "#3B82F6" },
              { href: "mailto:nonsognkire@gmail.com", icon: Mail, label: "Email", color: "#8B5CF6" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ 
                  y: -3, 
                  scale: 1.1,
                  color: social.color,
                  transition: { type: "spring", damping: 20, stiffness: 400 }
                }}
                whileTap={{ 
                  y: -1,
                  scale: 0.95,
                  transition: { type: "spring", damping: 30, stiffness: 500 }
                }}
                className="text-gray-300 hover:text-white transition-colors touch-target p-2 rounded-lg"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-white p-3 rounded-xl hover:bg-white/10 transition-colors touch-target-large"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transition: { type: "spring", damping: 20, stiffness: 400 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { type: "spring", damping: 30, stiffness: 500 }
            }}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-dark-500/98 backdrop-blur-xl z-[60] md:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full p-6 safe-area-inset">
              <div className="flex justify-between items-center mb-12">
                <motion.a
                  href="#home"
                  className="flex items-center gap-2 text-white font-bold text-xl font-mono touch-target"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", damping: 20, stiffness: 300 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { type: "spring", damping: 30, stiffness: 400 }
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo('#home');
                    setIsMenuOpen(false);
                  }}
                  aria-label="Nonso Nkire - Software Engineer, go to home section"
                >
                  <Code2 className="text-primary-500" />
                  <span>nonso<span className="text-primary-500">.</span>software</span>
                </motion.a>
                <motion.button
                  onClick={toggleMenu}
                  className="text-white p-3 rounded-xl hover:bg-white/10 transition-colors touch-target-large"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transition: { type: "spring", damping: 20, stiffness: 400 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { type: "spring", damping: 30, stiffness: 500 }
                  }}
                  aria-label="Close mobile navigation menu"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <nav className="flex flex-col gap-2 mb-12 flex-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium px-6 py-4 rounded-xl transition-all duration-200 touch-target ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1,
                        type: "spring", 
                        damping: 25, 
                        stiffness: 400 
                      }
                    }}
                    whileHover={{ 
                      x: 8,
                      scale: 1.02,
                      transition: { type: "spring", damping: 20, stiffness: 400 }
                    }}
                    whileTap={{ 
                      x: 4,
                      scale: 0.98,
                      transition: { type: "spring", damping: 30, stiffness: 500 }
                    }}
                    aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              <motion.div 
                className="flex justify-center gap-8 mt-auto mb-8 safe-area-bottom" 
                role="complementary" 
                aria-label="Social media links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.6, type: "spring", damping: 25, stiffness: 400 }
                }}
              >
                {[
                  { href: "https://github.com/13bad37", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/nonso-nkire-1578122a7/", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:nonsognkire@gmail.com", icon: Mail, label: "Email" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: 0.7 + index * 0.1,
                        type: "spring", 
                        damping: 25, 
                        stiffness: 400 
                      }
                    }}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.1,
                      transition: { type: "spring", damping: 20, stiffness: 400 }
                    }}
                    whileTap={{ 
                      y: -1,
                      scale: 0.95,
                      transition: { type: "spring", damping: 30, stiffness: 500 }
                    }}
                    className="text-gray-300 hover:text-primary-400 transition-colors p-3 rounded-xl hover:bg-primary-500/10 touch-target-large"
                    aria-label={social.label}
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
