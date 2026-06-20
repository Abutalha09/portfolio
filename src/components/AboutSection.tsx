import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

export const AboutSection: React.FC = () => {
  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative Corner Images */}
      {/* Top Left */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none w-[100px] sm:w-[140px] md:w-[170px] opacity-40 sm:opacity-70"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon 3D"
          className="w-full h-auto animate-float-slow"
        />
      </FadeIn>

      {/* Bottom Left */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[2%] sm:left-[4%] md:left-[6%] z-0 pointer-events-none w-[90px] sm:w-[120px] md:w-[150px] opacity-40 sm:opacity-70"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D object left"
          className="w-full h-auto animate-float-medium"
        />
      </FadeIn>

      {/* Top Right */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none w-[100px] sm:w-[140px] md:w-[170px] opacity-40 sm:opacity-70"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego 3D"
          className="w-full h-auto animate-float-medium"
        />
      </FadeIn>

      {/* Bottom Right */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[2%] sm:right-[4%] md:right-[6%] z-0 pointer-events-none w-[110px] sm:w-[140px] md:w-[180px] opacity-40 sm:opacity-70"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D group right"
          className="w-full h-auto animate-float-slow"
        />
      </FadeIn>

      {/* Main Content Layout */}
      <div className="flex flex-col items-center z-10 w-full max-w-6xl">
        {/* Title */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight mb-10 sm:mb-14 md:mb-16 text-center"
          >
            About me
          </h2>
        </FadeIn>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full mt-4">
          {/* About Image Left (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <FadeIn delay={0.2} y={30} className="w-[200px] sm:w-[260px] md:w-full max-w-[340px] aspect-[4/5] rounded-[30px] sm:rounded-[40px] border border-white/10 p-3 bg-white/5 shadow-2xl relative group overflow-hidden">
              <img
                src="/talha2.jpg"
                alt="Mohammad Abutalha Second Profile"
                className="w-full h-full object-cover rounded-[20px] sm:rounded-[30px] transition-transform duration-500 group-hover:scale-105"
              />
            </FadeIn>
          </div>

          {/* Description Right (7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-8 text-center md:text-left">
            <AnimatedText
              text="I am a passionate Web Developer who graduated with a Bachelor's degree in Computer Applications (BCA). I love building fast, clean, and interactive user interfaces using modern web methodologies. During my structured training, I contributed actively to school management portals and administrative backends, reinforcing my knowledge of database alignment, frontend state flow, and teamwork. I am continuously learning, and currently working as a Product Support Associate, helping clients configure and optimize complex enterprise operations across school and hotel management spaces. Let's build something incredible together!"
              className="text-[#D7E2EA] font-medium leading-relaxed select-none text-[clamp(0.95rem,1.8vw,1.25rem)] text-center md:text-left"
            />

            <FadeIn delay={0.3} y={20} className="mx-auto md:mx-0">
              <ContactButton onClick={handleContactClick} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
