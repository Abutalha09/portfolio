import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageLoaderProps {
  onComplete: () => void;
}

/**
 * PageLoader — runs once on initial load.
 * 1. Beige overlay fills the screen (already visible)
 * 2. "ABU." text reveals character-by-character
 * 3. Overlay wipes UP and off screen, revealing the page
 * 4. onComplete() fires so hero entrance animations can start
 */
export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const chars = charsRef.current;
    if (!overlay || !chars.length) return;

    // Prevent body scroll during loader
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      },
    });

    // 1. Stagger in each character of "ABU."
    tl.fromTo(
      chars,
      { opacity: 0, y: 40, skewX: -8 },
      {
        opacity: 1,
        y: 0,
        skewX: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
      },
      0
    );

    // 2. Hold briefly
    tl.to({}, { duration: 0.35 });

    // 3. Wipe the overlay upward off screen
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const letters = 'TALHA.'.split('');

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#111111' }}
    >
      {/* Inner beige wipe (second layer) that reveals from bottom */}
      <div
        ref={textRef}
        className="flex items-center gap-[0.04em]"
        aria-label="Loading — Abutalha Portfolio"
      >
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) charsRef.current[i] = el;
            }}
            style={{
              display: 'inline-block',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(4rem, 14vw, 10rem)',
              color: char === '.' ? '#E8FF2A' : '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Thin yellow progress line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'rgba(232,255,42,0.25)' }}
      >
        <div
          className="h-full animate-loader-bar"
          style={{ background: '#E8FF2A', transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
