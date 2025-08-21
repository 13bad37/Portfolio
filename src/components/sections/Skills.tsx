import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Settings, Code, Puzzle } from 'lucide-react';
import { fadeIn } from '../../hooks/useAnimation';
import FloatingElements from '../animations/FloatingElements';
import AnimatedDivider from '../ui/AnimatedDivider';
import AppleButton from '../ui/AppleButton';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const skills: Record<string, Skill[]> = {
  frontend: [
    { name: 'HTML/CSS', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 80, category: 'frontend' },
    { name: 'React', level: 70, category: 'frontend' },
    { name: 'Responsive Design', level: 80, category: 'frontend' },
  ],
  backend: [
    { name: 'C#', level: 75, category: 'backend' },
    { name: 'Python', level: 70, category: 'backend' },
    { name: 'Node.js', level: 65, category: 'backend' },
    { name: 'APIs', level: 60, category: 'backend' },
  ],
  database: [
    { name: 'SQL', level: 65, category: 'database' },
    { name: 'MongoDB', level: 55, category: 'database' },
    { name: 'Database Design', level: 60, category: 'database' },
  ],
  tools: [
    { name: 'Git', level: 75, category: 'tools' },
    { name: 'VS Code', level: 85, category: 'tools' },
    { name: 'Command Line', level: 70, category: 'tools' },
    { name: 'Docker', level: 50, category: 'tools' },
  ],
  other: [
    { name: 'Problem Solving', level: 85, category: 'other' },
    { name: 'Data Structures', level: 70, category: 'other' },
    { name: 'Algorithms', level: 65, category: 'other' },
  ],
};

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills, isActive, onClick, index }) => {
  return (
    <div 
      className={`p-4 lg:p-6 rounded-xl cursor-pointer transition-all duration-300 ease-out touch-target ${
        isActive 
          ? 'bg-dark-500 border-2 border-primary-500 shadow-lg shadow-primary-500/25 transform scale-105' 
          : 'bg-dark-600 border border-dark-400 hover:border-primary-500/50 hover:transform hover:scale-102 hover:shadow-lg'
      } will-change-transform min-h-[220px] lg:min-h-[260px] flex flex-col`}
      onClick={onClick}
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'both',
        // Removed tacky shine effect, kept smooth hover transitions
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      role="tab"
      aria-selected={isActive}
      aria-controls={`skills-panel-${title.toLowerCase()}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-center mb-6">
        <div className={`p-4 rounded-lg mr-4 transition-colors duration-300 ${
          isActive ? 'bg-primary-500/20' : 'bg-dark-500'
        }`} aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      {isActive && (
        <div
          className="animate-fade-in-up apple-animate in-view"
          id={`skills-panel-${title.toLowerCase()}`}
          role="tabpanel"
          aria-labelledby={`skills-tab-${title.toLowerCase()}`}
        >
          {skills.map((skill) => (
            <div key={skill.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                <span className="text-sm font-medium text-primary-400">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-dark-400 rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                <div 
                  className="h-full bg-gradient-to-r from-primary-600 to-primary-400 animate-skill-bar transform-gpu"
                  style={{ 
                    '--skill-width': `${skill.level}%`,
                    animationDelay: '200ms',
                    willChange: 'width'
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const titleAnimation = fadeIn('up');

  return (
    <section id="skills" className="py-16 relative" role="region" aria-labelledby="skills-heading">
      <FloatingElements variant="code" density="medium" />
      <div className="absolute inset-0 bg-gradient-radial from-dark-500 to-dark-500 opacity-60" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-12 text-center"
          {...titleAnimation}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">My Expertise</span>
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold mb-4 heading-enhanced">Technical Skills</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">
            A showcase of my technical abilities and ongoing learning journey in software development.
          </p>
        </motion.div>

        {/* REDESIGNED: Single horizontal line on desktop, mobile-friendly stacking */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-16 max-w-7xl mx-auto"
          role="tablist"
          aria-label="Technical skills by category"
        >
          <SkillCard 
            icon={<Globe className="h-6 w-6 text-primary-400" />} 
            title="Frontend" 
            skills={skills.frontend}
            isActive={activeCategory === 'frontend'}
            onClick={() => setActiveCategory('frontend')}
            index={0}
          />
          
          <SkillCard 
            icon={<Server className="h-6 w-6 text-secondary-400" />} 
            title="Backend" 
            skills={skills.backend}
            isActive={activeCategory === 'backend'}
            onClick={() => setActiveCategory('backend')}
            index={1}
          />
          
          <SkillCard 
            icon={<Database className="h-6 w-6 text-accent-400" />} 
            title="Database" 
            skills={skills.database}
            isActive={activeCategory === 'database'}
            onClick={() => setActiveCategory('database')}
            index={2}
          />
          
          <SkillCard 
            icon={<Settings className="h-6 w-6 text-success-500" />} 
            title="Tools" 
            skills={skills.tools}
            isActive={activeCategory === 'tools'}
            onClick={() => setActiveCategory('tools')}
            index={3}
          />
          
          <SkillCard 
            icon={<Puzzle className="h-6 w-6 text-warning-500" />} 
            title="Other" 
            skills={skills.other}
            isActive={activeCategory === 'other'}
            onClick={() => setActiveCategory('other')}
            index={4}
          />
        </motion.div>

        <motion.div 
          className="bg-dark-600 p-8 rounded-2xl border border-dark-400 apple-animate"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          role="complementary"
          aria-labelledby="learning-heading"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-primary-500/10 p-4 rounded-xl flex-shrink-0">
              <Code className="h-8 w-8 text-primary-400" aria-hidden="true" />
            </div>
            
            <div>
              <h3 id="learning-heading" className="text-xl font-bold mb-2">Continuous Learning</h3>
              <p className="text-gray-300 mb-4">
                The tech landscape is constantly evolving, and so am I. My learning journey is ongoing with these areas of focus:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center justify-items-center" role="list" aria-label="Technologies currently learning">
                {['React Native', 'TypeScript', 'Cloud Computing', 'Machine Learning'].map((item) => (
                  <AppleButton
                    key={item}
                    variant="ghost"
                    size="sm"
                    className="text-center text-sm"
                  >
                    {item}
                  </AppleButton>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <AnimatedDivider type="tech" />
    </section>
  );
};

export default Skills;
