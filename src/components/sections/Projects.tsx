import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useHoverState } from '../../hooks/useMousePosition';
import { fadeIn } from '../../hooks/useAnimation';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import LazyImage from '../ui/LazyImage';

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
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Web Development",
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "API Integration"],
    github: "https://github.com/13bad37/Movie-Application",
    live: "#",
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
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    description: "A sophisticated portfolio website featuring advanced animations and interactive elements.",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Web Development",
    technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/13bad37",
    live: "#",
    features: [
      "Custom cursor with context-aware animations",
      "Particle system background with interactive elements",
      "Responsive design with tailored mobile experience",
      "Smooth page transitions and micro-interactions"
    ]
  },
  {
    id: 4,
    title: "Student Management System",
    description: "A comprehensive system for managing student records, courses, and academic performance.",
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Backend Development",
    technologies: ["C#", ".NET Core", "SQL Server", "Bootstrap"],
    github: "https://github.com/13bad37",
    features: [
      "User authentication and role-based access control",
      "Student record management with search and filter",
      "Course registration and grade tracking",
      "Reporting and analytics dashboard"
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
        y: -12, 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
      }}
      whileTap={{ y: -6, scale: 1.01 }}
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
          className="w-full h-full transition-transform duration-700 group-hover:scale-125 transform-gpu"
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
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-500/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      aria-describedby="project-detail-description"
    >
      <motion.div 
        className="bg-dark-600 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/60 to-transparent" aria-hidden="true"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-dark-500/80 rounded-full text-white hover:bg-primary-500 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
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
                className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-500 text-white rounded-lg font-medium hover:bg-dark-400 transition-colors"
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
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
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
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = currentCategory && currentCategory !== 'All'
    ? projects.filter(p => p.category === currentCategory)
    : projects;

  const titleAnimation = fadeIn('up');

  const scrollLeft = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 relative" role="region" aria-labelledby="projects-heading">
      <div className="absolute inset-0 bg-gradient-conic from-dark-600 via-dark-500 to-dark-600 opacity-50" aria-hidden="true"></div>
      
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

        <div className="relative mb-10" role="navigation" aria-label="Project category filters">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <motion.button 
              onClick={scrollLeft}
              className="p-2 bg-dark-500 rounded-full text-white shadow-lg hover:bg-primary-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>
          
          <div 
            ref={projectsRef}
            className="flex space-x-4 overflow-x-auto py-4 px-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Project categories"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  currentCategory === category || (category === 'All' && !currentCategory)
                    ? 'bg-primary-500 text-white' 
                    : 'bg-dark-600 text-gray-300 hover:bg-dark-500'
                } transition-colors`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => setCurrentCategory(category === 'All' ? null : category)}
                role="tab"
                aria-selected={currentCategory === category || (category === 'All' && !currentCategory)}
                aria-controls="projects-grid"
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <motion.button 
              onClick={scrollRight}
              className="p-2 bg-dark-500 rounded-full text-white shadow-lg hover:bg-primary-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
    </section>
  );
};

export default Projects;