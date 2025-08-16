import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative z-10 bg-dark-600 mt-20" role="contentinfo" aria-label="Site footer">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" aria-hidden="true" />
      
      {/* Back to top button */}
      <div className="flex justify-center">
        <motion.button
          onClick={scrollToTop}
          className="bg-primary-500 rounded-full p-3 text-white relative -top-6 hover:bg-primary-600 transition-colors shadow-lg"
          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.5)' }}
          whileTap={{ y: -2 }}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col" role="complementary" aria-labelledby="footer-brand">
            <h3 id="footer-brand" className="text-2xl font-bold text-white mb-4">Nonso<span className="text-primary-500">.</span>dev</h3>
            <p className="text-gray-400 mb-4">Turning ideas into elegant and functional digital experiences through code.</p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-2" role="list" aria-label="Social media links">
              <motion.a
                href="https://github.com/13bad37"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
                role="listitem"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/nonso-nkire-1578122a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
                role="listitem"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:nonsognkire@gmail.com"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email"
                role="listitem"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <nav role="navigation" aria-labelledby="footer-nav-heading">
            <h3 id="footer-nav-heading" className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2" role="list">
              {['Home', 'About', 'Skills', 'Projects', 'Showcase', 'Contact'].map((item) => (
                <li key={item} role="listitem">
                  <motion.a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                    whileHover={{ x: 3 }}
                    aria-label={`Go to ${item} section`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${item.toLowerCase().replace(' ', '-')}`)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div role="complementary" aria-labelledby="footer-contact-heading">
            <h3 id="footer-contact-heading" className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Get In Touch</h3>
            <ul className="space-y-2" role="list" aria-label="Contact information">
              <li className="flex items-center text-gray-400" role="listitem">
                <Mail size={16} className="mr-2 text-primary-500" aria-hidden="true" />
                <a href="mailto:nonsognkire@gmail.com" className="hover:text-primary-400 transition-colors">
                  nonsognkire@gmail.com
                </a>
              </li>
              <li className="flex items-center text-gray-400" role="listitem">
                <Linkedin size={16} className="mr-2 text-primary-500" aria-hidden="true" />
                <a 
                  href="https://www.linkedin.com/in/nonso-nkire-1578122a7/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li className="flex items-center text-gray-400" role="listitem">
                <Github size={16} className="mr-2 text-primary-500" aria-hidden="true" />
                <a 
                  href="https://github.com/13bad37" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  GitHub Repositories
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Nonso Nkire. All rights reserved.
          </p>
          <p className="flex items-center text-gray-500 text-sm">
            Built with <Heart size={14} className="mx-1 text-primary-500" aria-hidden="true" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;