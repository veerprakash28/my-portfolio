import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Send,
  Mail,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  CheckCircle
} from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { TitleRotator } from "./TitleRotater";

// 3D Parallax Starfield Background Canvas
const StarfieldCanvas: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Star {
      x: number;
      y: number;
      z: number;
      color: string;
      size: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 2.5 + 0.5;
        this.color = Math.random() > 0.55 ? "#3b82f6" : "#14b8a6";
      }

      update(speed: number) {
        this.z -= speed;
        if (this.z <= 0) {
          this.x = (Math.random() - 0.5) * 2000;
          this.y = (Math.random() - 0.5) * 2000;
          this.z = 2000;
        }
      }

      draw(context: CanvasRenderingContext2D, w: number, h: number, mx: number, my: number) {
        const fov = 350;
        const px = this.x + mx * (2000 - this.z) * 0.04;
        const py = this.y + my * (2000 - this.z) * 0.04;

        const xProjected = (px / this.z) * fov + w / 2;
        const yProjected = (py / this.z) * fov + h / 2;

        if (xProjected < 0 || xProjected > w || yProjected < 0 || yProjected > h) {
          return;
        }

        const sizeProjected = (fov / this.z) * this.size;
        const alpha = Math.max(0, Math.min(1, 1 - this.z / 2000));

        context.beginPath();
        context.arc(xProjected, yProjected, sizeProjected, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.globalAlpha = alpha * 0.45;
        context.fill();
      }
    }

    const stars: Star[] = Array.from({ length: 180 }, () => new Star());

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const speed = 2 + scrollProgress * 0.35;

      stars.forEach((star) => {
        star.update(speed);
        star.draw(ctx, width, height, mouseRef.current.x, mouseRef.current.y);
      });

      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent opacity-0 dark:opacity-100 transition-opacity duration-300"
    />
  );
};

export const StorytellingCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [scrollerEl, setScrollerEl] = useState<Element | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailto = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailto;
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const getCompanyHeaderName = (company: string) => {
    // Use full company name from portfolio data, uppercased
    return company.toUpperCase();
  };

  const sortedExperience = [...portfolioData.experience];

  // Tech Stack categories helper
  const techCategories = [
    { name: "Frontend", techs: portfolioData.techStack.frontend, color: "blue" },
    { name: "Backend", techs: portfolioData.techStack.backend, color: "teal" },
    { name: "Mobile", techs: portfolioData.techStack.mobile, color: "orange" },
    { name: "Database", techs: portfolioData.techStack.database, color: "purple" },
    { name: "Cloud & DevOps", techs: portfolioData.techStack.cloud, color: "green" },
    { name: "Tools & Design", techs: portfolioData.techStack.tools, color: "pink" },
    { name: "AI & ML", techs: portfolioData.techStack.aiml, color: "yellow" },
  ];

  const getTechColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
      orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
      yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    };
    return colors[color] || colors.blue;
  };

  // Poll for parent scroll container (.browser-content) to finish mounting
  useEffect(() => {
    let active = true;
    const findScroller = () => {
      const el = document.querySelector(".browser-content");
      if (el) {
        if (active) setScrollerEl(el);
      } else {
        setTimeout(findScroller, 50);
      }
    };
    findScroller();
    return () => {
      active = false;
    };
  }, []);

  // Update viewport dimensions on resize
  useEffect(() => {
    if (!scrollerEl) return;
    const handleResize = () => {
      setViewportWidth(scrollerEl.clientWidth);
      setViewportHeight((scrollerEl as HTMLElement).clientHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollerEl]);

  // Translate the horizontal track based on vertical scroll of `.browser-content`
  useEffect(() => {
    if (!scrollerEl || !trackRef.current) return;

    const handleScroll = () => {
      const scrollTop = scrollerEl.scrollTop;
      const maxScroll = scrollerEl.scrollHeight - scrollerEl.clientHeight;
      if (maxScroll <= 0) return;

      const progress = scrollTop / maxScroll;
      setScrollProgress(progress * 100);

      const track = trackRef.current;
      if (track) {
        const translateAmt = -progress * (track.scrollWidth - scrollerEl.clientWidth);
        gsap.to(track, {
          x: translateAmt,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    scrollerEl.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollerEl.removeEventListener("scroll", handleScroll);
  }, [scrollerEl, viewportWidth]);

  const isMobile = viewportWidth < 768;

  // ── MOBILE LAYOUT (vertical, no GSAP) ──────────────────────────────────────
  if (isMobile) {
    return (
      <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">

        {/* ─── HERO ─── */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-5 py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none" />
          <div className="relative z-10 w-full max-w-lg mx-auto text-center space-y-8">
            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500/20">
                <img
                  src={portfolioData.personal.image}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name + titles */}
            <div className="space-y-3">
              <p className="text-blue-600 dark:text-blue-400 font-medium text-base">Hello, I'm</p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {portfolioData.personal.name.split(" ").map((w, i) => (
                  <span key={i} className={`block ${i === 1 ? "shimmer-gradient" : ""}`}>{w}</span>
                ))}
              </h1>
              <TitleRotator titles={portfolioData.personal.title} />
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {portfolioData.personal.tagline}
              </p>
            </div>

            {/* Quick info */}
            <div className="flex flex-col items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-500" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-500" />
                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-blue-600 transition-colors">
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="relative px-5 py-16 space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              About <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {portfolioData.about.description}
            </p>
          </div>

          <div className="space-y-3">
            {portfolioData.about.highlights.map((hl, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{hl}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {[
              { val: "30+", label: "Projects", color: "text-blue-600 dark:text-blue-400" },
              { val: portfolioData.about.totalExperience, label: "Yrs Exp", color: "text-teal-600 dark:text-teal-400" },
              { val: "15+", label: "Clients", color: "text-orange-600 dark:text-orange-400" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section id="experience" className="relative px-5 py-16 space-y-8 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              My <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">A timeline of my professional growth and key achievements</p>
          </div>

          <div className="space-y-5">
            {sortedExperience.map((exp) => (
              <div key={exp.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                  <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    {exp.company.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    {exp.period.split(" ").slice(-1)[0]}
                  </span>
                </div>

                <h4 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                  {exp.roles ? exp.roles[0].title : exp.title}
                </h4>

                <div className="flex flex-wrap gap-3 mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1"><Calendar size={11} /><span>{exp.period}</span></div>
                  <div className="flex items-center gap-1"><MapPin size={11} /><span>{exp.location}</span></div>
                </div>

                {!exp.roles && exp.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">{exp.description}</p>
                )}

                {exp.roles && (
                  <div className="mt-3 space-y-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                    {exp.roles.map((role: { title: string; period: string; description: string }, rIdx: number) => (
                      <div key={rIdx} className="relative">
                        <div className="absolute -left-[15px] top-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{role.title}</p>
                        <p className="text-[10px] text-gray-400">{role.period}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{role.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1.5">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2">
                      <span className="text-[9px] font-mono font-bold text-gray-400 mt-0.5 flex-shrink-0">[0{aIdx + 1}]</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="work" className="relative px-5 py-16 space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Featured <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">A showcase of my recent projects and creative solutions.</p>
          </div>

          <div className="space-y-6">
            {portfolioData.projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md">
                <div className="relative h-44 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-medium rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <ExternalLink size={13} /> Live Demo
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:underline">
                      <Github size={13} /> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TECH STACK ─── */}
        <section id="tech" className="relative px-5 py-16 space-y-8 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Tech <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Technologies and tools I use to bring ideas to life.</p>
          </div>

          <div className="space-y-4">
            {techCategories.map((cat) => (
              <div key={cat.name} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.techs.map((tech, i) => (
                    <span key={i} className={`px-2.5 py-1 border text-[10px] font-medium rounded-md ${getTechColorClasses(cat.color)}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="relative px-5 py-16 space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Get In <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Let's work together. Drop me a message!</p>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email</div>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-xs font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Location</div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">{portfolioData.personal.location}</p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex gap-3 pt-2">
            {[
              { name: "GitHub", icon: Github, url: portfolioData.social.github },
              { name: "LinkedIn", icon: Linkedin, url: portfolioData.social.linkedin },
              { name: "YouTube", icon: Youtube, url: portfolioData.social.youtube },
              { name: "Instagram", icon: Instagram, url: portfolioData.social.instagram },
            ].map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all shadow-sm">
                <s.icon size={18} />
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-md">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your name"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="you@email.com"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="What's this about?"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} placeholder="Tell me about your project or just say hello!"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  // ── DESKTOP LAYOUT (horizontal GSAP scroll) ────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="story-scroll-container h-[750vh] w-full relative bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Scroll targets for tabs navigation & IntersectionObserver */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div id="hero" className="absolute top-[0%] h-10 w-full"></div>
        <div id="about" className="absolute top-[16.4%] h-10 w-full"></div>
        <div id="experience" className="absolute top-[32.8%] h-10 w-full"></div>
        <div id="work" className="absolute top-[57.4%] h-10 w-full"></div>
        <div id="tech" className="absolute top-[82%] h-10 w-full"></div>
        <div id="contact" className="absolute top-[95%] h-10 w-full"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none"></div>

      {/* Dynamic 3D constellation field */}
      <StarfieldCanvas scrollProgress={scrollProgress} />

      {/* STICKY MAIN VIEWPORT — height is set to the exact browser-content client height
           so the sticky element never lifts off before scroll reaches maximum */}
      <div
        className="story-sticky-viewport sticky top-0 min-h-[550px] w-full overflow-hidden"
        style={{ height: viewportHeight }}
      >

        {/* HORIZONTAL TRACK */}
        <div
          ref={trackRef}
          className="horizontal-track flex flex-row h-full w-max items-stretch"
        >

          {/* ---------------- SECTION 1: HERO ---------------- */}
          <div
            className="h-full flex-shrink-0 flex items-center justify-center relative"
            style={{ width: viewportWidth }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Content */}
              <div className="space-y-8 lg:order-1 order-2 text-left">
                <div className="space-y-4">
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                    Hello, I'm
                  </p>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                    {portfolioData.personal.name.split(" ").map((word, index) => (
                      <span
                        key={index}
                        className={`block ${index === 1 ? "shimmer-gradient" : ""}`}
                      >
                        {word}
                      </span>
                    ))}
                  </h1>
                  <TitleRotator titles={portfolioData.personal.title} />
                  <p className="text-lg text-gray-550 dark:text-gray-400 max-w-2xl leading-relaxed">
                    {portfolioData.personal.tagline}
                  </p>
                </div>

                {/* Quick Contact Info */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-750 dark:text-gray-300 font-semibold">{portfolioData.personal.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-gray-750 dark:text-gray-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                {/* Removed scroll helper */}
              </div>

              {/* Image Container */}
              <div className="lg:order-2 order-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70"></div>
                  <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-70"></div>

                  <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                      src={portfolioData.personal.image}
                      alt={portfolioData.personal.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
                  </div>

                  {/* Floating badge */}
                  <div
                    onClick={() => {
                      const el = document.querySelector("#contact");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cursor-pointer absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 z-20 transition-all duration-200 hover:scale-105"
                  >
                    <p className="text-sm font-semibold whitespace-nowrap">
                      Let's Connect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- SECTION 2: ABOUT ME ---------------- */}
          <div
            className="h-full flex-shrink-0 flex items-center justify-center relative px-12 md:px-24"
            style={{ width: viewportWidth }}
          >
            <div className="w-full grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 py-6">

              {/* Description & Stats Column */}
              <div className="md:col-span-7 space-y-8 text-left">
                <div className="space-y-4">
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    About
                    <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Me</span>
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                    {portfolioData.about.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  {portfolioData.about.highlights.map((hl, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={18} />
                      <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Block */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-blue-655 dark:text-blue-400">30+</div>
                    <div className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-1">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400">{portfolioData.about.totalExperience}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">15+</div>
                    <div className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-1">Happy Clients</div>
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="md:col-span-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-xl font-mono text-sm text-left w-full max-w-[420px] mx-auto relative overflow-hidden text-gray-750 dark:text-gray-355">
                {/* Top title buttons */}
                <div className="flex items-center space-x-2 mb-4 select-none">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">const</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">developer = {"{"}</span>
                  </div>
                  <div className="pl-6 space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 dark:text-gray-400">name:</span>{" "}
                      <span className="text-green-600 dark:text-green-400 ml-2">'{portfolioData.personal.name}'</span>
                    </div>
                    <div className="flex flex-wrap">
                      <span className="text-gray-600 dark:text-gray-400">skills:</span>{" "}
                      <span className="text-green-600 dark:text-green-400 ml-2">
                        ['Javascript', 'MEARN', 'Python', 'CICD', 'Design']
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 dark:text-gray-400">passion:</span>{" "}
                      <span className="text-green-600 dark:text-green-400 ml-2">'Creating amazing experiences'</span>
                    </div>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">{"}"}</div>
                </div>

                {/* Decorative glows */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl"></div>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 3: EXPERIENCE (Horizontal timeline in main track) ---------------- */}
          <div className="h-full flex-shrink-0 flex items-center px-12 md:px-24">
            <div className="flex items-center gap-16">

              {/* Intro panel */}
              <div className="w-24 md:w-32 h-[350px] flex-shrink-0 relative select-none">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transform -rotate-90 origin-center whitespace-nowrap">
                  <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 dark:text-white leading-none">
                    My<span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Journey</span>
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-none">
                    A timeline of my professional growth and key achievements
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                </div>
              </div>

              {/* Experience cards */}
              {sortedExperience.map((exp) => (
                <div
                  key={exp.id}
                  className="w-[85vw] max-w-[450px] md:w-[500px] flex-shrink-0"
                >
                  <div className="h-[52vh] min-h-[420px] max-h-[480px] flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                    <div>
                      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3 mb-4 font-mono text-xs select-none">
                        <span className="text-gray-400 dark:text-gray-555 font-bold uppercase tracking-wider">
                          {getCompanyHeaderName(exp.company)}
                        </span>
                        <span className="text-teal-600 dark:text-teal-400 font-bold">
                          {exp.period.split(" ").slice(-1)[0]}
                        </span>
                      </div>

                      <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                        {exp.roles ? exp.roles[0].title : exp.title}
                      </h4>

                      {/* Metadata strip */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mt-3 text-xs font-mono text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Single role overview */}
                      {!exp.roles && exp.description && (
                        <p className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed mt-4">
                          {exp.description}
                        </p>
                      )}

                      {/* Nested multi-roles */}
                      {exp.roles && (
                        <div className="mt-4 space-y-3.5 pl-3.5 border-l border-gray-200 dark:border-gray-800 ml-1">
                          {exp.roles.map((role: { title: string; period: string; description: string }, rIdx: number) => (
                            <div key={rIdx} className="relative">
                              <div className="absolute -left-[18.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{role.title}</h5>
                                <span className="text-[9px] font-mono text-gray-400 dark:text-gray-550 sm:ml-2">{role.period}</span>
                              </div>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{role.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Achievements items */}
                    <div className="border-t border-gray-100 dark:border-gray-800/80 pt-3.5 mt-3.5 overflow-y-auto max-h-[140px] scrollbar-none relative z-10">
                      <div className="space-y-2.5">
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2.5">
                            <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-gray-500 mt-0.5 select-none">
                              {`[0${aIdx + 1}]`}
                            </span>
                            <span className="text-xs text-gray-650 dark:text-gray-300 leading-relaxed">
                              {ach}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Download Resume Card */}
              <div className="w-[80vw] max-w-[320px] md:w-[360px] flex-shrink-0">
                <div className="h-[52vh] min-h-[420px] max-h-[480px] flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-600 text-white shadow-xl relative overflow-hidden select-none">
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

                  <div>
                    <span className="text-xs font-mono font-bold text-blue-100 uppercase tracking-widest">
                      RESUME
                    </span>
                    <h3 className="text-2xl font-black leading-tight mt-6">
                      Want to know more?
                    </h3>
                    <p className="text-xs text-blue-100 mt-3 leading-relaxed">
                      Download my full PDF resume containing detailed summaries, academics, and project highlights.
                    </p>
                  </div>

                  <button
                    onClick={() => window.open("/Resume.pdf", "_blank")}
                    className="w-full bg-white text-blue-600 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md active:scale-97"
                  >
                    <ExternalLink size={15} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 4: PROJECTS (Horizontal slider in main track) ---------------- */}
          <div className="h-full flex-shrink-0 flex items-center px-12 md:px-24">
            <div className="flex items-center gap-16">

              {/* Intro panel */}
              <div className="w-24 md:w-32 h-[350px] flex-shrink-0 relative select-none">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transform -rotate-90 origin-center whitespace-nowrap">
                  <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 dark:text-white leading-none">
                    Featured<span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Work</span>
                  </h2>
                  <p className="text-xs text-gray-550 dark:text-gray-400 font-sans leading-none">
                    A showcase of my recent projects and creative solutions.
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
                </div>
              </div>

              {/* Project cards */}
              {portfolioData.projects.map((project) => (
                <div
                  key={project.id}
                  className="w-[85vw] max-w-[450px] md:w-[500px] flex-shrink-0"
                >
                  <div className="h-[52vh] min-h-[420px] max-h-[480px] flex flex-col justify-between bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 group relative">

                    {/* Project Image */}
                    <div className="relative overflow-hidden h-48 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-555"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Overlay buttons */}
                      <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:scale-110 transform"
                        >
                          <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:scale-110 transform"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-4 space-y-3.5">
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center space-x-4 border-t border-gray-100 dark:border-gray-800 pt-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-650 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm transition-colors duration-200"
                          >
                            <Github size={16} />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* View GitHub Archive Card */}
              <div className="w-[80vw] max-w-[320px] md:w-[360px] flex-shrink-0">
                <div className="h-[52vh] min-h-[420px] max-h-[480px] flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl relative overflow-hidden select-none border border-gray-850 dark:border-gray-150">
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest">
                      {`// ARCHIVE`}
                    </span>
                    <h3 className="text-2xl font-black leading-tight mt-6">
                      Want to see more?
                    </h3>
                    <p className="text-xs text-gray-450 dark:text-gray-400 mt-3 leading-relaxed">
                      Explore my complete code history, design systems, and minor utility packages on GitHub.
                    </p>
                  </div>

                  <a
                    href={portfolioData.social.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white dark:bg-gray-900 dark:text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md active:scale-97"
                  >
                    <Github size={16} />
                    <span>All Repositories</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 5: TECH STACK (Horizontal wrap in main track) ---------------- */}
          <div className="h-full flex-shrink-0 flex items-center px-12 md:px-24">
            <div className="flex items-center gap-16">

              {/* Intro panel */}
              <div className="w-24 md:w-32 h-[350px] flex-shrink-0 relative select-none">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transform -rotate-90 origin-center whitespace-nowrap">
                  <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 dark:text-white leading-none">
                    Tech<span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Stack</span>
                  </h2>
                  <p className="text-xs text-gray-550 dark:text-gray-400 font-sans leading-none">
                    Technologies and tools I use to bring ideas to life.
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                </div>
              </div>

              {/* Horizontal 2-Row Wrapped Categories Grid */}
              <div className="flex flex-col flex-wrap gap-6 h-[480px] w-max justify-center items-start">
                {techCategories.map((category) => (
                  <div
                    key={category.name}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all duration-300 w-[300px] sm:w-[320px] flex-shrink-0"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-3 py-1 border text-xs font-medium rounded-lg transition-colors cursor-default ${getTechColorClasses(category.color)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 6: CONTACT & FOOTER ---------------- */}
          <div
            className="h-full flex-shrink-0 flex items-center justify-center relative px-12 md:px-24"
            style={{ width: viewportWidth }}
          >
            <div className="w-full grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 py-6">

              {/* Direct message text column */}
              <div className="md:col-span-5 space-y-6 text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 font-sans leading-tight">
                  Get In
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Touch</span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Let's work together to bring your ideas to life. I'm always excited to discuss new opportunities. Drop me a message and I'll get back to you as soon as possible.
                </p>

                {/* Monospace contact info cards */}
                <div className="space-y-4 pt-6 text-xs font-mono text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Email</div>
                      <a href={`mailto:${portfolioData.personal.email}`} className="text-gray-950 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs">
                        {portfolioData.personal.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-550 font-bold uppercase tracking-wider">Location</div>
                      <p className="text-gray-950 dark:text-white font-semibold text-xs">{portfolioData.personal.location}</p>
                    </div>
                  </div>
                </div>

                {/* Social links block */}
                <div className="flex gap-3 pt-2">
                  {[
                    { name: "GitHub", icon: Github, url: portfolioData.social.github },
                    { name: "LinkedIn", icon: Linkedin, url: portfolioData.social.linkedin },
                    { name: "YouTube", icon: Youtube, url: portfolioData.social.youtube },
                    { name: "Instagram", icon: Instagram, url: portfolioData.social.instagram },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-650 dark:text-gray-450 hover:text-gray-950 dark:hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                      title={s.name}
                    >
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* High-Fidelity Contact Form */}
              <div className="md:col-span-7 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or just say hello!"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
