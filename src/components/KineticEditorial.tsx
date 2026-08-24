import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';

/* Expo-out easing — snappy start, long graceful settle. Shared across the system. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Stable motion tags, so we never create a component during render. */
const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

/* ────────────────────────────────────────────────────────────
   MaskReveal
   Splits text into words, each clipped inside an overflow-hidden
   mask, then slides up from behind the mask with a staggered,
   slightly-rotated entrance. Use "\n" in the text to force lines.
   ──────────────────────────────────────────────────────────── */
type RevealTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

interface MaskRevealProps {
  text: string;
  as?: RevealTag;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

export const MaskReveal: React.FC<MaskRevealProps> = ({
  text,
  as = 'div',
  className = '',
  style,
  delay = 0,
  stagger = 0.055,
  duration = 0.85,
  amount = 0.35,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;
  const lines = text.split('\n');

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { y: '118%', rotate: 3, opacity: 0 },
        visible: {
          y: '0%',
          rotate: 0,
          opacity: 1,
          transition: { duration, ease: EASE },
        },
      };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <React.Fragment key={li}>
            {words.map((w, wi) => (
              <React.Fragment key={wi}>
                <span className="kx-mask" aria-hidden="true">
                  <motion.span className="kx-word" variants={word}>
                    {w}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
            {li < lines.length - 1 ? <br aria-hidden="true" /> : null}
          </React.Fragment>
        );
      })}
    </MotionTag>
  );
};

/* ────────────────────────────────────────────────────────────
   CountUp — rolls a number up to `to` when scrolled into view.
   Starts a few steps back so a year reads as a quick roll,
   not a count from zero.
   ──────────────────────────────────────────────────────────── */
interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from,
  duration = 1.3,
  className = '',
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const start = from ?? Math.max(0, to - 8);
  const [val, setVal] = useState(reduce ? to : start);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      const eased = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.round(start + (to - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, start, duration]);

  return (
    <span ref={ref} className={className}>
      {val}
    </span>
  );
};

/* PeriodCountUp — rolls the leading year of a period string
   ("2026 — Present", "2023 — 2026") and keeps the remainder static. */
export const PeriodCountUp: React.FC<{ period: string; className?: string }> = ({
  period,
  className = '',
}) => {
  const match = period.match(/^(\d{4})(.*)$/);
  if (!match) return <span className={className}>{period}</span>;
  return (
    <span className={className}>
      <CountUp to={parseInt(match[1], 10)} />
      {match[2]}
    </span>
  );
};

/* ────────────────────────────────────────────────────────────
   KineticBackWord — oversized ghost word that drifts against the
   scroll direction behind the content. Ambient depth, kept faint.
   ──────────────────────────────────────────────────────────── */
export const KineticBackWord: React.FC<{ children: string; className?: string }> = ({
  children,
  className = '',
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['16%', '-16%']);

  return (
    <div ref={ref} className={`kx-backword-track ${className}`} aria-hidden="true">
      <motion.div className="kx-backword" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   EditorialRow — one entry in the ledger. No card, no box: a
   hairline rule with an accent sweep, an outlined index numeral,
   a mask-revealing title, meta, description and inline tags.
   Cursor drives a spotlight; hover shifts the row and fills the
   numeral. Shared by both Education and Experience.
   ──────────────────────────────────────────────────────────── */
interface EditorialRowProps {
  index: string;
  title: string;
  meta: string;
  period: string;
  description: string;
  tags?: string[];
  delay?: number;
  highlight?: boolean;
  href?: string;
}

export const EditorialRow: React.FC<EditorialRowProps> = ({
  index,
  title,
  meta,
  period,
  description,
  tags,
  delay = 0,
  highlight = false,
  href,
}) => {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const isCurrent = highlight || /present/i.test(period);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = rowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={rowRef}
      className={`kx-row group ${isCurrent ? 'kx-row--current' : ''}`}
      onMouseMove={handleMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="kx-glow" aria-hidden="true" />

      <div className="kx-rule">
        <motion.span
          className="kx-rule-accent"
          initial={{ scaleX: 0, opacity: 0.9 }}
          whileInView={{ scaleX: 1, opacity: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  scaleX: { duration: 0.7, ease: EASE, delay },
                  opacity: { delay: delay + 0.55, duration: 0.5 },
                }
          }
        />
      </div>

      <div className="kx-row-inner">
        <div className="kx-index" aria-hidden="true">
          {index}
        </div>

        <div className="kx-main">
          {href ? (
            <a
              className="kx-title-wrap"
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={`Open ${title}`}
            >
              <MaskReveal as="h3" className="kx-title" text={title} delay={delay + 0.05} />
              <span className="kx-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            <div className="kx-title-wrap">
              <MaskReveal as="h3" className="kx-title" text={title} delay={delay + 0.05} />
              <span className="kx-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          )}

          <div className="kx-meta">
            <span className="kx-company">{meta}</span>
            {isCurrent && (
              <span className="kx-now">
                <span className="kx-now-dot" />
                Now
              </span>
            )}
          </div>

          <p className="kx-desc">{description}</p>

          {tags && tags.length > 0 && (
            <div className="kx-tags">
              {tags.map((t) => (
                <span key={t} className="kx-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="kx-period">
          <PeriodCountUp period={period} />
        </div>
      </div>
    </motion.div>
  );
};
