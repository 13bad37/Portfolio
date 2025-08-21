import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { fadeIn } from '../../hooks/useAnimation';
import LocationWeather from '../ui/LocationWeather';
import EnhancedFloatingElements from '../animations/EnhancedFloatingElements';

const Contact: React.FC = () => {
  const titleAnimation = fadeIn('up');
  const contactInfoAnimation = fadeIn('up', 0.3);
  const socialAnimation = fadeIn('up', 0.5);

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8 text-primary-400" />,
      title: 'Email',
      value: 'nonsognkire@gmail.com',
      href: 'mailto:nonsognkire@gmail.com',
      description: 'Send me an email for professional inquiries'
    },
    {
      icon: <Linkedin className="h-8 w-8 text-blue-400" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/nonso-nkire',
      href: 'https://www.linkedin.com/in/nonso-nkire-1578122a7/',
      description: 'Connect with me on LinkedIn'
    },
    {
      icon: <Github className="h-8 w-8 text-gray-400" />,
      title: 'GitHub',
      value: 'github.com/13bad37',
      href: 'https://github.com/13bad37',
      description: 'Check out my code repositories'
    }
  ];

  return (
    <section id="contact" className="py-16 relative content-auto" role="region" aria-labelledby="contact-heading">
      <EnhancedFloatingElements variant="floating-icons" density="light" />
      <div className="absolute inset-0 bg-gradient-radial from-dark-600 to-dark-500 opacity-60" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-12 text-center"
          {...titleAnimation}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">Get In Touch</span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 heading-enhanced">Contact Me</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">
            Ready to collaborate or have questions about my work? I'm always excited to discuss new projects, 
            creative ideas, or opportunities to contribute to your vision.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto"
          {...contactInfoAnimation}
        >
          {/* Location and Weather - moved above contact cards */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">My Local Time & Weather</h3>
              <p className="text-gray-400 text-sm">Currently based in Brisbane, Australia</p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <LocationWeather />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="bg-dark-600/80 backdrop-blur-sm rounded-xl border border-dark-400 p-8 text-center group hover:border-primary-500/50 transition-all duration-300 transform-gpu will-change-transform"
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-dark-500 rounded-full group-hover:bg-primary-500/20 transition-colors duration-300 transform-gpu">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                <motion.a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary-400 hover:text-primary-300 transition-colors font-medium inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {method.value}
                  {method.href.startsWith('http') && <ExternalLink size={16} />}
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="bg-dark-600/80 backdrop-blur-sm rounded-2xl border border-dark-400 p-8 text-center"
            {...socialAnimation}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new opportunities, discussing technology, 
              or collaborating on exciting projects. Don't hesitate to reach out!
            </p>
            
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://github.com/13bad37"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-500 p-4 rounded-full text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ y: -2 }}
                aria-label="GitHub Profile"
              >
                <Github size={28} className="group-hover:text-white transition-colors" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/nonso-nkire-1578122a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-500 p-4 rounded-full text-gray-300 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ y: -2 }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={28} className="group-hover:text-blue-400 transition-colors" />
              </motion.a>
              
              <motion.a
                href="mailto:nonsognkire@gmail.com"
                className="bg-dark-500 p-4 rounded-full text-gray-300 hover:text-primary-400 hover:bg-primary-500/20 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ y: -2 }}
                aria-label="Send Email"
              >
                <Mail size={28} className="group-hover:text-primary-400 transition-colors" />
              </motion.a>
            </div>

            <motion.div 
              className="mt-8 pt-8 border-t border-dark-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-gray-400 text-sm">
                <MapPin className="inline mr-2" size={16} />
                Open to remote opportunities worldwide
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
