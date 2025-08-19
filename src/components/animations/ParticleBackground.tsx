import React, { useRef, useEffect, useState } from 'react';
import { useThrottledScroll } from '../../hooks/useThrottledScroll';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  opacity: number;
  life: number;
  maxLife: number;
  angle: number;
}

interface FloatingShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  shape: 'triangle' | 'square' | 'hexagon' | 'circle';
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useThrottledScroll(16);
  const particlesArrayRef = useRef<Particle[]>([]);
  const shapesArrayRef = useRef<FloatingShape[]>([]);
  const animationIdRef = useRef<number>();
  const [maxParticles, setMaxParticles] = useState(window.innerWidth < 768 ? 20 : 40);
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    // Performance event listeners
    const handleReduceParticles = () => {
      setMaxParticles(window.innerWidth < 768 ? 10 : 20);
      setPerformanceMode(true);
    };

    const handleRestoreQuality = () => {
      setMaxParticles(window.innerWidth < 768 ? 20 : 40);
      setPerformanceMode(false);
    };

    window.addEventListener('performance:reduce-particles', handleReduceParticles);
    window.addEventListener('performance:restore-quality', handleRestoreQuality);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastAddTime = 0;
    const framesPerParticle = 3;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create enhanced particles with trails
    const createParticle = (x: number, y: number, isMouseParticle = false) => {
      const now = performance.now();
      if (now - lastAddTime < framesPerParticle && !isMouseParticle) return;
      lastAddTime = now;

      const size = Math.random() * 5 + 2;
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = (Math.random() - 0.5) * 2;
      const hue = Math.random() * 80 + 200; // Blue to purple to pink range
      const opacity = Math.random() * 0.6 + 0.2;
      const maxLife = 120 + Math.random() * 60;

      particlesArrayRef.current.push({
        x,
        y,
        size,
        speedX: speedX + (scrollY * 0.0005),
        speedY: speedY + (scrollY * 0.0005),
        hue,
        opacity,
        life: maxLife,
        maxLife,
        angle: Math.random() * Math.PI * 2
      });

      if (particlesArrayRef.current.length > maxParticles) {
        particlesArrayRef.current.splice(0, 15);
      }
    };

    // Create floating geometric shapes
    const createFloatingShape = () => {
      const shapes: FloatingShape['shape'][] = ['triangle', 'square', 'hexagon', 'circle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      shapesArrayRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        shape,
        opacity: Math.random() * 0.1 + 0.05
      });

      if (shapesArrayRef.current.length > 8) {
        shapesArrayRef.current.splice(0, 1);
      }
    };

    // Draw geometric shapes
    const drawShape = (ctx: CanvasRenderingContext2D, shape: FloatingShape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.globalAlpha = shape.opacity;
      
      const gradient = ctx.createLinearGradient(-shape.size/2, -shape.size/2, shape.size/2, shape.size/2);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      switch (shape.shape) {
        case 'triangle':
          ctx.moveTo(0, -shape.size/2);
          ctx.lineTo(-shape.size/2, shape.size/2);
          ctx.lineTo(shape.size/2, shape.size/2);
          ctx.closePath();
          break;
        case 'square':
          ctx.rect(-shape.size/2, -shape.size/2, shape.size, shape.size);
          break;
        case 'hexagon':
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * shape.size/2;
            const y = Math.sin(angle) * shape.size/2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          break;
        case 'circle':
          ctx.arc(0, 0, shape.size/2, 0, Math.PI * 2);
          break;
      }
      
      ctx.stroke();
      ctx.restore();
    };

    // Simplified particle drawing for better performance
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw simplified floating shapes
      shapesArrayRef.current.forEach((shape) => {
        drawShape(ctx, shape);
        
        // Update shape
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;
        
        // Boundary wrapping
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
      });

      // Draw particles with minimal effects
      particlesArrayRef.current.forEach((particle, index) => {
        // Simple particle rendering
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Simplified connection lines (no mouse interaction)
        for (let j = index + 1; j < particlesArrayRef.current.length; j++) {
          const other = particlesArrayRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const connectionOpacity = (1 - distance / 80) * 0.1 * Math.min(particle.opacity, other.opacity);
            ctx.strokeStyle = `hsla(${particle.hue}, 60%, 50%, ${connectionOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Update particle with simple motion
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Simple boundary behavior
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Life management
        particle.life--;
        particle.opacity = (particle.life / particle.maxLife) * 0.6;
        
        if (particle.life <= 0) {
          particlesArrayRef.current.splice(index, 1);
        }
      });
    };

    // Animation loop
    const animate = () => {
      drawParticles();
      
      // Randomly create floating shapes (reduced in performance mode)
      const shapeThreshold = performanceMode ? 0.998 : 0.996;
      if (Math.random() > shapeThreshold) {
        createFloatingShape();
      }
      
      // Create ambient particles (reduced in performance mode)
      const particleThreshold = performanceMode ? 0.98 : 0.95;
      if (Math.random() > particleThreshold) {
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }
      
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    // Removed heavy mouse interaction for better performance

    // Initial setup - reduced particle count
    for (let i = 0; i < 15; i++) {
      createParticle(Math.random() * canvas.width, Math.random() * canvas.height);
    }
    
    for (let i = 0; i < 3; i++) {
      createFloatingShape();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('performance:reduce-particles', handleReduceParticles);
      window.removeEventListener('performance:restore-quality', handleRestoreQuality);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [scrollY, maxParticles, performanceMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60"
      style={{ 
        zIndex: 0,
        mixBlendMode: 'screen',
        filter: 'blur(0.5px)'
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default ParticleBackground;