import React, { useRef, useEffect } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const particlesArrayRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastAddTime = 0;
    const framesPerParticle = 5; // Add a particle every 5 frames

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create particles
    const createParticle = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastAddTime < framesPerParticle) return;
      lastAddTime = now;

      const size = Math.random() * 5 + 1;
      const speedX = Math.random() * 2 - 1;
      const speedY = Math.random() * 2 - 1;
      const hue = Math.random() * 60 + 220; // Blue to purple range
      const opacity = Math.random() * 0.5 + 0.1;

      particlesArrayRef.current.push({
        x,
        y,
        size,
        speedX,
        speedY,
        hue,
        opacity,
      });

      // Limit the number of particles
      if (particlesArrayRef.current.length > 100) {
        particlesArrayRef.current.splice(0, 20);
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArrayRef.current.forEach((particle, index) => {
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles with lines
        for (let j = index; j < particlesArrayRef.current.length; j++) {
          const dx = particle.x - particlesArrayRef.current[j].x;
          const dy = particle.y - particlesArrayRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${particle.hue}, 100%, 50%, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particlesArrayRef.current[j].x, particlesArrayRef.current[j].y);
            ctx.stroke();
          }
        }

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Slowly fade out
        particle.opacity -= 0.002;
        if (particle.opacity <= 0) {
          particlesArrayRef.current.splice(index, 1);
        }
      });
    };

    // Animation loop
    const animate = () => {
      drawParticles();
      createParticle(mousePosition.x, mousePosition.y);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);

    // Handle mouse movement
    const mouseMoveHandler = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        createParticle(e.x, e.y);
      }
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);

    // Initial particles
    for (let i = 0; i < 50; i++) {
      createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: 0 }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default ParticleBackground;