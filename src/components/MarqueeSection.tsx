import React from 'react';
import FadeIn from './FadeIn';

const row1Images = [
  '/portfolio.webp',
  '/abusha.webp',
  '/almadina.webp',
  '/Calculator1.webp',
  '/tic-tac-toe.webp',
  '/rock-paper.webp',
  '/pfms.webp',
];

const row2Images = [
  '/Calculator1.webp',
  '/tic-tac-toe.webp',
  '/rock-paper.webp',
  '/portfolio.webp',
  '/abusha.webp',
  '/almadina.webp',
  '/pfms.webp',
];

export const MarqueeSection: React.FC = () => {
  const doubled1 = [...row1Images, ...row1Images];
  const doubled2 = [...row2Images, ...row2Images];

  return (
    <section
      className="w-full overflow-hidden py-10 sm:py-14 flex flex-col gap-3"
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      {/* Section label */}
      <FadeIn delay={0} y={0} className="flex justify-center mb-2">
        <span className="tag-yellow">My Work</span>
      </FadeIn>

      {/* Row 1: slides left (CSS marquee) */}
      <div className="w-full overflow-hidden flex">
        <div className="flex gap-3 animate-marquee-left" style={{ width: 'max-content' }}>
          {doubled1.map((url, i) => (
            <img
              key={`r1-${i}`}
              src={url}
              alt={`project ${i}`}
              loading="lazy"
              style={{ width: '380px', height: '240px', flexShrink: 0, borderRadius: '16px', border: '1px solid rgba(17,17,17,0.1)' }}
              className="object-cover select-none"
            />
          ))}
        </div>
      </div>

      {/* Row 2: slides right */}
      <div className="w-full overflow-hidden flex">
        <div className="flex gap-3 animate-marquee-right" style={{ width: 'max-content' }}>
          {doubled2.map((url, i) => (
            <img
              key={`r2-${i}`}
              src={url}
              alt={`project alt ${i}`}
              loading="lazy"
              style={{ width: '380px', height: '240px', flexShrink: 0, borderRadius: '16px', border: '1px solid rgba(17,17,17,0.1)' }}
              className="object-cover select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
