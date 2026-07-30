import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const isNearScrollbar = e.clientX >= window.innerWidth - 16;
      if (isNearScrollbar) {
        setIsVisible(false);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer spring ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 52 : 30,
          height: hovered ? 52 : 30,
          borderColor: hovered ? '#E8FF2A' : 'rgba(17,17,17,0.35)',
          backgroundColor: hovered ? 'rgba(232,255,42,0.1)' : 'transparent',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
        className="fixed rounded-full border-2 pointer-events-none"
      />
      {/* Inner dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? '#E8FF2A' : '#111111',
        }}
        className="fixed w-2 h-2 rounded-full pointer-events-none"
      />
    </div>
  );
};

export default CustomCursor;
