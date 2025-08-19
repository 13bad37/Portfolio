import React from 'react';

const OptimizedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
      {/* CSS-only animated background - much more performant than canvas */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.02) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Minimal animated particles using CSS only */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500/20 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-secondary-500/15 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent-500/10 rounded-full animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-primary-400/15 rounded-full animate-pulse" 
             style={{ animationDelay: '3s', animationDuration: '7s' }} />
        
        {/* Subtle moving gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              linear-gradient(45deg, 
                rgba(139, 92, 246, 0.1) 0%, 
                transparent 25%, 
                transparent 75%, 
                rgba(59, 130, 246, 0.1) 100%
              )
            `,
            animation: 'drift 20s ease-in-out infinite alternate'
          }}
        />
      </div>
      
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-10px) translateY(-5px); }
          100% { transform: translateX(10px) translateY(5px); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedBackground;