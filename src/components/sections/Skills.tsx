import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Settings, Code, Puzzle } from 'lucide-react';
import { fadeIn, staggerChildren, staggerItem } from '../../hooks/useAnimation';

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
  const cardAnimation = fadeIn('up', 0.2 + index * 0.1);

  return (
    <motion.div 
      className={`p-6 rounded-xl cursor-pointer transition-all ${
        isActive 
          ? 'bg-dark-500 border-2 border-primary-500 shadow-glow' 
          : 'bg-dark-600 border border-dark-400 hover:border-primary-500/50'
      }`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      {...cardAnimation}
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
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg mr-4 ${isActive ? 'bg-primary-500/20' : 'bg-dark-500'}`} aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
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
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const titleAnimation = fadeIn('up');
  const containerAnimation = fadeIn('none', 0.3);

  return (
    <section id="skills" className="py-20 relative" role="region" aria-labelledby="skills-heading">
      <div className="absolute inset-0 bg-gradient-radial from-dark-500 to-dark-500 opacity-60" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16 text-center"
          {...titleAnimation}
        >
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">My Expertise</span>
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
          <p className="max-w-2xl text-gray-300">
            A showcase of my technical abilities and ongoing learning journey in software development.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          {...containerAnimation}
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
          className="bg-dark-600 p-8 rounded-2xl border border-dark-400"
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
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" role="list" aria-label="Technologies currently learning">
                {['React Native', 'TypeScript', 'Cloud Computing', 'Machine Learning'].map((item, index) => (
                  <motion.div 
                    key={item}
                    className="px-4 py-2 bg-dark-500 rounded-lg border border-dark-400 text-center text-sm font-medium"
                    variants={staggerItem}
                    custom={index}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      borderColor: 'rgba(139, 92, 246, 0.5)'
                    }}
                    role="listitem"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;