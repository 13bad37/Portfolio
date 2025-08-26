import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let rafId: number | null = null;

    const updateMousePosition = (ev: MouseEvent) => {
      if (rafId) return; // Already scheduled
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return mousePosition;
};

export const useMouseTrail = (
  count: number = 5,
  delay: number = 50
): MousePosition[] => {
  const mousePosition = useMousePosition();
  const [trail, setTrail] = useState<MousePosition[]>(
    Array(count).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrail((prevTrail) => [
        mousePosition,
        ...prevTrail.slice(0, count - 1),
      ]);
    }, delay);

    return () => clearTimeout(timer);
  }, [mousePosition, count, delay]);

  return trail;
};

export const useHoverState = (): [
  boolean,
  { onMouseEnter: () => void; onMouseLeave: () => void }
] => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return [isHovered, hoverProps];
};