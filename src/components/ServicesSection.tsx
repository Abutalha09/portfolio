import React from 'react';
import { motion } from 'framer-motion';
import { MaskReveal, KineticBackWord, EditorialRow } from './KineticEditorial';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '01',
    role: 'Product Support Associate',
    company: 'Polar Bear Tech',
    period: '2026 — Present',
    description: 'Supporting flagship operational platforms, handling user interface queries, database configurations, compiling guides, and streamlining SaaS client operations.',
  },
  {
    id: '02',
    role: 'EduBuddy Platform Support',
    company: 'School Operation Suite',
    period: '2025 — 2026',
    description: 'Assisting academic client operations utilizing a SaaS suite automating registrations, fee billings, parent messaging, and gradebook databases.',
  },
  {
    id: '03',
    role: 'HotelBuddy Platform Support',
    company: 'Hospitality Control Hub',
    period: '2024 — 2025',
    description: 'Providing technical and configuration support for a comprehensive hotel engine tracking bookings, POS invoice logs, housekeeping, and room occupancy.',
  },
  {
    id: '04',
    role: 'Web Operations Intern',
    company: 'BCA Academic Portals',
    period: '2023 — 2024',
    description: 'Contributed to school management backends and portals during academic training, reinforcing database alignment and frontend operations.',
  },
  {
    id: '05',
    role: 'Technical Operations',
    company: 'SaaS Platform Optimizations',
    period: '2023',
    description: 'Ensuring operations run smoothly, debugging workflow bottlenecks, and optimizing configuration settings across multiple client platforms.',
  },
];

const platforms = [
  { label: 'EduBuddy School Operations', src: '/edubuddy-showcase.webp', alt: 'EduBuddy Portal' },
  { label: 'HotelBuddy Control Hub', src: '/hotelbuddy-showcase.webp', alt: 'HotelBuddy Portal' },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ServicesSection: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <KineticBackWord>Work</KineticBackWord>

      <div className="kx-content max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <motion.span
            className="tag-yellow"
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            02 — Experience
          </motion.span>
          <MaskReveal
            as="h2"
            className="section-heading"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', marginTop: '1rem' }}
            text={"Where I've\nWorked"}
          />
        </div>

        {/* Experience ledger — no cards, hairline-ruled editorial rows */}
        <div className="kx-list">
          {experiences.map((exp, i) => (
            <EditorialRow
              key={exp.id}
              index={exp.id}
              title={exp.role}
              meta={exp.company}
              period={exp.period}
              description={exp.description}
              delay={i * 0.05}
            />
          ))}
        </div>

        {/* Platforms — borderless image reveal */}
        <div className="kx-showcase" style={{ marginTop: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
            <span style={{ width: '28px', height: '2px', background: 'var(--accent)', flexShrink: 0 }} />
            <MaskReveal as="h3" className="kx-subhead" text="Platforms I've Supported" />
          </div>

          <div className="kx-shots">
            {platforms.map((item, idx) => (
              <div key={item.label} className="kx-shot group">
                <span className="kx-shot-eyebrow">Platform Preview</span>
                <MaskReveal as="h4" className="kx-shot-label" text={item.label} delay={idx * 0.05} />
                <div className="kx-shot-media">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <motion.div
                    className="kx-shot-cover"
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: EASE, delay: idx * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
