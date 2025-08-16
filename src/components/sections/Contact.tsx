import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, AlertCircle, Check } from 'lucide-react';
import { fadeIn } from '../../hooks/useAnimation';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const titleAnimation = fadeIn('up');
  const formAnimation = fadeIn('right', 0.3);
  const contactInfoAnimation = fadeIn('left', 0.3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formValues.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formValues.subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formValues.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formValues.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormValues(initialFormValues);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative" role="region" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-gradient-radial from-dark-600 to-dark-500 opacity-60" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16 text-center"
          {...titleAnimation}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">Get In Touch</span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div 
            className="lg:col-span-3"
            {...formAnimation}
          >
            <div className="bg-dark-600 rounded-2xl overflow-hidden border border-dark-400 shadow-xl" role="form" aria-labelledby="contact-form-heading">
              <div className="p-8">
                <h3 id="contact-form-heading" className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    className="flex items-center gap-3 p-4 bg-success-500/20 text-success-500 rounded-lg mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    aria-live="polite"
                  >
                    <Check className="flex-shrink-0" aria-hidden="true" />
                    <span>Your message has been sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    className="flex items-center gap-3 p-4 bg-error-500/20 text-error-500 rounded-lg mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="flex-shrink-0" aria-hidden="true" />
                    <span>Oops! Something went wrong. Please try again later.</span>
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-dark-500 border ${
                            formErrors.name ? 'border-error-500' : 'border-dark-400 focus:border-primary-500'
                          } rounded-lg text-white focus:outline-none transition-colors`}
                          placeholder="Your name"
                          aria-required="true"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? "name-error" : undefined}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="absolute -bottom-6 left-0 text-xs text-error-500 mt-1" role="alert">{formErrors.name}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-dark-500 border ${
                            formErrors.email ? 'border-error-500' : 'border-dark-400 focus:border-primary-500'
                          } rounded-lg text-white focus:outline-none transition-colors`}
                          placeholder="Your email"
                          aria-required="true"
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? "email-error" : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="absolute -bottom-6 left-0 text-xs text-error-500 mt-1" role="alert">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-dark-500 border ${
                          formErrors.subject ? 'border-error-500' : 'border-dark-400 focus:border-primary-500'
                        } rounded-lg text-white focus:outline-none transition-colors`}
                        placeholder="Subject of your message"
                        aria-required="true"
                        aria-invalid={!!formErrors.subject}
                        aria-describedby={formErrors.subject ? "subject-error" : undefined}
                      />
                      {formErrors.subject && (
                        <p id="subject-error" className="absolute -bottom-6 left-0 text-xs text-error-500 mt-1" role="alert">{formErrors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formValues.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 bg-dark-500 border ${
                          formErrors.message ? 'border-error-500' : 'border-dark-400 focus:border-primary-500'
                        } rounded-lg text-white focus:outline-none transition-colors`}
                        placeholder="Write your message here..."
                        aria-required="true"
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? "message-error" : undefined}
                      ></textarea>
                      {formErrors.message && (
                        <p id="message-error" className="absolute -bottom-6 left-0 text-xs text-error-500 mt-1" role="alert">{formErrors.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white ${
                        isSubmitting ? 'bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'
                      } transition-colors`}
                      whileHover={!isSubmitting ? { y: -3 } : {}}
                      whileTap={!isSubmitting ? { y: -1 } : {}}
                      aria-label={isSubmitting ? "Sending message" : "Send message"}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            aria-hidden="true"
                          >
                            <Send size={18} />
                          </motion.div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} aria-hidden="true" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-2"
            {...contactInfoAnimation}
          >
            <div className="bg-dark-600 rounded-2xl overflow-hidden border border-dark-400 shadow-xl h-full" role="complementary" aria-labelledby="contact-info-heading">
              <div className="p-8">
                <h3 id="contact-info-heading" className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                
                <p className="text-gray-300 mb-8">
                  Feel free to get in touch with me through any of the methods below. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                
                <ul className="space-y-6" role="list" aria-label="Contact methods">
                  <motion.li 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    role="listitem"
                  >
                    <div className="bg-primary-500/20 p-3 rounded-lg mr-4" aria-hidden="true">
                      <Mail className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                      <a 
                        href="mailto:nonsognkire@gmail.com" 
                        className="text-gray-300 hover:text-primary-400 transition-colors"
                        aria-label="Send email to nonsognkire@gmail.com"
                      >
                        nonsognkire@gmail.com
                      </a>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    role="listitem"
                  >
                    <div className="bg-secondary-500/20 p-3 rounded-lg mr-4" aria-hidden="true">
                      <Linkedin className="h-6 w-6 text-secondary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">LinkedIn</h4>
                      <a 
                        href="https://www.linkedin.com/in/nonso-nkire-1578122a7/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-secondary-400 transition-colors"
                        aria-label="Visit Nonso Nkire's LinkedIn profile"
                      >
                        linkedin.com/in/nonso-nkire
                      </a>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    role="listitem"
                  >
                    <div className="bg-accent-500/20 p-3 rounded-lg mr-4" aria-hidden="true">
                      <Github className="h-6 w-6 text-accent-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">GitHub</h4>
                      <a 
                        href="https://github.com/13bad37" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-accent-400 transition-colors"
                        aria-label="Visit Nonso Nkire's GitHub profile"
                      >
                        github.com/13bad37
                      </a>
                    </div>
                  </motion.li>
                </ul>
                
                <div className="mt-12">
                  <h4 className="text-lg font-medium text-white mb-4">Connect With Me</h4>
                  <div className="flex gap-4" role="list" aria-label="Social media links">
                    <motion.a
                      href="https://github.com/13bad37"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dark-500 p-3 rounded-full text-gray-300 hover:text-white hover:bg-dark-400 transition-colors"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(17, 24, 39, 0.8)' }}
                      whileTap={{ y: -2 }}
                      aria-label="GitHub"
                      role="listitem"
                    >
                      <Github size={24} />
                    </motion.a>
                    
                    <motion.a
                      href="https://www.linkedin.com/in/nonso-nkire-1578122a7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dark-500 p-3 rounded-full text-gray-300 hover:text-white hover:bg-dark-400 transition-colors"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(17, 24, 39, 0.8)' }}
                      whileTap={{ y: -2 }}
                      aria-label="LinkedIn"
                      role="listitem"
                    >
                      <Linkedin size={24} />
                    </motion.a>
                    
                    <motion.a
                      href="mailto:nonsognkire@gmail.com"
                      className="bg-dark-500 p-3 rounded-full text-gray-300 hover:text-white hover:bg-dark-400 transition-colors"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(17, 24, 39, 0.8)' }}
                      whileTap={{ y: -2 }}
                      aria-label="Email"
                      role="listitem"
                    >
                      <Mail size={24} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;