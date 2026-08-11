import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import {
  Trash2,
  Copy,
  Check,
  CornerDownLeft,
  Command,
  Flame,
  Maximize2,
  Minimize2,
  Download,
  Briefcase,
  GraduationCap,
  Sparkles,
  Bot,
  Mail,
  User,
  Wrench,
} from 'lucide-react';

interface OutputItem {
  id: string;
  command: string;
  content: React.ReactNode;
}

const COMMAND_LIST = [
  'help',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'ai-tools',
  'achievements',
  'resume',
  'contact',
  'sudo hire',
  'whoami',
  'clear',
];

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Initial welcome message with resume info
  const [outputs, setOutputs] = useState<OutputItem[]>([
    {
      id: 'init-1',
      command: 'welcome',
      content: (
        <div className="space-y-2 py-1 font-mono text-xs text-white/90">
          <pre className="text-[var(--accent)] font-bold text-[0.6rem] sm:text-xs leading-none overflow-x-auto select-none opacity-95">
{` █████╗ ██████╗ ██╗   ██╗████████╗ █████╗ ██╗     ██╗  ██╗ █████╗ 
██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██╔══██╗██║     ██║  ██║██╔══██╗
███████║██████╔╝██║   ██║   ██║   ███████║██║     ███████║███████║
██╔══██║██╔══██╗██║   ██║   ██║   ██╔══██║██║     ██╔══██║██╔══██║
██║  ██║██████╔╝╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║██║  ██║`}
          </pre>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[0.7rem] text-white/70">
            <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold bg-[var(--accent)] text-[#111] uppercase tracking-wider">
              ABUTALHA RESUME CLI v2.6
            </span>
            <span>[Kanpur, UP | BCA CGPA: 7.12 | Status: Open to Roles]</span>
          </div>
          <p className="text-white/80 text-xs leading-relaxed">
            Welcome to Mohammad Abutalha's Interactive Resume CLI! Type <span className="text-[var(--accent)] font-bold">'help'</span> or tap any shortcut pill below to view detailed resume sections.
          </p>
        </div>
      ),
    },
  ]);

  // Scroll to bottom when outputs update
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setOutputs([]);
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const subArg = parts.slice(1).join(' ').toLowerCase();

    let outputContent: React.ReactNode = null;

    if (mainCmd === 'clear') {
      handleClear();
      setInputVal('');
      return;
    }

    switch (mainCmd) {
      case 'help':
        outputContent = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[var(--accent)] font-bold flex items-center gap-1.5">
              <Command className="w-3.5 h-3.5" /> RESUME COMMAND DIRECTORY:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.72rem] text-white/85">
              <div><span className="text-[var(--accent)] font-bold">about</span> — Bio, role &amp; summary</div>
              <div><span className="text-[var(--accent)] font-bold">experience</span> — PolarBear Tech SaaS roles</div>
              <div><span className="text-[var(--accent)] font-bold">projects</span> — AI Telecom, Downloader &amp; Web Apps</div>
              <div><span className="text-[var(--accent)] font-bold">skills</span> — Languages, AI tools &amp; frameworks</div>
              <div><span className="text-[var(--accent)] font-bold">education</span> — BCA (Vision Tech) &amp; DCA (Swami Vivekanand)</div>
              <div><span className="text-[var(--accent)] font-bold">ai-tools</span> — Gemini API, ChatGPT, Claude AI</div>
              <div><span className="text-[var(--accent)] font-bold">achievements</span> — CSJMU Kanpur AI Workshop &amp; Awards</div>
              <div><span className="text-[var(--accent)] font-bold">resume</span> — View CV summary &amp; download PDF</div>
              <div><span className="text-[var(--accent)] font-bold">contact</span> — Phone, email, GitHub &amp; LinkedIn</div>
              <div><span className="text-[var(--accent)] font-bold">sudo hire</span> — Grant root access &amp; send offer</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <div className="space-y-2 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-sm">
              <User className="w-4 h-4" /> MOHAMMAD ABUTALHA — PROFESSIONAL SUMMARY
            </div>
            <p className="text-white/80 leading-relaxed">
              Results-driven BCA student and Product Support Associate with hands-on experience in SaaS product support, client onboarding, and cross-functional collaboration. Proficient in AI tools, web technologies (HTML5, CSS3, JavaScript, Python, ReactJS), and data management. Demonstrated ability to resolve technical issues, manage customer relationships, and build full-stack web applications.
            </p>
            <div className="pt-1 text-[0.72rem] text-white/70 space-y-1 bg-white/5 p-2.5 rounded-lg border border-white/10">
              <div>📍 Location: <span className="text-white font-semibold">Kanpur, Uttar Pradesh, India</span></div>
              <div>💼 Current Role: <span className="text-[var(--accent)] font-bold">Product Support Associate at PolarBear Tech</span></div>
              <div>🎓 Education: <span className="text-white font-semibold">BCA (CGPA: 7.12) &amp; DCA (85%)</span></div>
              <div>📞 Phone: <span className="text-white font-semibold">+91 91200 38438</span></div>
            </div>
          </div>
        );
        break;

      case 'experience':
      case 'work':
        outputContent = (
          <div className="space-y-3 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <Briefcase className="w-4 h-4" /> PROFESSIONAL WORK EXPERIENCE:
            </div>
            <div className="space-y-3 text-[0.72rem]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex flex-wrap items-center justify-between font-bold text-white">
                  <span className="text-[var(--accent)] text-sm">Product Support Associate</span>
                  <span className="text-white/60">April 2026 – Present</span>
                </div>
                <div className="text-white/70 font-semibold">PolarBear Tech · Kanpur, UP</div>
                <ul className="list-disc list-inside text-white/80 space-y-1 pt-1">
                  <li>Manage end-to-end customer support for SaaS products <strong>Edubuddy</strong> and <strong>HotelBuddy</strong>.</li>
                  <li>Coordinate with development team to document, track &amp; resolve bugs, speeding up resolution cycles.</li>
                  <li>Conduct client onboarding sessions &amp; training programs to drive user adoption and reduce ticket volume.</li>
                  <li>Maintain ticket logs, issue documentation, and weekly SLA resolution reports.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex flex-wrap items-center justify-between font-bold text-white">
                  <span className="text-[var(--accent)] text-sm">Paid Intern – Product Support</span>
                  <span className="text-white/60">Jan 2026 – Mar 2026</span>
                </div>
                <div className="text-white/70 font-semibold">PolarBear Tech · Kanpur, UP</div>
                <ul className="list-disc list-inside text-white/80 space-y-1 pt-1">
                  <li>Assisted in handling customer queries &amp; support tickets for Edubuddy &amp; HotelBuddy platforms.</li>
                  <li>Supported troubleshooting, QA testing, and issue documentation in a live SaaS product environment.</li>
                </ul>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="space-y-3 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <Sparkles className="w-4 h-4" /> FEATURED PROJECTS:
            </div>
            <div className="space-y-2.5 text-[0.72rem]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white text-sm">1. AI-Based Telecom Website</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--accent)] text-[#111] text-[0.6rem] font-bold">ReactJS + Gemini API</span>
                </div>
                <p className="text-white/70">Developed AI telecom assistant integrating <strong>Google Gemini API</strong> for contextual user query resolutions, multi-channel WhatsApp/call support, and automated quote generation.</p>
                <div className="text-[0.65rem] text-[var(--accent)]">Tech: HTML, CSS, JavaScript, ReactJS, Google Gemini API</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white text-sm">2. Social Media Video Downloader</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--accent)] text-[#111] text-[0.6rem] font-bold">Python + Flask</span>
                </div>
                <p className="text-white/70">Full-stack app enabling video downloads from multiple social media platforms with optimized Python/Flask backend request handling for low latency.</p>
                <div className="text-[0.65rem] text-[var(--accent)]">Tech: HTML, CSS, JavaScript, Python, Flask</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white text-sm">3. PFMS System &amp; HotelBuddy Suite</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--accent)] text-[#111] text-[0.6rem] font-bold">React + TypeScript</span>
                </div>
                <p className="text-white/70">Public Financial Management &amp; Hotel Management Engines for guest bookings, POS invoice logs, and room occupancy.</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-2.5 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <Wrench className="w-4 h-4" /> TECHNICAL &amp; SOFT SKILLS BREAKDOWN:
            </div>
            <div className="space-y-2 text-[0.72rem]">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[var(--accent)] font-bold">Languages &amp; Frameworks:</span>
                <p className="text-white/80 mt-0.5">HTML5, CSS3, JavaScript (ES6+), Python, ReactJS, Tailwind CSS</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[var(--accent)] font-bold">AI &amp; Automation Tools:</span>
                <p className="text-white/80 mt-0.5">ChatGPT, Claude AI, Genspark, Google AI Studio, Automation Basics</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[var(--accent)] font-bold">Dev &amp; Platforms:</span>
                <p className="text-white/80 mt-0.5">GitHub, Flask, Netlify, Render, REST APIs, Browser DevTools</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[var(--accent)] font-bold">Data &amp; Office Tools:</span>
                <p className="text-white/80 mt-0.5">MS Excel (VLOOKUP, Pivot Tables, Charts), Data Entry, Data Management</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[var(--accent)] font-bold">Soft Skills:</span>
                <p className="text-white/80 mt-0.5">Customer Communication, Problem-Solving, Teamwork, Adaptability, Client Handling</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'education':
        outputContent = (
          <div className="space-y-2.5 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <GraduationCap className="w-4 h-4" /> ACADEMIC BACKGROUND:
            </div>
            <div className="space-y-2 text-[0.72rem]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between font-bold text-white">
                  <span className="text-[var(--accent)] text-sm">Bachelor of Computer Applications (BCA)</span>
                  <span>Sept 2023 – May 2026</span>
                </div>
                <p className="text-white/70">Vision Institute of Technology, Kanpur</p>
                <p className="text-[var(--accent)] font-bold mt-1">CGPA: 7.12 / 10.0</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between font-bold text-white">
                  <span className="text-[var(--accent)] text-sm">Diploma in Computer Applications (DCA)</span>
                  <span>Completed</span>
                </div>
                <p className="text-white/70">Swami Vivekanand Institute, Kanpur</p>
                <p className="text-[var(--accent)] font-bold mt-1">Score: 85% Distinction</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'ai-tools':
      case 'ai':
        outputContent = (
          <div className="space-y-2 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <Bot className="w-4 h-4" /> AI INTEGRATION &amp; WORKSHOPS:
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[0.72rem] space-y-1.5">
              <p className="text-white font-bold">Google Gemini API Telecom Assistant:</p>
              <p className="text-white/70">Built an intelligent chatbot assistant capable of multi-turn query handling, quote generation, and WhatsApp/Call redirection.</p>
              <p className="text-white font-bold pt-1">CSJMU Kanpur Regional AI Workshop:</p>
              <p className="text-white/70">Participated in AI Workshop on "Application of Artificial Intelligence in Colleges" organized at Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur with 40+ regional colleges.</p>
            </div>
          </div>
        );
        break;

      case 'achievements':
        outputContent = (
          <div className="space-y-2 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <Sparkles className="w-4 h-4" /> ACHIEVEMENTS &amp; ACTIVITIES:
            </div>
            <ul className="list-disc list-inside text-[0.72rem] text-white/80 space-y-1 bg-white/5 p-3 rounded-xl border border-white/10">
              <li>Participated in AI Workshop on "Application of Artificial Intelligence in Colleges" at CSJMU University, Kanpur.</li>
              <li>Engaged in technical discussions on practical AI implementations alongside participants from 40+ colleges.</li>
              <li>Achieved 85% Distinction in Diploma in Computer Applications (DCA).</li>
              <li>Successfully managed SaaS client onboarding &amp; SLA compliance at PolarBear Tech.</li>
            </ul>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        outputContent = (
          <div className="p-3.5 rounded-xl bg-white/5 border border-[var(--accent)] text-xs font-mono space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="text-[var(--accent)] text-sm">MOHAMMAD ABUTALHA — RESUME PDF</span>
              <span className="text-xs text-white/60">Updated 2026</span>
            </div>
            <p className="text-white/80 text-[0.72rem]">
              Product Support Associate &amp; Full-Stack Web Developer. BCA CGPA: 7.12. Experienced in Edubuddy &amp; HotelBuddy SaaS support, ReactJS, Python, Flask, and Gemini API.
            </p>
            <div className="pt-1">
              <a
                href="/Abutalha_Final_Resume (1).pdf"
                download
                className="px-3.5 py-1.5 rounded bg-[var(--accent)] text-[#111] font-extrabold text-[0.7rem] uppercase tracking-wider inline-flex items-center gap-1.5 no-underline hover:opacity-90"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Resume PDF ↓</span>
              </a>
            </div>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="space-y-2 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <Mail className="w-4 h-4" /> DIRECT CONTACT DETAILS:
            </div>
            <div className="space-y-1.5 text-[0.75rem] bg-white/5 p-3 rounded-xl border border-white/10">
              <div>📧 Primary Email: <a href="mailto:mdsaif2357@gmail.com" className="text-[var(--accent)] underline font-bold">mdsaif2357@gmail.com</a></div>
              <div>📧 Portfolio Email: <a href="mailto:mabutalha0923@gmail.com" className="text-[var(--accent)] underline font-bold">mabutalha0923@gmail.com</a></div>
              <div>📞 Phone: <a href="tel:+919120038438" className="text-[var(--accent)] underline font-bold">+91 91200 38438</a></div>
              <div>📍 Location: <span className="text-white">Kanpur, Uttar Pradesh, India</span></div>
              <div>🐙 GitHub: <a href="https://github.com/Abutalha09" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">github.com/Abutalha09</a></div>
              <div>💼 LinkedIn: <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">Mohammad Abutalha</a></div>
            </div>
          </div>
        );
        break;

      case 'sudo':
        if (subArg === 'hire' || subArg === 'hire me') {
          outputContent = (
            <div className="p-3.5 rounded-xl bg-[var(--accent)] text-[#111] font-mono space-y-1.5 text-xs">
              <div className="flex items-center gap-2 font-black text-sm uppercase">
                <Flame className="w-4 h-4" /> ACCESS GRANTED: HIRE OFFER INITIALIZED!
              </div>
              <p className="font-medium text-[0.75rem]">
                Mohammad Abutalha is open for full-time Product Support, Web Development, and technical roles.
              </p>
              <div className="pt-1">
                <a
                  href="mailto:mdsaif2357@gmail.com?subject=Job%20Offer%20for%20Mohammad%20Abutalha"
                  className="px-3 py-1.5 rounded bg-[#111] text-white font-extrabold text-[0.7rem] uppercase tracking-wider inline-block no-underline"
                >
                  Send Direct Offer Email →
                </a>
              </div>
            </div>
          );
        } else {
          outputContent = (
            <p className="text-rose-400 text-xs font-mono">
              sudo: '{subArg || 'command'}' failed. Try <span className="text-[var(--accent)] font-bold underline cursor-pointer" onClick={() => executeCommand('sudo hire')}>'sudo hire'</span>.
            </p>
          );
        }
        break;

      case 'whoami':
        outputContent = (
          <p className="text-xs font-mono text-white/80">
            guest@abutalha-portfolio-client [Privileges: Explorer / Reader]
          </p>
        );
        break;

      default:
        outputContent = (
          <p className="text-rose-400 text-xs font-mono">
            command not found: '{trimmed}'. Type <span className="text-[var(--accent)] font-bold underline cursor-pointer" onClick={() => executeCommand('help')}>'help'</span> for valid resume commands.
          </p>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        content: outputContent,
      },
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMAND_LIST.find((c) => c.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  const copyTerminalOutput = () => {
    const text = outputs.map((o) => `$ ${o.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className={`w-full py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isFullscreen ? 'fixed inset-0 z-[9999] p-0 max-w-none bg-black/90 flex flex-col justify-center' : ''}`}>
      {/* Section Header */}
      {!isFullscreen && (
        <div className="flex flex-col items-center text-center mb-8">
          <span className="tag-yellow mb-3">Interactive Terminal</span>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl text-[var(--text-dark)]">
            Developer CLI
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-mid)] max-w-md mt-2 font-medium">
            Type commands or tap shortcut chips below to explore Mohammad Abutalha's official resume details.
          </p>
        </div>
      )}

      {/* Terminal Container */}
      <div
        onClick={handleTerminalClick}
        className={`w-full rounded-2xl overflow-hidden shadow-2xl border cursor-text transition-all duration-300 ${isFullscreen ? 'h-full rounded-none border-none' : ''}`}
        style={{
          background: '#111111',
          borderColor: 'var(--border-dark)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 select-none bg-[#161616]">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); handleClear(); }} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 cursor-pointer" title="Clear Screen" />
            <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }} className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 cursor-pointer" title="Toggle Fullscreen" />
            <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }} className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 cursor-pointer" title="Toggle Fullscreen" />
            <span className="ml-2 text-[0.7rem] font-mono font-bold text-white/70 hidden sm:inline-block">
              abutalha@resume-cli:~$
            </span>
          </div>

          {/* Actions Right */}
          <div className="flex items-center gap-3">
            <a
              href="/Abutalha_Final_Resume (1).pdf"
              download
              onClick={(e) => e.stopPropagation()}
              className="text-[0.65rem] font-mono font-bold px-2.5 py-1 rounded bg-[var(--accent)] text-[#111] flex items-center gap-1 no-underline hover:opacity-90"
              title="Download Resume PDF"
            >
              <Download className="w-3 h-3" />
              <span>Resume PDF</span>
            </a>
            <button onClick={(e) => { e.stopPropagation(); copyTerminalOutput(); }} className="text-white/60 hover:text-white border-none bg-transparent cursor-pointer" title="Copy Output">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(!isFullscreen); }} className="text-white/60 hover:text-white border-none bg-transparent cursor-pointer" title="Fullscreen">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleClear(); }} className="text-white/60 hover:text-rose-400 border-none bg-transparent cursor-pointer" title="Clear Screen">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output Body */}
        <div
          ref={terminalBodyRef}
          className={`p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-sm ${isFullscreen ? 'flex-1 h-[calc(100vh-120px)]' : 'min-h-[280px] max-h-[440px]'}`}
        >
          {outputs.map((out) => (
            <div key={out.id} className="space-y-1">
              {out.command && out.command !== 'welcome' && (
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span className="text-[var(--accent)] font-bold">abutalha@portfolio:~$</span>
                  <span className="font-bold text-white">{out.command}</span>
                </div>
              )}
              <div className="pl-0 sm:pl-3">{out.content}</div>
            </div>
          ))}
        </div>

        {/* Shortcut Chips */}
        <div className="px-4 py-2.5 border-t border-white/10 flex items-center gap-2 overflow-x-auto select-none bg-black/40">
          <span className="text-[0.65rem] font-mono font-bold text-white/50 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
            <Command className="w-3 h-3 text-[var(--accent)]" /> Shortcuts:
          </span>
          {[
            { cmd: 'help', label: 'help' },
            { cmd: 'about', label: 'about' },
            { cmd: 'experience', label: 'experience' },
            { cmd: 'projects', label: 'projects' },
            { cmd: 'skills', label: 'skills' },
            { cmd: 'education', label: 'education' },
            { cmd: 'ai-tools', label: 'ai-tools' },
            { cmd: 'resume', label: 'resume PDF' },
            { cmd: 'contact', label: 'contact' },
            { cmd: 'sudo hire', label: 'sudo hire' },
            { cmd: 'clear', label: 'clear' },
          ].map((chip) => (
            <button
              key={chip.cmd}
              onClick={(e) => {
                e.stopPropagation();
                executeCommand(chip.cmd);
              }}
              className="px-2.5 py-1 rounded text-[0.68rem] font-mono font-bold transition-all duration-200 cursor-pointer border border-white/10 bg-white/5 text-white/85 hover:bg-[var(--accent)] hover:text-[#111] flex-shrink-0"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Line */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-t border-white/10">
          <span className="text-[var(--accent)] font-mono font-bold text-xs sm:text-sm flex-shrink-0">
            abutalha@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white placeholder-white/40 font-semibold"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 rounded bg-[var(--accent)] text-[#111] hover:opacity-90 transition-opacity border-none cursor-pointer font-bold"
            title="Execute"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
