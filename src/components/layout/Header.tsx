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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 will-change-transform ${
        isScrolled ? 'bg-dark-500/80 backdrop-blur-md py-2 shadow-md' : 'bg-transparent py-4'
      }`}
      variants={headerVariants}
      initial="initial"
      animate={isHiddenForModal ? { y: -100, opacity: 0 } : 'animate'}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="flex items-center gap-2 text-white font-bold text-xl md:text-2xl font-mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Nonso Nkire - Software Engineer, go to home section"
          >
            <Code2 className="text-primary-500" />
            <span>nonso<span className="text-primary-500">.</span>software</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative px-1 py-2 font-medium transition-colors hover-underline ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-full"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4" role="complementary" aria-label="Social media links">
            <motion.a
              href="https://github.com/13bad37"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#6366F1' }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/nonso-nkire-1578122a7/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#6366F1' }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:nonsognkire@gmail.com"
              whileHover={{ y: -2, color: '#6366F1' }}
              whileTap={{ y: 0 }}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-white p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-dark-500 z-50 md:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <motion.a
                  href="#home"
                  className="flex items-center gap-2 text-white font-bold text-xl font-mono"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Nonso Nkire - Software Engineer, go to home section"
                >
                  <Code2 className="text-primary-500" />
                  <span>nonso<span className="text-primary-500">.</span>software</span>
                </motion.a>
                <motion.button
                  onClick={toggleMenu}
                  className="text-white p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close mobile navigation menu"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <nav className="flex flex-col gap-4 mb-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'text-gray-300 hover:bg-dark-400 hover:text-white'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                    aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              <div className="flex justify-center gap-8 mt-auto mb-8" role="complementary" aria-label="Social media links">
                <motion.a
                  href="https://github.com/13bad37"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, color: '#6366F1' }}
                  whileTap={{ y: 0 }}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/nonso-nkire-1578122a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, color: '#6366F1' }}
                  whileTap={{ y: 0 }}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="mailto:nonsognkire@gmail.com"
                  whileHover={{ y: -2, color: '#6366F1' }}
                  whileTap={{ y: 0 }}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
