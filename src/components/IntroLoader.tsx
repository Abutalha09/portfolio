import React, { useMemo } from 'react';
import rawSvg from '../assets/scratch_sig.svg?raw';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const preparedSvg = useMemo(() => {
    return rawSvg.replace(/<path /g, '<path pathLength="1" ');
  }, []);

  return (
    <div
      className="intro-loader"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === 'intro-lift') {
          onComplete?.();
        }
      }}
    >
      <div
        className="intro-sig"
        dangerouslySetInnerHTML={{ __html: preparedSvg }}
      />
    </div>
  );
};

export default IntroLoader;
