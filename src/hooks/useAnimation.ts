import { useInView } from 'react-intersection-observer';
import { useAnimation, Variant } from 'framer-motion';
import { useEffect } from 'react';

interface AnimationConfig {
  hidden: Variant;
  visible: Variant;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export const useAnimationOnScroll = ({
  hidden,
  visible,
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
}: AnimationConfig) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start({
        ...visible,
        transition: { delay, duration: 0.5, ease: 'easeOut' },
      });
    } else {
      controls.start(hidden);
    }
  }, [controls, inView, visible, hidden, delay]);

  return { ref, controls, inView };
};

export const useFadeIn = (direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up', delay = 0) => {
  return useAnimationOnScroll({
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
    },
    delay,
  });
};

export const fadeIn = useFadeIn;

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const useScaleIn = (delay = 0) => {
  return useAnimationOnScroll({
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    delay,
  });
};

export const useRotateIn = (delay = 0) => {
  return useAnimationOnScroll({
    hidden: { rotate: -10, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
    delay,
  });
};

export const scaleIn = useScaleIn;
export const rotateIn = useRotateIn;