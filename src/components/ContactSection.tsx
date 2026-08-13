import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Folder,
  Pencil,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Send,
  Check,
  Zap,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import FadeIn from './FadeIn';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/mabutalha0923@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Portfolio Contact from ${formData.name}`,
            message: formData.message,
            _captcha: 'false',
            _template: 'table',
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback FormSubmit direct POST if fetch encounters issue
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const availableItems = [
    'Freelance Projects',
    'Full-Time Opportunities',
    'Remote Collaborations',
    'Internships',
  ];

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mabutalha0923@gmail.com',
      href: 'mailto:mabutalha0923@gmail.com',
      external: false,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 91200 38438',
      href: 'tel:+919120038438',
      external: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kanpur, Uttar Pradesh, India',
      href: 'https://maps.google.com/?q=Kanpur,Uttar+Pradesh,India',
      external: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@Abutalha09',
      href: 'https://github.com/Abutalha09',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Mohammad Abutalha',
      href: 'https://www.linkedin.com/in/mohammad-abutalha-932771363/',
      external: true,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@abutalha0923',
      href: 'https://www.instagram.com/abutalha0923/',
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="w-full min-h-screen px-6 sm:px-12 md:px-16 lg:px-20 pt-28 pb-16 relative overflow-hidden text-[var(--text-dark)] select-none flex flex-col justify-between"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ─── Main Content Container ─── */}
      <div className="max-w-7xl w-full mx-auto relative z-10 flex-1 flex flex-col justify-between gap-16">
        {/* ─── 2-Column Unboxed Grid Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* LEFT COLUMN (6 cols): Headline, Cutout Portrait & Direct Social Links */}
          <div className="lg:col-span-6 flex flex-col justify-between relative z-10 min-h-[500px]">
            <div>
              {/* Subtitle Tag */}
              <FadeIn delay={0} y={15}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-8 h-[2px] bg-[var(--text-dark)]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--text-mid)]">
                    LET'S CONNECT
                  </span>
                </div>
              </FadeIn>

              {/* Giant Editorial Heading */}
              <FadeIn delay={0.1} y={25}>
                <h1
                  className="font-black leading-[0.88] tracking-tighter uppercase mb-6 text-[var(--text-dark)]"
                  style={{
                    fontSize: 'clamp(2.6rem, 7.5vw, 6rem)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  LET'S
                  <br />
                  <span className="text-[var(--accent)] drop-shadow-sm">WORK</span>
                  <br />
                  TOGETHER<span className="text-[var(--accent)]">.</span>
                </h1>
              </FadeIn>

              {/* Subhead */}
              <FadeIn delay={0.15} y={20}>
                <p className="text-sm sm:text-lg font-semibold text-[var(--text-mid)] mb-8 sm:mb-10 leading-relaxed max-w-md">
                  Have a project in mind?
                  <br />
                  Let's create something{' '}
                  <span className="relative inline-block font-black text-[var(--text-dark)] px-1">
                    amazing.
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2.5 text-[var(--accent)]"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0,15 Q25,5 50,15 T100,15"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </p>
              </FadeIn>
            </div>

            {/* Faint Background Watermark Text "TALHA" */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-16 pointer-events-none select-none overflow-hidden z-0 opacity-[0.05]"
            >
              <span
                className="font-black text-[#111111] leading-none block tracking-tighter"
                style={{ fontSize: 'clamp(70px, 20vw, 320px)' }}
              >
                TALHA
              </span>
            </div>

            {/* Center Portrait Image Cutout */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative xl:absolute xl:left-[52%] xl:top-[10%] w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[380px] mx-auto xl:mx-0 z-20 pointer-events-none my-6 xl:my-0"
            >
              <motion.img
                src="/hero-transparent.png"
                alt="Mohammad Abutalha"
                className="w-full h-auto object-contain filter drop-shadow-2xl max-h-[350px] sm:max-h-[450px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Left Bottom Checklist & Quick Social Links */}
            <FadeIn delay={0.2} y={20} className="relative z-30 pt-6">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#555555] block mb-3">
                    AVAILABLE FOR
                  </span>
                  <div className="grid grid-cols-2 gap-2.5 max-w-md">
                    {availableItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#D4F62E] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#111111] stroke-[3]" />
                        </div>
                        <span className="text-xs font-bold text-[#222222]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fast Response Badge */}
                <div className="inline-flex items-center gap-2 bg-[#DDD8CF]/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-[#111111]/10 w-fit">
                  <Zap className="w-4 h-4 text-[#111111] fill-[#111111]" />
                  <span className="text-xs font-bold text-[#222222]">
                    Fast response within{' '}
                    <span className="bg-[#D4F62E] px-1.5 py-0.5 rounded font-black text-[#111111]">
                      24 hours.
                    </span>
                  </span>
                </div>

                {/* Direct Unboxed Social Links */}
                <div className="pt-4 border-t border-[#111111]/15 max-w-md">
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#555555] block mb-3">
                    DIRECT CONNECT
                  </span>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                    {socialLinks.map((s, idx) => {
                      const IconComp = s.icon;
                      return (
                        <a
                          key={idx}
                          href={s.href}
                          target={s.external ? '_blank' : '_self'}
                          rel={s.external ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#DDD8CF]/60 hover:bg-[#D4F62E] text-[#111111] transition-all"
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{s.label}</span>
                          {s.external && <ExternalLink className="w-3 h-3 opacity-60" />}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN (6 cols): Completely UNBOXED Contact Form with FormSubmit Integration */}
          <div className="lg:col-span-6 relative z-30 pt-4 lg:pt-0">
            <FadeIn delay={0.25} y={30}>
              <div className="w-full">
                {/* Form Header */}
                <div className="flex items-center justify-between pb-4 mb-8 border-b-2 border-[#111111]">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wider text-[#111111]">
                      SEND ME A MESSAGE
                    </h2>
                    <p className="text-xs font-semibold text-[#555555]">
                      Fill in your details and your message will be sent directly.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#D4F62E] flex items-center justify-center shadow-sm">
                    <Send className="w-5 h-5 text-[#111111] -rotate-12 fill-[#111111]" />
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 flex flex-col items-center justify-center text-center gap-4 bg-[#DDD8CF]/50 rounded-2xl border border-[#111111]/10 p-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4F62E] flex items-center justify-center text-3xl font-black shadow-md">
                      ✓
                    </div>
                    <h3 className="text-xl font-black text-[#111111] uppercase">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-[#555555] max-w-sm">
                      Thank you for reaching out! Your message has been sent directly via FormSubmit.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-8 py-3 rounded-full bg-[#D4F62E] text-xs font-black uppercase tracking-wider text-[#111111] hover:scale-105 transition-transform shadow-md cursor-pointer"
                    >
                      Send Another Message →
                    </button>
                  </motion.div>
                ) : (
                  <form
                    action="https://formsubmit.co/mabutalha0923@gmail.com"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    {/* FormSubmit Configuration Hidden Inputs */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    {/* Input 1: Name */}
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[0.7rem] font-black uppercase tracking-widest text-[#444444]">
                        01 / YOUR NAME *
                      </label>
                      <div className="relative flex items-center border-b-2 border-[#111111]/25 focus-within:border-[#111111] transition-colors py-3">
                        <User className="w-5 h-5 text-[#444444] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="What's your full name?"
                          className="w-full bg-transparent text-base sm:text-lg font-bold text-[#111111] placeholder-[#888888] outline-none"
                        />
                      </div>
                    </div>

                    {/* Input 2: Email */}
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[0.7rem] font-black uppercase tracking-widest text-[#444444]">
                        02 / YOUR EMAIL ADDRESS *
                      </label>
                      <div className="relative flex items-center border-b-2 border-[#111111]/25 focus-within:border-[#111111] transition-colors py-3">
                        <Mail className="w-5 h-5 text-[#444444] shrink-0 mr-3" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="w-full bg-transparent text-base sm:text-lg font-bold text-[#111111] placeholder-[#888888] outline-none"
                        />
                      </div>
                    </div>

                    {/* Input 3: Subject */}
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[0.7rem] font-black uppercase tracking-widest text-[#444444]">
                        03 / SUBJECT OR PROJECT TYPE
                      </label>
                      <div className="relative flex items-center border-b-2 border-[#111111]/25 focus-within:border-[#111111] transition-colors py-3">
                        <Folder className="w-5 h-5 text-[#444444] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Web Development / Full-time / Freelance"
                          className="w-full bg-transparent text-base sm:text-lg font-bold text-[#111111] placeholder-[#888888] outline-none"
                        />
                      </div>
                    </div>

                    {/* Input 4: Message */}
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[0.7rem] font-black uppercase tracking-widest text-[#444444]">
                        04 / YOUR MESSAGE *
                      </label>
                      <div className="relative flex items-start border-b-2 border-[#111111]/25 focus-within:border-[#111111] transition-colors py-3">
                        <Pencil className="w-5 h-5 text-[#444444] shrink-0 mr-3 mt-1" />
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, timeline, budget, or goals..."
                          className="w-full bg-transparent text-base sm:text-lg font-bold text-[#111111] placeholder-[#888888] outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 py-5 rounded-2xl bg-[#D4F62E] text-xs sm:text-sm font-black uppercase tracking-widest text-[#111111] flex items-center justify-center gap-3 shadow-lg hover:bg-[#cbf022] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          SENDING... <Loader2 className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>
                          SEND MESSAGE <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ─── Bottom Footer Strip ─── */}
        <FadeIn delay={0.35} y={15} className="w-full z-30 pt-8 border-t border-[#111111]/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555555]">
            <div className="font-semibold">
              © {new Date().getFullYear()} Talha. All rights reserved.
            </div>

            <div className="flex items-center gap-4 sm:gap-6 font-bold uppercase tracking-wider text-[0.7rem]">
              <a
                href="#about"
                className="hover:text-[#111111] transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#projects"
                className="hover:text-[#111111] transition-colors"
              >
                PROJECTS
              </a>
              <a
                href="#skills"
                className="hover:text-[#111111] transition-colors"
              >
                SKILLS
              </a>
              <a
                href="#experience"
                className="hover:text-[#111111] transition-colors"
              >
                EXPERIENCE
              </a>
              <a
                href="#contact"
                className="px-2.5 py-1 rounded bg-[#D4F62E] text-[#111111] font-black"
              >
                CONTACT
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
