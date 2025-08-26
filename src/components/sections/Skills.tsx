import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, Database, Settings, Code, Puzzle } from 'lucide-react';
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
    <motion.div 
      className={`p-5 lg:p-6 rounded-2xl cursor-pointer transition-all duration-300 ease-out touch-target ${
        isActive 
          ? 'bg-dark-500/90 border-2 border-primary-500 shadow-xl shadow-primary-500/30 transform-gpu' 
          : 'bg-dark-600/80 backdrop-blur-sm border border-dark-400/50 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10'
      } will-change-transform min-h-[280px] lg:min-h-[320px] flex flex-col relative overflow-hidden`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        damping: 25,
        stiffness: 400
      }}
      whileHover={!isActive ? {
        y: -5,
        scale: 1.02,
        boxShadow: "0 15px 35px -5px rgba(139, 92, 246, 0.2)",
        transition: { type: "spring", damping: 20, stiffness: 400 }
      } : {}}
      whileTap={{
        y: -2,
        scale: 0.98,
        transition: { type: "spring", damping: 30, stiffness: 500 }
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
      {/* Background glow effect */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-center mb-6 relative z-10">
        <motion.div 
          className={`w-12 h-12 rounded-xl mr-4 transition-all duration-300 flex items-center justify-center ${
            isActive ? 'bg-primary-500/20 shadow-lg' : 'bg-dark-500/70'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
          aria-hidden="true"
        >
          {icon}
        </motion.div>
        <h3 className={`text-xl font-semibold transition-colors duration-300 ${
          isActive ? 'text-primary-400' : 'text-white'
        }`}>{title}</h3>
      </div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="flex-1 relative z-10"
            id={`skills-panel-${title.toLowerCase()}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${title.toLowerCase()}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 400,
              mass: 0.8
            }}
          >
            <div className="space-y-4">
              {skills.map((skill, skillIndex) => (
                <motion.div 
                  key={skill.name} 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: skillIndex * 0.1,
                    type: "spring",
                    damping: 25,
                    stiffness: 400
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                    <motion.span 
                      className="text-sm font-semibold text-primary-400 tabular-nums"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: skillIndex * 0.1 + 0.2 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="relative w-full h-2 bg-dark-400 rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        delay: skillIndex * 0.1 + 0.3,
                        duration: 0.8,
                        type: "spring",
                        damping: 25,
                        stiffness: 200
                      }}
                    />
                    {/* Subtle shine effect */}
                    <motion.div
                      className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                      initial={{ x: -32 }}
                      animate={{ x: `calc(${skill.level}% + 32px)` }}
                      transition={{ 
                        delay: skillIndex * 0.1 + 0.8,
                        duration: 0.6,
                        type: "spring",
                        damping: 20,
                        stiffness: 300
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inactive state preview */}
      {!isActive && (
        <div className="flex-1 flex items-center justify-center opacity-60">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
          >
            <p className="text-sm text-gray-400 mb-2">Click to explore</p>
            <div className="w-8 h-8 mx-auto bg-primary-500/20 rounded-full flex items-center justify-center">
              <motion.div
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const Skills: React.FC = memo(() => {
  const [activeSkill, setActiveSkill] = useState<string>('frontend');

  const skillCategories = [
    {
      key: 'frontend',
      title: 'Frontend',
      icon: <Code className="w-6 h-6 text-primary-400" />,
      skills: skills.frontend
    },
    {
      key: 'backend',
      title: 'Backend',
      icon: <Server className="w-6 h-6 text-primary-400" />,
      skills: skills.backend
    },
    {
      key: 'database',
      title: 'Database',
      icon: <Database className="w-6 h-6 text-primary-400" />,
      skills: skills.database
    },
    {
      key: 'tools',
      title: 'Tools',
      icon: <Settings className="w-6 h-6 text-primary-400" />,
      skills: skills.tools
    },
    {
      key: 'other',
      title: 'Problem Solving',
      icon: <Puzzle className="w-6 h-6 text-primary-400" />,
      skills: skills.other
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative content-auto">
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 25, stiffness: 400 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-sm font-semibold tracking-wider text-primary-500 mb-3 uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", damping: 25, stiffness: 400 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", damping: 25, stiffness: 400 }}
            viewport={{ once: true }}
          >
            A comprehensive overview of my technical abilities and proficiency levels across different domains of software development.
          </motion.p>
        </motion.div>

        <AnimatedDivider />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          role="tablist"
          aria-label="Skills categories"
        >
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.key}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              isActive={activeSkill === category.key}
              onClick={() => setActiveSkill(category.key)}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring", damping: 25, stiffness: 400 }}
          viewport={{ once: true }}
        >
          <AppleButton
            href="#projects"
            variant="primary"
            size="lg"
            icon={<Globe className="w-5 h-5" />}
          >
            View My Projects
          </AppleButton>
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
