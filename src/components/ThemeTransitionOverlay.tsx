import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeTransitionOverlay: React.FC = () => {
  const { theme, currentThemeConfig } = useTheme();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [theme]);

  if (!animating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Expanding Ripple Ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping opacity-25"
        style={{
          width: '120vw',
          height: '120vw',
          maxWidth: '2400px',
          maxHeight: '2400px',
          background: `radial-gradient(circle, ${currentThemeConfig.accentPreview} 0%, transparent 70%)`,
          animationDuration: '0.65s',
        }}
      />
      {/* Flash overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-tr from-black/20 via-transparent to-black/20 animate-pulse"
      />
    </div>
  );
};

export default ThemeTransitionOverlay;
