import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MessageSquare, 
  Send, 
  Linkedin, 
  Github, 
  Instagram,
  MapPin,
  Zap,
  Play,
  Pause,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import FadeIn from './FadeIn';


export const ContactSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio('/intro-voice.mp3'));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Interactive Photo Switcher State
  const [activePhoto, setActivePhoto] = useState<'look1' | 'look2' | 'look3'>('look1');

  // Captcha State
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Audio Effects and Controls
  useEffect(() => {
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audio]);

  const toggleSpeech = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio play failed, file is probably missing:", err);
          alert("Bhai, raw audio file missing hai! Please record standard voice note and place it in the public folder as 'intro-voice.mp3'.");
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // CAPTCHA Generation
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      e.preventDefault();
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Image mappings
  const photoPaths = {
    look1: '/contact-new1.jpg',
    look2: '/contact-new2.jpg',
    look3: '/contact-new3.jpg'
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 pt-24 pb-12 w-full z-20 relative border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 items-center">
        
        {/* Title */}
        <FadeIn delay={0} y={40} className="text-center">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">LET&apos;S CONNECT</span>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 80px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          >
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-[#D7E2EA]/75 font-light tracking-wide max-w-lg mx-auto">
            I&apos;m always open to discussing new opportunities, collaborations, or just having a friendly chat.
          </p>
        </FadeIn>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch w-full">
          
          {/* Left Column: Interactive Portrait Card & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between items-center w-full">
            
            {/* High-Tech Photo Panel */}
            <div className="relative w-full rounded-[30px] border border-white/10 bg-[#0F0F0F] p-4 flex flex-col overflow-hidden shadow-2xl group/panel h-full min-h-[500px]">
              {/* Neon border glow overlay */}
              <div className="absolute inset-0 border border-transparent group-hover/panel:border-cyan-500/20 rounded-[30px] pointer-events-none transition-colors duration-500 z-20"></div>
              


              {/* Photo Selector Segmented Tab bar */}
              <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl z-20 border border-white/5 mb-4 max-w-full overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActivePhoto('look1')}
                  className={`flex-1 min-w-[90px] text-center text-[10px] font-bold uppercase tracking-wider py-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${activePhoto === 'look1' ? 'bg-cyan-500 text-[#0C0C0C]' : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'}`}
                >
                  Black Shirt
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('look2')}
                  className={`flex-1 min-w-[90px] text-center text-[10px] font-bold uppercase tracking-wider py-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${activePhoto === 'look2' ? 'bg-cyan-500 text-[#0C0C0C]' : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'}`}
                >
                  Grey Blazer
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('look3')}
                  className={`flex-1 min-w-[90px] text-center text-[10px] font-bold uppercase tracking-wider py-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${activePhoto === 'look3' ? 'bg-cyan-500 text-[#0C0C0C]' : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'}`}
                >
                  Black Suit
                </button>
              </div>

              {/* Responsive Image Container */}
              <div className="relative flex-grow rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center min-h-[350px] mb-4">
                <img
                  src={photoPaths[activePhoto]}
                  alt="Mohammad Abutalha Portrait"
                  className="absolute inset-0 w-full h-full object-cover select-none transition-all duration-700 ease-in-out scale-100 group-hover/panel:scale-105"
                />
              </div>

              {/* Custom Audio Player Console - Placed underneath the image so there is no overlay blur */}
              <div className="w-full bg-[#0C0C0C]/80 border border-white/10 rounded-xl p-3 z-20 text-left transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block leading-none mb-1">Hi there! 👋</span>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide leading-none">Voice Intro Note</h4>
                  </div>
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-3 select-none pr-1">
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-bar-1 h-2"></span>
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-bar-2 h-3"></span>
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-bar-3 h-1"></span>
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-bar-4 h-3"></span>
                      <span className="w-0.5 bg-cyan-400 rounded-full animate-bar-5 h-2"></span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className="w-8 h-8 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#0C0C0C] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                    aria-label="Toggle voice greeting"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <div className="flex-grow flex flex-col gap-1">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-[#D7E2EA]/50 leading-none">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Tech Stats Pill Row */}
            <div className="w-full bg-[#0F0F0F] rounded-2xl border border-white/10 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center z-20 text-left shadow-lg">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold tracking-wider text-[#D7E2EA]/50 leading-none mb-1">Status</span>
                  <span className="text-xs font-semibold text-[#D7E2EA]">Available for Work</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold tracking-wider text-[#D7E2EA]/50 leading-none mb-1">Location</span>
                  <span className="text-xs font-semibold text-[#D7E2EA]">Kanpur, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold tracking-wider text-[#D7E2EA]/50 leading-none mb-1">Response</span>
                  <span className="text-xs font-semibold text-[#D7E2EA]">Within 24 Hrs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Form (Mockup layout matches "Get in Touch" style) */}
          <div className="lg:col-span-7 w-full">
            <FadeIn
              delay={0.2}
              y={30}
              className="w-full h-full bg-[#0F0F0F] rounded-[40px] border border-white/10 hover:border-purple-500/30 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-500 group/form"
            >
              {/* Subtle hover neon glow border effect */}
              <div className="absolute inset-0 border border-transparent group-hover/form:border-purple-500/20 rounded-[40px] pointer-events-none transition-colors duration-500 z-20"></div>

              {/* Form Title & Intro Paragraph matching Mockup */}
              <div className="text-left mb-6 z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-2 uppercase">Get in touch</h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed">
                  Have a project in mind, want to discuss support solutions, or just want to verify my code? Drop a line below and let&apos;s build something spectacular.
                </p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mt-3"></div>
              </div>

              {/* Contact Form */}
              <form 
                action="https://formsubmit.co/mdsaif2357@gmail.com" 
                method="POST"
                onSubmit={handleFormSubmit}
                className="relative z-10 flex flex-col gap-5 w-full text-left"
              >
                {/* 2-Column Name Grid: First Name & Last Name (Exactly like mockup) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  
                  {/* First Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-400" /> First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="First Name"
                      required
                      placeholder="First name"
                      className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-white/20 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all text-sm"
                    />
                  </div>

                  {/* Last Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-400" /> Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="Last Name"
                      required
                      placeholder="Last name"
                      className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-white/20 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Input Email */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-purple-400" /> Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-white/20 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all text-sm"
                  />
                </div>

                {/* Input Message */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-white/20 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all resize-none text-sm"
                  />
                </div>

                {/* Security Passcode CAPTCHA Widget */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="captcha" className="text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-purple-400" /> Security Verification *
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                    
                    {/* The random security text box */}
                    <div className="flex items-center gap-3 bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-2 select-none justify-between sm:justify-start">
                      <span 
                        style={{ letterSpacing: '4px' }}
                        className="font-mono text-base font-black text-cyan-400 select-none tracking-widest italic line-through decoration-purple-500/80 decoration-2"
                      >
                        {captchaCode}
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="text-purple-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                        title="Refresh Security Text"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Input where user types it */}
                    <input
                      type="text"
                      id="captcha"
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                      required
                      placeholder="Enter security text"
                      className={`flex-grow bg-[#0C0C0C] border ${captchaError ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.25)]' : 'border-white/10 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]'} rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-white/20 focus:outline-none hover:border-white/20 transition-all text-sm`}
                    />
                  </div>
                  {captchaError && (
                    <span className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
                      ⚠️ Security code mismatched! Please type the exact letters.
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5 -rotate-45" /> Send Message
                </button>
              </form>

              {/* Social divider */}
              <div className="flex items-center justify-center my-5 w-full gap-4 z-10">
                <div className="h-[1px] bg-white/10 flex-grow"></div>
                <span className="text-[9px] uppercase font-bold text-[#D7E2EA]/40 tracking-wider">Or connect with me on</span>
                <div className="h-[1px] bg-white/10 flex-grow"></div>
              </div>

              {/* Social connections row */}
              <div className="flex flex-wrap gap-4 items-center justify-center w-full z-10">
                <a
                  href="https://www.linkedin.com/in/mohammad-abutalha-932771363/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0C0C0C] border border-white/10 text-[#D7E2EA]/70 hover:border-cyan-400/40 hover:text-cyan-400 transition-all flex items-center justify-center shadow-md hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Abutalha09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0C0C0C] border border-white/10 text-[#D7E2EA]/70 hover:border-purple-400/40 hover:text-purple-400 transition-all flex items-center justify-center shadow-md hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:mdsaif2357@gmail.com"
                  className="w-11 h-11 rounded-xl bg-[#0C0C0C] border border-white/10 text-[#D7E2EA]/70 hover:border-pink-400/40 hover:text-pink-400 transition-all flex items-center justify-center shadow-md hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

            </FadeIn>
          </div>

        </div>

        {/* Footer info */}
        <div className="w-full flex flex-col gap-8 items-center border-t border-white/5 pt-12 mt-4">
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#D7E2EA] select-none">
            Mohammad Abutalha
          </h3>

          {/* Socials connections bottom footer */}
          <nav className="flex flex-wrap gap-4 items-center justify-center" aria-label="Social connections">
            <a
              href="https://www.linkedin.com/in/mohammad-abutalha-932771363/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA] hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:text-cyan-400 transition-all flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Abutalha09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA] hover:bg-purple-500/10 hover:border-purple-400/40 hover:text-purple-400 transition-all flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/tallllllhhhaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA] hover:bg-pink-500/10 hover:border-pink-400/40 hover:text-pink-400 transition-all flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </nav>

          <p className="text-[10px] sm:text-xs text-[#D7E2EA]/50 font-light select-none tracking-widest uppercase">
            &copy; 2026 Mohammad Abutalha. Crafted across the cosmos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
