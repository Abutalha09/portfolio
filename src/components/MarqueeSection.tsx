import React, { useEffect, useRef } from 'react';

const row1Images = [
  '/portfolio.png',
  '/abusha.png',
  '/almadina.png',
  '/Calculator1.png',
  '/Tic tac toe.png',
  '/rock paper.png',
  '/pfms.png',
];

const row2Images = [
  '/Calculator1.png',
  '/Tic tac toe.png',
  '/rock paper.png',
  '/portfolio.png',
  '/abusha.png',
  '/almadina.png',
  '/pfms.png',
];

export const MarqueeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      
      const x1 = offset - 200;
      const x2 = -(offset - 200);

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${x1}px, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${x2}px, 0, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger on mount to calculate initial offset
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Triple the images for seamless scrolling
  const tripledRow1 = [...row1Images, ...row1Images, ...row1Images];
  const tripledRow2 = [...row2Images, ...row2Images, ...row2Images];

  return (
    <section
      ref={containerRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full flex flex-col gap-3"
    >
      {/* Row 1: moves right */}
      <div className="w-full overflow-hidden flex">
        <div
          ref={row1Ref}
          className="flex gap-3"
          style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        >
          {tripledRow1.map((url, i) => (
            <img
              key={`row1-${i}`}
              src={url}
              alt={`Work element ${i}`}
              loading="lazy"
              style={{ width: '420px', height: '270px' }}
              className="rounded-2xl object-cover shrink-0 select-none"
            />
          ))}
        </div>
      </div>

      {/* Row 2: moves left */}
      <div className="w-full overflow-hidden flex">
        <div
          ref={row2Ref}
          className="flex gap-3"
          style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
        >
          {tripledRow2.map((url, i) => (
            <img
              key={`row2-${i}`}
              src={url}
              alt={`Work element ${i}`}
              loading="lazy"
              style={{ width: '420px', height: '270px' }}
              className="rounded-2xl object-cover shrink-0 select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
