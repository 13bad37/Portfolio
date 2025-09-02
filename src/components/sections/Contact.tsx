import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import { fadeIn } from '../../hooks/useAnimation';
import LocationWeather from '../ui/LocationWeather';
import EnhancedFloatingElements from '../animations/EnhancedFloatingElements';

const Contact: React.FC = memo(() => {
  const titleAnimation = fadeIn('up');
  const contactInfoAnimation = fadeIn('up', 0.3);
  const socialAnimation = fadeIn('up', 0.5);

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8 text-primary-400" />,
      title: 'Email',
      value: 'nonsognkire@gmail.com',
      href: 'mailto:nonsognkire@gmail.com',
      description: 'Send me an email for professional inquiries',
      color: 'primary'
    },
    {
      icon: <Linkedin className="h-8 w-8 text-blue-400" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/nonso-nkire',
      href: 'https://www.linkedin.com/in/nonso-nkire-1578122a7/',
      description: 'Connect with me on LinkedIn',
      color: 'blue'
    },
    {
      icon: <Github className="h-8 w-8 text-gray-400" />,
      title: 'GitHub',
      value: 'github.com/13bad37',
      href: 'https://github.com/13bad37',
      description: 'Check out my code repositories',
      color: 'gray'
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative content-auto" role="region" aria-labelledby="contact-heading">
      <EnhancedFloatingElements variant="floating-icons" density="light" />
      <div className="absolute inset-0 bg-gradient-radial from-dark-600 to-dark-500 opacity-60" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16 text-center"
          ref={titleAnimation.ref}
          animate={titleAnimation.controls}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">Get In Touch</span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 heading-enhanced">Let's Connect</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300 text-lg leading-relaxed">
            Ready to collaborate or have questions about my work? I'm always excited to discuss new projects, 
            creative ideas, or opportunities to contribute to your vision.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-6xl mx-auto"
          ref={contactInfoAnimation.ref}
          animate={contactInfoAnimation.controls}
        >
          {/* Enhanced Location and Weather widget */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 25, stiffness: 400 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-3 flex items-center justify-center gap-3">
                <MapPin className="h-6 w-6 text-primary-500" />
                Local Time & Weather
              </h3>
              <p className="text-gray-400">Currently based in Brisbane, Australia</p>
            </div>
            <div className="w-full max-w-3xl mx-auto">
              <LocationWeather />
            </div>
          </motion.div>

          {/* Enhanced contact method cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="bg-dark-600/80 backdrop-blur-xl rounded-2xl border border-dark-400/50 p-8 text-center group transition-all duration-300 transform-gpu will-change-transform shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  damping: 25,
                  stiffness: 400
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: method.color === 'primary' 
                    ? '0 25px 50px -10px rgba(139, 92, 246, 0.3)'
                    : method.color === 'blue'
                    ? '0 25px 50px -10px rgba(59, 130, 246, 0.3)'
                    : '0 25px 50px -10px rgba(107, 114, 128, 0.3)',
                  transition: { type: "spring", damping: 20, stiffness: 400 }
                }}
                whileTap={{ 
                  y: -5, 
                  scale: 1.01,
                  transition: { type: "spring", damping: 30, stiffness: 500 }
                }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", damping: 20, stiffness: 400 }
                  }}
                >
                  <div className="p-4 bg-dark-500/70 backdrop-blur-sm rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300 shadow-lg">
                    {method.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{method.description}</p>
                <motion.a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary-400 hover:text-primary-300 transition-colors font-semibold inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-500/10 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Contact via ${method.title}`}
                >
                  {method.value}
                  {method.href.startsWith('http') && <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />}
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Enhanced connection section */}
          <motion.div 
            className="bg-dark-600/80 backdrop-blur-xl rounded-3xl border border-dark-400/50 p-8 lg:p-12 text-center shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            transition={{ delay: 0.8, type: "spring", damping: 25, stiffness: 400 }}
            whileHover={{ 
              boxShadow: "0 30px 60px -10px rgba(139, 92, 246, 0.2)",
              transition: { type: "spring", damping: 25, stiffness: 400 }
            }}
            ref={socialAnimation.ref}
            animate={socialAnimation.controls}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Start a Conversation?</h3>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              I'm always interested in hearing about new opportunities, discussing technology, 
              or collaborating on exciting projects. Let's create something amazing together!
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
              {[
                { href: "https://github.com/13bad37", icon: Github, label: "GitHub", color: "hover:text-white hover:bg-gray-600" },
                { href: "https://www.linkedin.com/in/nonso-nkire-1578122a7/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400 hover:bg-blue-500/20" },
                { href: "mailto:nonsognkire@gmail.com", icon: Mail, label: "Email", color: "hover:text-primary-400 hover:bg-primary-500/20" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`bg-dark-500/70 p-4 rounded-2xl text-gray-300 transition-all duration-300 group touch-target-large shadow-lg ${social.color}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1 + index * 0.1,
                    type: "spring",
                    damping: 25,
                    stiffness: 400
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", damping: 20, stiffness: 400 }
                  }}
                  whileTap={{ 
                    y: -2,
                    scale: 1.05,
                    transition: { type: "spring", damping: 30, stiffness: 500 }
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={32} className="transition-colors" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="pt-8 border-t border-dark-500/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                <MapPin size={16} className="text-primary-500" />
                Open to remote opportunities worldwide
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
