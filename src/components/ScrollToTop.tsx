import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      const scrolled = window.scrollY;
      const threshold = 300;
      setIsVisible(scrolled > threshold);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress(scrolled / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0F0F0F] border border-white/10 text-[#D7E2EA] flex items-center justify-center cursor-pointer shadow-2xl z-40 focus:outline-none hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
          style={{ padding: 0 }}
        >
          {/* Scroll progress ring SVG */}
          <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 50 50">
            <circle
              className="text-white/5"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
            />
            <circle
              className="text-cyan-400 transition-all duration-75"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
            />
          </svg>

          {/* Up arrow icon */}
          <span className="relative z-10 text-lg font-bold">&uarr;</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
