/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  BarChart3,
  Cpu,
  Moon,
  Sun,
  ChevronRight,
  Terminal,
  Award,
  Briefcase,
  FileDown
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  date: string;
  description: string[];
  tags: string[];
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string[];
}

interface SkillGroup {
  category: string;
  skills: string[];
  icon: React.ReactNode;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Real-Time Coconut Tree Disease Detection",
    date: "May 2025",
    tags: ["YOLOv8", "Explainable AI", "Streamlit", "Python"],
    description: [
      "Developed a real-time disease detection system using YOLOv8 for identifying coconut tree diseases.",
      "Integrated Explainable AI (EigenCAM) to generate visual heatmaps for transparent AI predictions.",
      "Built a Streamlit-based UI for non-technical users, supporting webcam and RTSP streams."
    ]
  },
  {
    title: "Lane Lines Detection",
    date: "Mar 2023",
    tags: ["OpenCV", "Python", "Computer Vision"],
    description: [
      "Developed an image and video-based lane detection system identifying road lane boundaries.",
      "Implemented color filtering, grayscale conversion, Gaussian blur, and Canny edge detection.",
      "Applied region of interest masking and Hough Line Transform for accurate visualization."
    ]
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    title: "Google Cybersecurity",
    issuer: "Coursera",
    date: "Apr 2024",
    description: ["Completed 8 courses covering threat detection, network security, and SIEM tools."]
  },
  {
    title: "Meta Android Developer",
    issuer: "Coursera",
    date: "Oct 2024",
    description: ["Professional certificate covering Kotlin, Android Studio, UI/UX, and mobile architecture."]
  },
  {
    title: "Google Data Analytics",
    issuer: "Coursera",
    date: "Apr 2024",
    description: ["Mastered data cleaning, analysis, and visualization using SQL, R, and Tableau."]
  }
];

const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "Matlab", "SQL", "C", "Linux"],
    icon: <Terminal className="w-6 h-6" />
  },
  {
    category: "Data Science",
    skills: ["Machine Learning", "Deep Learning", "Data Engineering", "Statistics"],
    icon: <Database className="w-6 h-6" />
  },
  {
    category: "Visualization",
    skills: ["Excel", "Tableau", "Power BI", "Matplotlib", "Seaborn"],
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    category: "Soft Skills",
    skills: ["Creative", "Resilient", "Self Monitoring", "Adaptive"],
    icon: <Cpu className="w-6 h-6" />
  }
];

// --- Components ---

const GridBackground = ({ isLight }: { isLight: boolean }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className={`absolute inset-0 grid-background opacity-20 ${isLight ? 'bg-orange-50' : 'bg-neutral-950'}`} />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${isLight ? 'from-orange-100/50 via-transparent to-orange-100/50' : 'from-neutral-950 via-transparent to-neutral-950'}`}
      />
      {/* Animated glow effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px] ${isLight ? 'bg-orange-400' : 'bg-blue-600'}`}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] ${isLight ? 'bg-red-400' : 'bg-purple-600'}`}
      />
    </div>
  );
};

const SkillCard: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="uiverse-parent"
    >
      <div className="uiverse-card">
        <div className="uiverse-logo">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            {group.icon}
          </span>
        </div>
        <div className="uiverse-glass"></div>
        <div className="uiverse-content">
          <span className="title">{group.category}</span>
          <div className="text-container">
            {group.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="uiverse-bottom">
          <div className="icon-container">
            {group.icon}
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <svg
        aria-label="loader being flipped clockwise and circled by three white curves fading in and out"
        role="img"
        height="56px"
        width="56px"
        viewBox="0 0 56 56"
        className="loader drop-shadow-lg"
      >
        <clipPath id="sand-mound-top">
          <path
            d="M 14.613 13.087 C 15.814 12.059 19.3 8.039 20.3 6.539 C 21.5 4.789 21.5 2.039 21.5 2.039 L 3 2.039 C 3 2.039 3 4.789 4.2 6.539 C 5.2 8.039 8.686 12.059 9.887 13.087 C 11 14.039 12.25 14.039 12.25 14.039 C 12.25 14.039 13.5 14.039 14.613 13.087 Z"
            className="loader__sand-mound-top"
          ></path>
        </clipPath>
        <clipPath id="sand-mound-bottom">
          <path
            d="M 14.613 20.452 C 15.814 21.48 19.3 25.5 20.3 27 C 21.5 28.75 21.5 31.5 21.5 31.5 L 3 31.5 C 3 31.5 3 28.75 4.2 27 C 5.2 25.5 8.686 21.48 9.887 20.452 C 11 19.5 12.25 19.5 12.25 19.5 C 12.25 19.5 13.5 19.5 14.613 20.452 Z"
            className="loader__sand-mound-bottom"
          ></path>
        </clipPath>
        <g transform="translate(2,2)">
          <g
            transform="rotate(-90,26,26)"
            strokeLinecap="round"
            strokeDashoffset="153.94"
            strokeDasharray="153.94 153.94"
            stroke="hsl(0,0%,100%)"
            fill="none"
          >
            <circle
              transform="rotate(0,26,26)"
              r="24.5"
              cy="26"
              cx="26"
              strokeWidth="2.5"
              className="loader__motion-thick"
            ></circle>
            <circle
              transform="rotate(90,26,26)"
              r="24.5"
              cy="26"
              cx="26"
              strokeWidth="1.75"
              className="loader__motion-medium"
            ></circle>
            <circle
              transform="rotate(180,26,26)"
              r="24.5"
              cy="26"
              cx="26"
              strokeWidth="1"
              className="loader__motion-thin"
            ></circle>
          </g>
          <g transform="translate(13.75,9.25)" className="loader__model">
            <path
              d="M 1.5 2 L 23 2 C 23 2 22.5 8.5 19 12 C 16 15.5 13.5 13.5 13.5 16.75 C 13.5 20 16 18 19 21.5 C 22.5 25 23 31.5 23 31.5 L 1.5 31.5 C 1.5 31.5 2 25 5.5 21.5 C 8.5 18 11 20 11 16.75 C 11 13.5 8.5 15.5 5.5 12 C 2 8.5 1.5 2 1.5 2 Z"
              fill="hsl(var(--hue, 28),90%,85%)"
            ></path>
            <g strokeLinecap="round" stroke="hsl(35,90%,90%)">
              <line
                y2="20.75"
                x2="12"
                y1="15.75"
                x1="12"
                strokeDasharray="0.25 33.75"
                strokeWidth="1"
                className="loader__sand-grain-left"
              ></line>
              <line
                y2="21.75"
                x2="12.5"
                y1="16.75"
                x1="12.5"
                strokeDasharray="0.25 33.75"
                strokeWidth="1"
                className="loader__sand-grain-right"
              ></line>
              <line
                y2="31.5"
                x2="12.25"
                y1="18"
                x1="12.25"
                strokeDasharray="0.5 107.5"
                strokeWidth="1"
                className="loader__sand-drop"
              ></line>
              <line
                y2="31.5"
                x2="12.25"
                y1="14.75"
                x1="12.25"
                strokeDasharray="54 54"
                strokeWidth="1.5"
                className="loader__sand-fill"
              ></line>
              <line
                y2="31.5"
                x2="12"
                y1="16"
                x1="12"
                strokeDasharray="1 107"
                strokeWidth="1"
                stroke="hsl(35,90%,83%)"
                className="loader__sand-line-left"
              ></line>
              <line
                y2="31.5"
                x2="12.5"
                y1="16"
                x1="12.5"
                strokeDasharray="12 96"
                strokeWidth="1"
                stroke="hsl(35,90%,83%)"
                className="loader__sand-line-right"
              ></line>
              <g strokeWidth="0" fill="hsl(35,90%,90%)">
                <path
                  d="M 12.25 15 L 15.392 13.486 C 21.737 11.168 22.5 2 22.5 2 L 2 2.013 C 2 2.013 2.753 11.046 9.009 13.438 L 12.25 15 Z"
                  clipPath="url(#sand-mound-top)"
                ></path>
                <path
                  d="M 12.25 18.5 L 15.392 20.014 C 21.737 22.332 22.5 31.5 22.5 31.5 L 2 31.487 C 2 31.487 2.753 22.454 9.009 20.062 Z"
                  clipPath="url(#sand-mound-bottom)"
                ></path>
              </g>
            </g>
            <g strokeWidth="2" strokeLinecap="round" opacity="0.7" fill="none">
              <path
                d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
                stroke="hsl(0,0%,100%)"
                className="loader__glare-top"
              ></path>
              <path
                transform="rotate(180,12.25,16.75)"
                d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
                stroke="hsla(0,0%,100%,0)"
                className="loader__glare-bottom"
              ></path>
            </g>
            <rect height="2" width="24.5" fill="hsl(var(--hue, 28),90%,50%)"></rect>
            <rect
              height="1"
              width="19.5"
              y="0.5"
              x="2.5"
              ry="0.5"
              rx="0.5"
              fill="hsl(var(--hue, 28),90%,57.5%)"
            ></rect>
            <rect
              height="2"
              width="24.5"
              y="31.5"
              fill="hsl(var(--hue, 28),90%,50%)"
            ></rect>
            <rect
              height="1"
              width="19.5"
              y="32"
              x="2.5"
              ry="0.5"
              rx="0.5"
              fill="hsl(var(--hue, 28),90%,57.5%)"
            ></rect>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default function App() {
  const [isLight, setIsLight] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLight]);

  const themeColors = useMemo(() => ({
    text: isLight ? 'text-neutral-900' : 'text-neutral-100',
    textMuted: isLight ? 'text-neutral-600' : 'text-neutral-400',
    accent: isLight ? 'text-orange-600' : 'text-orange-400',
    accentBg: isLight ? 'bg-orange-600' : 'bg-orange-500',
  }), [isLight]);

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500/30 ${themeColors.text}`}>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100]"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <GridBackground isLight={isLight} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-serif italic font-bold tracking-tighter"
          >
            JG<span className="text-orange-500">.</span>
          </motion.div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-widest opacity-70">
              <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
              <a href="#skills" className="hover:text-orange-500 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
            </div>

            <button
              onClick={() => setIsLight(!isLight)}
              className="p-2 rounded-full glass-card hover:bg-orange-500/20 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <section id="about" className="mb-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Available for Work
                </div>
                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter">
                  Jack <br />
                  <span className="text-orange-500">Gilbert J.</span>
                </h1>
                <p className={`text-xl ${themeColors.textMuted} max-w-lg mb-10 leading-relaxed`}>
                  Computer Science Engineer specializing in <span className="text-orange-500 font-medium italic">Data Science</span> and <span className="text-orange-500 font-medium italic">Machine Learning</span>. Crafting intelligent solutions from Krishnagiri, India.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:jackgilbertj30@gmail.com"
                    className={`${themeColors.accentBg} text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-orange-500/20`}
                  >
                    <Mail className="w-5 h-5" /> Hire Me
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Jack_Gilbert_Resume.pdf"
                    className="glass-card border border-orange-500/30 text-orange-500 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-500/10 hover:scale-105 transition-all duration-300"
                  >
                    <FileDown className="w-5 h-5" /> Resume
                  </a>
                  <div className="flex gap-2">
                    {[
                      { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/jack-gilbert-j-65b72a3b5" },
                      { icon: <Github className="w-5 h-5" />, href: "https://github.com/URK21CS3034JACK" }
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:bg-orange-500/10 transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 shadow-2xl">
                  <img
                    src="/Passport_Photograph.jpg"
                    alt="Jack Gilbert J"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      // Fallback if the specific image isn't available
                      (e.target as HTMLImageElement).src = "https://picsum.photos/seed/professional/800/1000";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-orange-500/30 rounded-tr-[3rem]" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-orange-500/30 rounded-bl-[3rem]" />
              </motion.div>
            </div>
          </section>

          {/* Stats/Contact Info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { icon: <Phone />, label: "Call Me", value: "+91 6369912630" },
              { icon: <MapPin />, label: "Location", value: "Hosur, India" },
              { icon: <Award />, label: "Experience", value: "2021 - 2025 (B.Tech)" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl flex items-center gap-6"
              >
                <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-500">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-50 font-bold mb-1">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Skills Section */}
          <section id="skills" className="mb-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">Expertise</h2>
                <h3 className="text-5xl font-serif font-bold tracking-tight">Technical Skills</h3>
              </div>
              <p className={`${themeColors.textMuted} max-w-md text-right`}>
                A diverse toolkit focused on data processing, machine learning, and modern development environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((group, i) => (
                <SkillCard key={group.category} group={group} index={i} />
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">Portfolio</h2>
                <h3 className="text-5xl font-serif font-bold tracking-tight">Major Projects</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-10 rounded-[2.5rem] group hover:bg-orange-500/5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-sm font-mono text-orange-500 font-bold">{project.date}</span>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold mb-6 tracking-tight group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-4">
                    {project.description.map((item, idx) => (
                      <li key={idx} className={`flex gap-3 text-sm leading-relaxed ${themeColors.textMuted}`}>
                        <ChevronRight className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Certifications & Education */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-serif font-bold mb-10 flex items-center gap-4">
                <Award className="text-orange-500" /> Certifications
              </h3>
              <div className="space-y-6">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl glass-card items-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-lg">{cert.title}</h4>
                        <span className="text-xs font-mono opacity-50">{cert.date}</span>
                      </div>
                      <p className="text-orange-500 text-sm font-medium mb-2">{cert.issuer}</p>
                      <p className={`text-sm ${themeColors.textMuted}`}>{cert.description[0]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold mb-10">Education</h3>
              <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Award className="w-20 h-20" />
                </div>
                <p className="text-orange-500 font-bold text-sm mb-2">2021 — 2025</p>
                <h4 className="text-xl font-bold mb-4 leading-tight">B.Tech in Computer Science Engineering</h4>
                <p className={themeColors.textMuted}>Karunya Institute Of Technology and Science</p>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">Location</p>
                  <p className="font-medium">Coimbatore, India</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-20 border-t border-white/10 text-center">
            <h2 className="text-4xl font-serif font-bold mb-8 italic">Let's build something <span className="text-orange-500">great</span> together.</h2>
            <div className="flex justify-center gap-6 mb-12">
              <a href="mailto:jackgilbertj30@gmail.com" className="hover:text-orange-500 transition-colors">Email</a>
              <a href="https://linkedin.com/in/jack-gilbert-j-65b72a3b5" className="hover:text-orange-500 transition-colors">LinkedIn</a>
              <a href="https://github.com/URK21CS3034JACK" className="hover:text-orange-500 transition-colors">GitHub</a>
            </div>
            <p className="text-xs uppercase tracking-[0.5em] opacity-30 font-bold">
              &copy; 2025 Jack Gilbert J. All Rights Reserved.
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}
