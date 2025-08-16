import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useHoverState } from '../../hooks/useMousePosition';
import { fadeIn } from '../../hooks/useAnimation';

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
    id: 2,
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
  },
  {
    id: 3,
    title: "Weather Forecast App",
    description: "A sleek weather application that provides real-time forecasts and historical weather data.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Web Development",
    technologies: ["JavaScript", "React", "OpenWeather API", "Chart.js"],
    github: "https://github.com/13bad37",
    live: "#",
    features: [
      "Real-time weather data from multiple locations",
      "Interactive charts for temperature and precipitation trends",
      "7-day forecast with detailed hourly predictions",
      "Location-based weather detection"
    ]
  },
  {
    id: 4,
    title: "Data Analysis Tool",
    description: "A Python tool for analyzing and visualizing complex datasets for research purposes.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Data Science",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/13bad37",
    features: [
      "Data cleaning and preprocessing capabilities",
      "Statistical analysis and correlation detection",
      "Custom visualization options with export functionality",
      "Support for various data formats (CSV, JSON, Excel)"
    ]
  }
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const [isHovered, hoverProps] = useHoverState();
  const cardAnimation = fadeIn('up', 0.2);

  return (
    <motion.div 
      className="group rounded-xl overflow-hidden bg-dark-600 border border-dark-400 hover:border-primary-500/50 transition-colors relative"
      whileHover={{ y: -10 }}
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
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500 to-transparent" aria-hidden="true"></div>
        
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-500/90 text-white text-xs font-medium rounded-full">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
          {project.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-dark-500 text-primary-300 text-xs rounded"
              role="listitem"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-dark-500 text-primary-300 text-xs rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <motion.button 
          className="flex items-center text-primary-400 text-sm font-medium"
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          View Details <ChevronRight size={18} className="ml-1" />
        </motion.button>
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