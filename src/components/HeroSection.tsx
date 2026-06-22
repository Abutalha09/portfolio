import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ContactButton from './ContactButton';
import Magnet from './Magnet';
import FadeIn from './FadeIn';
import SpaceBackground from './SpaceBackground';




const TypingText: React.FC = () => {
  const words = ["Web Developer", "BCA Graduate", "Space Enthusiast", "Product Support Associate"];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: any;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setSpeed(50);
      }, speed);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setSpeed(100);
      }, speed);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setSpeed(2000);
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      setSpeed(500);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  return <span className="text-[#BBCCD7] font-semibold border-r-2 border-white/50 pr-1 animate-pulse">{text}</span>;
};

export const HeroSection: React.FC = () => {
  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none pb-8">
      {/* Navbar wrapper */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30">
        <Navbar />
      </FadeIn>

      {/* Space Background Particle System */}
      <SpaceBackground />

      {/* Hero Content Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-20 mt-4 lg:mt-0">
        {/* Left Side text content */}
        <div className="lg:col-span-7 flex flex-col text-left justify-center gap-4 sm:gap-6">

          {/* Heading */}
          <div className="overflow-hidden w-full">
            <FadeIn delay={0.2} y={40} as="h1" className="hero-heading font-black uppercase tracking-tight leading-none text-[8vw] sm:text-[7vw] lg:text-[5.5vw]">
              Hi, I&apos;m <br />
              Mohammad Abutalha
            </FadeIn>
          </div>

          {/* Typing subtitle */}
          <FadeIn delay={0.3} y={20} className="text-lg sm:text-xl md:text-2xl text-[#D7E2EA]/70">
            I am a <TypingText />
          </FadeIn>

          {/* Tagline */}
          <FadeIn delay={0.4} y={20}>
            <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl text-[#D7E2EA]/85">
              Crafting immersive, high-performance web applications across the digital cosmos. Specialized in turning complex ideas into sleek, responsive interactive realities.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.5} y={20} className="flex flex-wrap gap-4 mt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full border border-white/20 text-[#D7E2EA] font-medium uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              View Projects &rarr;
            </a>
            <a
              href="/Abutalha_Final_Resume (1).pdf"
              download
              className="px-6 py-3 rounded-full border border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C] font-semibold uppercase tracking-widest text-xs hover:bg-[#D7E2EA]/90 transition-all duration-300 flex items-center gap-2"
            >
              Download CV &#9661;
            </a>
          </FadeIn>
        </div>

        {/* Right Side Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0">
          {/* Glow background effects */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-purple-600/20 blur-[80px] rounded-full -top-10 -left-10 z-0"></div>
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-cyan-600/20 blur-[80px] rounded-full -bottom-10 -right-10 z-0"></div>

          {/* Portrait with Magnet */}
          <FadeIn delay={0.6} y={30} className="z-10 w-[220px] sm:w-[270px] md:w-[310px] lg:w-[340px] aspect-square relative">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-full h-full"
            >
              <div className="w-full h-full rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-3 relative group overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 border border-purple-500/20 rounded-[38px] group-hover:border-cyan-500/40 transition-all duration-300"></div>
                <img
                  src="/talha's pic.jpg"
                  alt="Mohammad Abutalha"
                  className="w-full h-full object-cover object-top rounded-[30px] pointer-events-none"
                />
              </div>
            </Magnet>

            {/* Floating skill tags */}
            <div className="absolute -top-4 -left-6 px-3 py-1.5 rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-xs text-[#D7E2EA]/90 font-medium tracking-wide shadow-md transform -rotate-6 select-none animate-bounce">
              &#128640; HTML5
            </div>
            <div className="absolute top-1/2 -right-10 px-3 py-1.5 rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-xs text-[#D7E2EA]/90 font-medium tracking-wide shadow-md transform rotate-12 select-none animate-pulse">
              &#9889; JS
            </div>
            <div className="absolute -bottom-4 left-6 px-3 py-1.5 rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-xs text-[#D7E2EA]/90 font-medium tracking-wide shadow-md transform -rotate-12 select-none">
              &#128013; Python
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Bar info */}
      <div className="w-full px-6 md:px-10 z-20 flex justify-between items-end mt-8 lg:mt-0">
        <FadeIn delay={0.7} y={20}>
          <div className="flex flex-row gap-6 sm:gap-10">
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-bold text-[#D7E2EA]">6+</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60">Projects</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-bold text-[#D7E2EA]">BCA</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60">Graduate</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-bold text-[#D7E2EA]">2+</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60">Platforms</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.8} y={20}>
          <ContactButton onClick={handleContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
