import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0 select-none">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndexOffset = 0;

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`} style={style}>
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        const renderedWord = (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
            {chars.map((char, charIdx) => {
              const globalIndex = charIndexOffset + charIdx;
              const start = globalIndex / totalChars;
              const end = (globalIndex + 1) / totalChars;
              return (
                <Character
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
        // Update character offset: length of word + 1 space
        charIndexOffset += chars.length + 1;
        return renderedWord;
      })}
    </p>
  );
};

export default AnimatedText;
