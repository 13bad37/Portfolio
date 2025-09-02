import React, { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Individual icon imports for better tree shaking and bundle size
import Code from 'lucide-react/dist/esm/icons/code';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Github from 'lucide-react/dist/esm/icons/github';
import X from 'lucide-react/dist/esm/icons/x';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { useHoverState } from '../../hooks/useMousePosition';
import { fadeIn } from '../../hooks/useAnimation';
import LazyImage from '../ui/LazyImage';
import Portal from '../ui/Portal';
import AnimatedDivider from '../ui/AnimatedDivider';
import FloatingElements from '../animations/FloatingElements';
import { modalScrollManager } from '../../utils/modalScrollManager';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  webpImage?: string;
  category: string;
  technologies: string[];
  github?: string;
  live?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Movie Application",
    description: "A comprehensive movie browsing and discovery application with advanced search and filtering capabilities.",
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    webpImage: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1&fm=webp",
    category: "Web Development",
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "API Integration"],
    github: "https://github.com/13bad37/Movie-Application",
    features: [
      "Advanced movie search and filtering system",
      "Responsive design with mobile-first approach",
      "Real-time movie data integration",
      "User-friendly interface with smooth animations"
    ]
  },
  {
    id: 2,
    title: "Server Express Application",
    description: "A robust server-side application built with Express.js featuring RESTful APIs and database integration.",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    webpImage: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1&fm=webp",
    category: "Backend Development",
    technologies: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    github: "https://github.com/13bad37/Server-Side-Express-Application",
    features: [
      "RESTful API development with Express.js",
      "Database integration and data management",
      "Authentication and authorization systems",
      "Scalable architecture with middleware support"
    ]
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description: "This sophisticated portfolio website you're currently viewing, featuring advanced animations and interactive elements.",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    webpImage: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1&fm=webp",
    category: "Web Development",
    technologies: ["React", "TypeScript", "CSS Animations", "Tailwind CSS"],
    github: "https://github.com/13bad37/Portfolio",
    features: [
      "Optimized performance with CSS-only animations",
      "Advanced scroll management and user experience",
      "Responsive design with tailored mobile experience",
      "Sophisticated Apple-style interface design"
    ]
  },
  {
    id: 4,
    title: "Hospital Management System",
    description: "A comprehensive hospital management system built with C# for managing patient records, appointments, and medical staff operations.",
    image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1",
    webpImage: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1&fm=webp",
    category: "Backend Development",
    technologies: ["C#", ".NET Framework", "SQL Server", "Windows Forms"],
    github: "https://github.com/13bad37/Hospital-Management-System",
    features: [
      "Patient registration and medical history management",
      "Appointment scheduling and doctor assignment",
      "Medical staff and department management",
      "Prescription and treatment tracking",
    ]
  }
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = memo(({ project, onClick }) => {
  const [isHovered, hoverProps] = useHoverState();
  const cardAnimation = fadeIn('up', 0.2);

  return (
    <motion.div 
      ref={cardAnimation.ref as unknown as React.RefObject<HTMLDivElement>}
      animate={cardAnimation.controls}
      className="group rounded-2xl overflow-hidden bg-dark-600/80 backdrop-blur-sm border border-dark-400/50 hover:border-primary-500/50 transition-all duration-300 relative cursor-pointer transform-gpu will-change-transform h-full flex flex-col shadow-lg"
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 25px 50px -10px rgba(139, 92, 246, 0.3)',
        transition: { type: "spring", damping: 20, stiffness: 400 }
      }}
      whileTap={{ 
        y: -5, 
        scale: 1.01,
        transition: { type: "spring", damping: 30, stiffness: 500 }
      }}
      onClick={onClick}
      {...hoverProps}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Enhanced image container with better hover effects */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage 
          src={project.image}
          webpSrc={project.webpImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" aria-hidden="true"></div>
        
        {/* Enhanced category badge */}
        <motion.div 
          className="absolute top-4 left-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        >
          <span className="px-3 py-1.5 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-primary-400/30">
            {project.category}
          </span>
        </motion.div>

        {/* Subtle overlay glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        
        {/* Enhanced technology tags */}
        <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <motion.span 
              key={tech} 
              className="px-3 py-1 bg-dark-500/80 text-primary-300 text-xs font-medium rounded-lg border border-dark-400/30 transition-all duration-200 hover:bg-primary-500/20 hover:text-primary-400 hover:border-primary-500/30"
              role="listitem"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3, type: "spring", damping: 25, stiffness: 400 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <motion.span 
              className="px-3 py-1 bg-dark-500/80 text-primary-300 text-xs font-medium rounded-lg border border-dark-400/30"
              whileHover={{ scale: 1.05 }}
            >
              +{project.technologies.length - 3}
            </motion.span>
          )}
        </div>
        
        {/* Enhanced call to action */}
        <motion.div 
          className="flex items-center text-primary-400 text-sm font-semibold mt-auto group-hover:text-primary-300 transition-colors duration-300"
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.3, type: "spring", damping: 20, stiffness: 400 }}
          aria-hidden="true"
        >
          <span className="mr-2">Explore Project</span>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 20, stiffness: 400 }}
          >
            <ChevronRight size={18} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

const ProjectDetail: React.FC<{ project: Project; onClose: () => void }> = memo(({ project, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  
  // Enhanced close handler with immediate cleanup to prevent rubber banding
  const handleClose = React.useCallback(() => {
    if (isClosing) return;
    
    setIsClosing(true);
    
    // Critical: Unlock scroll BEFORE any state changes to prevent rubber banding
    modalScrollManager.unlock();
    
    // Use requestAnimationFrame for immediate but smooth close
    requestAnimationFrame(() => {
      onClose();
    });
  }, [onClose, isClosing]);

  React.useEffect(() => {
    modalScrollManager.lock();
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Emergency cleanup only if component unmounts unexpectedly
      if (!isClosing) {
        modalScrollManager.unlock();
      }
    };
  }, [handleClose, isClosing]);

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      aria-describedby="project-detail-description"
    >
      <div 
        className="bg-dark-600/95 backdrop-blur-xl rounded-3xl overflow-hidden w-full overflow-y-auto border border-dark-400/40 shadow-2xl relative modal-content"
        data-modal-content
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#8b5cf6 transparent',
          maxWidth: 'min(90vw, 1200px)',
          maxHeight: 'min(90vh, 800px)',
          margin: 'auto'
        }}
      >
        {/* Enhanced close button with modal-relative positioning - no animations */}
        <button 
          onClick={handleClose}
          className="absolute z-[10] p-3 bg-dark-500/95 backdrop-blur-md rounded-2xl text-white hover:bg-red-500/90 transition-colors duration-100 shadow-xl border-2 border-dark-400/70 touch-target-large modal-close-button"
          aria-label="Close project details"
          style={{
            minWidth: '48px',
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '1rem',
            right: '1rem'
          }}
        >
          <X size={20} strokeWidth={2} className="transition-colors" />
        </button>

        {/* Enhanced hero image section */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <LazyImage 
            src={project.image}
            webpSrc={project.webpImage}
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/40 to-transparent" aria-hidden="true"></div>
          
          <motion.div 
            className="absolute bottom-0 left-0 p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 25, stiffness: 400 }}
          >
            <motion.span 
              className="px-4 py-2 bg-primary-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4 inline-block border border-primary-400/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
            >
              {project.category}
            </motion.span>
            <h2 id="project-detail-title" className="text-3xl sm:text-4xl font-bold text-white">{project.title}</h2>
          </motion.div>
        </div>
        
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Enhanced technology tags */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-8" 
            role="list" 
            aria-label="Technologies used in this project"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 25, stiffness: 400 }}
          >
            {project.technologies.map((tech, index) => (
              <motion.span 
                key={tech} 
                className="px-4 py-2 bg-dark-500/80 backdrop-blur-sm text-primary-300 text-sm font-medium rounded-xl border border-dark-400/30 hover:bg-primary-500/10 hover:border-primary-500/30 transition-all duration-200"
                role="listitem"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, type: "spring", damping: 25, stiffness: 400 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Enhanced description section */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", damping: 25, stiffness: 400 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
              Project Overview
            </h3>
            <p id="project-detail-description" className="text-gray-300 leading-relaxed text-lg">
              {project.description}
            </p>
          </motion.div>
          
          {/* Enhanced features section */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", damping: 25, stiffness: 400 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-1 h-6 bg-secondary-500 rounded-full"></span>
              Key Features
            </h3>
            <ul className="space-y-4" role="list">
              {project.features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-dark-500/50 rounded-xl border border-dark-400/30 hover:border-primary-500/30 transition-all duration-200" 
                  role="listitem"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", damping: 25, stiffness: 400 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                  </span>
                  <span className="text-gray-300 leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Enhanced action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4" 
            role="group" 
            aria-label="Project links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", damping: 25, stiffness: 400 }}
          >
            {project.github && (
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-dark-500/80 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-dark-400 transition-all duration-200 touch-target border border-dark-400/50 hover:border-primary-500/30 group"
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                  transition: { type: "spring", damping: 20, stiffness: 400 }
                }}
                whileTap={{ 
                  y: -1,
                  transition: { type: "spring", damping: 30, stiffness: 500 }
                }}
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <Github size={20} aria-hidden="true" className="group-hover:text-primary-400 transition-colors" />
                <span>View Source Code</span>
              </motion.a>
            )}
            
            {project.live && (
              <motion.a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all duration-200 touch-target shadow-lg shadow-primary-500/25 group"
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 15px 35px -5px rgba(139, 92, 246, 0.4)",
                  transition: { type: "spring", damping: 20, stiffness: 400 }
                }}
                whileTap={{ 
                  y: -1,
                  transition: { type: "spring", damping: 30, stiffness: 500 }
                }}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={20} aria-hidden="true" className="group-hover:rotate-12 transition-transform" />
                <span>Live Demo</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
});
const Projects: React.FC = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);

  // Memoize categories array to prevent recreation on every render
  const categories = useMemo(() => 
    ['All', ...new Set(projects.map(p => p.category))], 
    [] // Empty deps since projects array is static
  );
  
  // Memoize filtered projects for better performance
  const filteredProjects = useMemo(() => 
    currentCategory === 'All' 
      ? projects 
      : projects.filter(p => p.category === currentCategory),
    [currentCategory]
  );

  // Enhanced category change handler with transition management (memoized for performance)
  const handleCategoryChange = useCallback((category: string) => {
    if (category === currentCategory) return;
    
    setIsFilterTransitioning(true);
    setCurrentCategory(category);
    
    // Allow animation to complete before removing transition state
    setTimeout(() => {
      setIsFilterTransitioning(false);
    }, 300);
  }, [currentCategory]);

  const titleAnimation = fadeIn('up');

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 relative content-auto" role="region" aria-labelledby="projects-heading">
      <FloatingElements variant="code" density="light" />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-600/20 via-dark-500/10 to-dark-600/20" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-12 text-center"
          ref={titleAnimation.ref}
          animate={titleAnimation.controls}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">My Work</span>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold mb-4 heading-enhanced">Featured Projects</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">
            A selection of my projects showcasing my skills and experience in software development.
          </p>
        </motion.div>

        <div className="mb-10" role="navigation" aria-label="Project category filters">
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  currentCategory === category
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                    : 'bg-dark-600 text-gray-300 hover:bg-dark-500 hover:text-white border border-dark-500'
                }`}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.98 }}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={currentCategory === category}
                aria-label={`Filter projects by ${category}`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${currentCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isFilterTransitioning ? 0 : 1, 
                  y: isFilterTransitioning ? 20 : 0 
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: isFilterTransitioning ? 0 : index * 0.1,
                  ease: "easeOut"
                }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => {
                    setSelectedProject(project);
                    try {
                      window.dispatchEvent(new CustomEvent('project:open'));
                    } catch {
                      // Event dispatch failed
                    }
                  }} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          role="complementary"
          aria-label="Additional projects link"
        >
          <motion.a
            href="https://github.com/13bad37"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-dark-600 hover:bg-dark-500 px-6 py-3 rounded-lg border border-dark-400 hover:border-primary-500/50 transition-all text-white"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(17, 24, 39, 0.8)' }}
            whileTap={{ y: -2 }}
            aria-label="View more projects on GitHub"
          >
            <Code size={20} className="text-primary-500" aria-hidden="true" />
            <span>View More Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
      
      <AnimatedDivider type="dots" />

      {selectedProject && (
        <Portal>
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </Portal>
      )}
    </section>
  );
});

ProjectCard.displayName = 'ProjectCard';
ProjectDetail.displayName = 'ProjectDetail';
Projects.displayName = 'Projects';

export default Projects;
