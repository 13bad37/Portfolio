import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import { useHoverState } from '../../hooks/useMousePosition';
import { fadeIn } from '../../hooks/useAnimation';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import LazyImage from '../ui/LazyImage';
import AnimatedDivider from '../ui/AnimatedDivider';
import { modalScrollManager } from '../../utils/modalScrollLock';
import { modalScrollManager } from '../../utils/modalScrollManager';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
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
    category: "Backend Development",
    technologies: ["C#", ".NET Framework", "SQL Server", "Windows Forms"],
    github: "https://github.com/13bad37/Hospital-Management-System",
    features: [
      "Patient registration and medical history management",
      "Appointment scheduling and doctor assignment",
      "Medical staff and department management",
      "Prescription and treatment tracking",
      "Billing and payment processing system"
    ]
  }
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const [isHovered, hoverProps] = useHoverState();
  const { ref } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const cardAnimation = fadeIn('up', 0.2);

  return (
    <motion.div 
      ref={ref}
      className="group rounded-xl overflow-hidden bg-dark-600 border border-dark-400 hover:border-primary-500/50 transition-all duration-300 relative cursor-pointer transform-gpu will-change-transform smooth-hover"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 40px -12px rgba(139, 92, 246, 0.2)'
      }}
      whileTap={{ y: -2, scale: 1.01 }}
      onClick={onClick}
      {...hoverProps}
      {...cardAnimation}
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
      <div className="relative h-48 overflow-hidden">
        <LazyImage 
          src={project.image}
          alt={project.title}
          className="w-full h-full transition-transform duration-500 group-hover:scale-110 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/20 to-transparent transition-opacity duration-300 group-hover:opacity-75" aria-hidden="true"></div>
        
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-500/90 text-white text-xs font-medium rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors duration-300"
          layout
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-300 mb-4 line-clamp-2"
          layout
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4" 
          role="list" 
          aria-label="Technologies used"
          layout
        >
          {project.technologies.slice(0, 3).map((tech, index) => (
            <motion.span 
              key={tech} 
              className="px-2 py-1 bg-dark-500 text-primary-300 text-xs rounded transition-all duration-200 hover:bg-primary-500/20 hover:text-primary-400"
              role="listitem"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <motion.span 
              className="px-2 py-1 bg-dark-500 text-primary-300 text-xs rounded"
              whileHover={{ scale: 1.05 }}
            >
              +{project.technologies.length - 3}
            </motion.span>
          )}
        </motion.div>
        
        <motion.div 
          className="flex items-center text-primary-400 text-sm font-medium"
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-hidden="true"
        >
          View Details 
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChevronRight size={18} className="ml-1" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectDetail: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  React.useEffect(() => {
    // Lock scroll when modal opens - prevents background scrolling
    modalScrollManager.lock();
    
    // Apple-style escape key handling for better UX
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Unlock scroll when modal closes
      modalScrollManager.unlock();
    };
  }, [onClose]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)' 
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      aria-describedby="project-detail-description"
    >
      <motion.div 
        className="bg-dark-600/95 backdrop-blur-sm rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto border border-dark-400/30 shadow-2xl relative"
        data-modal-content
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 400,
          duration: 0.3
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#8b5cf6 transparent'
        }}
      >
        {/* Enhanced mobile-friendly close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-3 bg-dark-500/90 backdrop-blur-sm rounded-full text-white hover:bg-red-500/80 transition-all duration-200 shadow-lg border border-dark-400/50 touch-target"
          aria-label="Close project details"
          style={{
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/60 to-transparent" aria-hidden="true"></div>
          
          <div className="absolute bottom-0 left-0 p-6">
            <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-3 inline-block">
              {project.category}
            </span>
            <h2 id="project-detail-title" className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used in this project">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-dark-500 text-primary-300 text-sm rounded-lg"
                role="listitem"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Description</h3>
            <p id="project-detail-description" className="text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Key Features</h3>
            <ul className="space-y-2" role="list">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start" role="listitem">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-500/20 flex items-center justify-center mr-3 mt-0.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                  </span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Project links">
            {project.github && (
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-dark-500 text-white rounded-lg font-medium hover:bg-dark-400 transition-all duration-200 touch-target apple-button"
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <Github size={18} aria-hidden="true" />
                View Code
              </motion.a>
            )}
            
            {project.live && (
              <motion.a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 touch-target apple-button"
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={18} aria-hidden="true" />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = currentCategory === 'All'
    ? projects
    : projects.filter(p => p.category === currentCategory);

  const titleAnimation = fadeIn('up');

  return (
    <section id="projects" className="py-20 relative" role="region" aria-labelledby="projects-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-600/20 via-dark-500/10 to-dark-600/20" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16 text-center"
          {...titleAnimation}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">My Work</span>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
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
                onClick={() => setCurrentCategory(category)}
                role="tab"
                aria-selected={currentCategory === category}
                aria-controls="projects-grid"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          layout
          id="projects-grid"
          role="tabpanel"
          aria-label="Project showcase"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetail 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
        
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
    </section>
  );
};

export default Projects;