import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isHoveringForm, setIsHoveringForm] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);

  /* ─── Spring Physics for Image Follow Cursor ─── */
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Smooth spring physics matching Mysta Awwwards style
  const springConfig = { stiffness: 170, damping: 22, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilt rotation based on cursor movement
  const rotateX = useTransform(smoothY, [-100, 900], [10, -10]);
  const rotateY = useTransform(smoothX, [-100, 1200], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Offset so photo centers on cursor
    mouseX.set(e.clientX - rect.left - 130);
    mouseY.set(e.clientY - rect.top - 180);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:mabutalha0923@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringForm(true)}
      onMouseLeave={() => {
        setIsHoveringForm(false);
        setActiveField(null);
      }}
      className="w-full min-h-screen px-6 sm:px-12 md:px-20 pt-28 pb-20 relative overflow-hidden text-[#111111] select-none flex flex-col justify-between"
      style={{ background: '#CAC5BA' }}
    >
      {/* ─── FLOATING IMAGE FOLLOWING CURSOR (Mysta Awwwards Style) ─── */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          rotateX,
          rotateY,
          perspective: 1000,
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: isHoveringForm ? 1 : 0,
          scale: isHoveringForm ? (activeField ? 1.06 : 1) : 0.7,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.25 } }}
      >
        <div
          className="relative w-[230px] h-[310px] rounded-2xl overflow-hidden shadow-2xl border border-[#111111]/20"
          style={{
            boxShadow: '0 30px 60px rgba(0,0,0,0.25), 0 0 30px rgba(232,255,42,0.3)',
            background: '#111111',
          }}
        >
          {/* Abutalha's Photo */}
          <img
            src="/contact-follow-pic.jpg"
            alt="Mohammad Abutalha"
            className="w-full h-full object-cover object-top filter contrast-[1.05]"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Top Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span
              className="text-[0.62rem] font-black uppercase px-2.5 py-1 rounded shadow-md tracking-wider"
              style={{ background: '#E8FF2A', color: '#111', fontFamily: "'Inter'" }}
            >
              TALHA®
            </span>
            <span className="text-[0.58rem] font-bold text-white/90 bg-black/70 backdrop-blur px-2.5 py-1 rounded border border-white/10">
              {activeField || 'SAY HELLO 👋'}
            </span>
          </div>

          {/* Floating Bottom Details */}
          <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
            <div className="text-xs font-black text-white leading-tight" style={{ fontFamily: "'Inter'" }}>
              Mohammad Abutalha
            </div>
            <div className="text-[0.58rem] font-bold text-[#E8FF2A] tracking-wider uppercase pt-0.5">
              Product Support &amp; Web Dev
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Background Faint Giant Text ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <span
          style={{
            fontSize: 'clamp(100px, 22vw, 280px)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            color: '#111111',
            opacity: 0.04,
            letterSpacing: '-0.06em',
            whiteSpace: 'nowrap',
          }}
        >
          CONTACT
        </span>
      </div>

      {/* ─── Top Heading Strip ─── */}
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <FadeIn delay={0} y={20} className="flex justify-between items-center mb-12 sm:mb-16">
          <span className="tag-yellow">06 — Contact</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#444444]">
            Kanpur, India 🇮🇳
          </span>
        </FadeIn>

        {/* Mysta Style Giant Editorial Heading */}
        <FadeIn delay={0.1} y={40} className="mb-16 sm:mb-20">
          <h2
            className="font-black leading-[0.88] tracking-tight uppercase"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8.5rem)',
              fontFamily: "'Inter', sans-serif",
              color: '#111111',
            }}
          >
            Let's build<br />
            <span style={{ color: '#111111', textDecoration: 'underline', textDecorationColor: '#E8FF2A' }}>something</span><br />
            great.
          </h2>
        </FadeIn>

        {/* ─── MYSTA 1:1 MINIMALIST CONTACT FORM ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column (5 cols) — Socials & Info */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <FadeIn delay={0.2} y={25}>
              <div className="flex flex-col gap-8">
                {/* Email */}
                <div
                  onMouseEnter={() => setActiveField('COPY EMAIL 📩')}
                  onMouseLeave={() => setActiveField(null)}
                >
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#555555] block mb-2">
                    01 / Direct Email
                  </span>
                  <a
                    href="mailto:mabutalha0923@gmail.com"
                    className="text-lg sm:text-xl font-bold text-[#111111] hover:text-[#000000] underline decoration-[#E8FF2A] decoration-2 transition-colors duration-200 block truncate"
                    style={{ fontFamily: "'Inter'" }}
                  >
                    mabutalha0923@gmail.com
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#555555] block mb-3">
                    02 / Connect Online
                  </span>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: 'GitHub', handle: '@Abutalha09', href: 'https://github.com/Abutalha09' },
                      { name: 'Instagram', handle: '@abutalha0923', href: 'https://www.instagram.com/abutalha0923/' },
                      { name: 'LinkedIn', handle: 'Mohammad Abutalha', href: 'https://www.linkedin.com/in/mohammad-abutalha-932771363/' },
                    ].map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setActiveField(`OPEN ${s.name.toUpperCase()} ↗`)}
                        onMouseLeave={() => setActiveField(null)}
                        className="group flex items-center justify-between py-2.5 border-b border-[#111111]/20 hover:border-[#111111] transition-colors duration-200"
                      >
                        <span className="text-sm font-bold text-[#111111] group-hover:text-[#000000] transition-colors">
                          {s.name}
                        </span>
                        <span className="text-xs text-[#555555] group-hover:text-[#111111] transition-colors font-mono">
                          {s.handle} ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Resume Download */}
                <a
                  href="/Abutalha_Final_Resume (1).pdf"
                  download
                  id="contact-resume-download-btn"
                  onMouseEnter={() => setActiveField('DOWNLOAD RESUME 📄')}
                  onMouseLeave={() => setActiveField(null)}
                  className="btn-yellow justify-center text-xs py-3.5 mt-2"
                >
                  Download Resume ↓
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column (8 cols) — Mysta Style Horizontal Line Form */}
          <div className="lg:col-span-8">
            <FadeIn delay={0.25} y={30}>
              {submitted ? (
                <div className="py-16 flex flex-col items-center justify-center text-center gap-4 border-b border-[#111111]/20">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: '#E8FF2A', color: '#111' }}>
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-[#111111] uppercase" style={{ fontFamily: "'Inter'" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[#444444] max-w-sm">
                    Your mail client has been opened. Thank you for reaching out!
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-yellow mt-4 text-xs">
                    Send Another Message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                  {/* Field 1: Name */}
                  <div
                    className="relative group border-b border-[#111111]/25 focus-within:border-[#111111] transition-colors duration-300 pb-4"
                    onMouseEnter={() => setActiveField('TYPE YOUR NAME ✍️')}
                    onMouseLeave={() => setActiveField(null)}
                  >
                    <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#555555] block mb-2">
                      01 / What's your name?
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent text-2xl sm:text-4xl font-bold text-[#111111] placeholder-[#111111]/30 outline-none border-none py-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  {/* Field 2: Email */}
                  <div
                    className="relative group border-b border-[#111111]/25 focus-within:border-[#111111] transition-colors duration-300 pb-4"
                    onMouseEnter={() => setActiveField('TYPE YOUR EMAIL 📧')}
                    onMouseLeave={() => setActiveField(null)}
                  >
                    <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#555555] block mb-2">
                      02 / What's your email?
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email"
                      className="w-full bg-transparent text-2xl sm:text-4xl font-bold text-[#111111] placeholder-[#111111]/30 outline-none border-none py-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  {/* Field 3: Message */}
                  <div
                    className="relative group border-b border-[#111111]/25 focus-within:border-[#111111] transition-colors duration-300 pb-4"
                    onMouseEnter={() => setActiveField('WRITE YOUR MESSAGE 💬')}
                    onMouseLeave={() => setActiveField(null)}
                  >
                    <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#555555] block mb-2">
                      03 / Reason for contact / Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full bg-transparent text-xl sm:text-3xl font-bold text-[#111111] placeholder-[#111111]/30 outline-none border-none py-1 resize-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      onMouseEnter={() => setActiveField('SUBMIT MESSAGE 🚀')}
                      onMouseLeave={() => setActiveField(null)}
                      className="btn-yellow px-10 py-4 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                      Send Message →
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>

        {/* ─── Mysta Style Bottom Footer Bar ─── */}
        <FadeIn delay={0.4} y={20} className="mt-24 pt-8 border-t border-[#111111]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-black text-2xl tracking-tight text-[#111111]" style={{ fontFamily: "'Inter'" }}>
              Talha.
            </span>
            <span className="text-xs text-[#555555] font-mono">
              © {new Date().getFullYear()} Mohammad Abutalha
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs text-[#555555] font-mono hidden sm:inline">
              Kanpur, India 🇮🇳
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-bold uppercase tracking-widest text-[#111111] hover:underline cursor-pointer border-none bg-transparent"
            >
              Back to Top ↑
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
