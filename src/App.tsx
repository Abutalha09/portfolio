import { useState, useEffect } from 'react';
import IntroLoader from './components/IntroLoader';
import { ThemeProvider } from './context/ThemeContext';
import StickyNav from './components/StickyNav';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import TerminalSection from './components/TerminalSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) return;
    window.scrollTo(0, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [showIntro]);

  return (
    <>
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      <div
        className="w-full min-h-screen overflow-x-clip flex flex-col"
        style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
      >
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Left-side sticky nav */}
        <StickyNav />

        {/* Hero Section */}
        <HeroSection animate={true} />

        <MarqueeSection />

        {/* Main Content Wrapper for Sections Below Hero: Adds lg:pl-[215px] on desktop so the sticky sidebar never overlaps */}
        <main className="w-full transition-all duration-300 lg:pl-[215px]">
          <div id="about">     <AboutSection />     </div>
          <div id="experience"><ServicesSection />   </div>
          <div id="projects">  <ProjectsSection />   </div>
          <div id="skills">    <SkillsSection />     </div>
          <div id="terminal">  <TerminalSection />   </div>
          <div id="education"> <EducationSection />  </div>
          <div id="contact">   <ContactSection />    </div>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
