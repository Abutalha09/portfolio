import StickyNav from './components/StickyNav';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div
      className="w-full min-h-screen overflow-x-clip flex flex-col"
      style={{ background: '#CAC5BA' }}
    >
      {/* ── Cursor ──────────────────────────────── */}
      <CustomCursor />

      {/* ── Left-side sticky nav (hidden at top) ── */}
      <StickyNav />

      {/* ── Hero Section (Full Viewport Width) ─── */}
      <HeroSection animate={true} />

      <MarqueeSection />

      {/*
        ── Main Content Wrapper for Sections Below Hero ──
        Adds lg:pl-[215px] on desktop so the sticky sidebar never overlaps
        headings, text, or cards!
      */}
      <main className="w-full transition-all duration-300 lg:pl-[215px]">
        <div id="about">     <AboutSection />     </div>
        <div id="experience"><ServicesSection />   </div>
        <div id="projects">  <ProjectsSection />   </div>
        <div id="skills">    <SkillsSection />     </div>
        <div id="education"> <EducationSection />  </div>
        <div id="contact">   <ContactSection />    </div>
      </main>
    </div>
  );
}

export default App;
