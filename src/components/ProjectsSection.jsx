import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ExternalLink, Github, Layers, ArrowUpRight, Cpu, BarChart3, Database, Globe, Compass } from 'lucide-react'

/**
 * ============================================================================
 * DATA PROYEK (PROJECTS_DATA)
 * Terinspirasi dari katalog galeri helm landonorris.com
 * ============================================================================
 */
export const PROJECTS_DATA = [
  {
    id: 'traffic-detector',
    title: 'Real-Time Traffic Intersection Detection API',
    badge: 'TRAFFIC DETECTOR 2026',
    year: '2026',
    category: 'Computer Vision & Edge API',
    icon: Cpu,
    stats: '60 FPS Stream • <18ms Inference',
    description: 'High-throughput computer vision pipeline processing multi-lane urban intersection video feeds with real-time vehicle classification, speed estimation, and traffic density telemetry.',
    tags: ['FastAPI', 'YOLOv8', 'OpenCV', 'WebSockets', 'Docker', 'Python'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: true,
    visualType: 'vision',
  },
  {
    id: 'maven-analytics',
    title: 'Maven Roaster Coffee Analytics & Pitch Deck',
    badge: 'MAVEN ANALYTICS 2026',
    year: '2026',
    category: 'Business Intelligence & Data Science',
    icon: BarChart3,
    stats: '124K Transactions • +18% Revenue Yield',
    description: 'Comprehensive retail intelligence platform evaluating customer cohort retention, beverage SKU profitability, and supply-chain forecasting with interactive executive dashboards.',
    tags: ['Python', 'Pandas', 'Tableau', 'SQL', 'Scikit-Learn', 'Excel'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false,
    visualType: 'analytics',
  },
  {
    id: 'superstore-bi',
    title: 'Superstore Sales Visualization Dashboard',
    badge: 'SUPERSTORE BI 2026',
    year: '2026',
    category: 'Enterprise Telemetry & BI',
    icon: Database,
    stats: '50+ Key KPIs • Multi-Region Mapping',
    description: 'Executive geospatial business intelligence portal analyzing logistics bottlenecks, regional profit margin anomalies, and product segment shipping fulfillment times.',
    tags: ['Pandas', 'Seaborn', 'Tableau', 'PostgreSQL', 'PowerBI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false,
    visualType: 'geo',
  },
  {
    id: 'portfolio-site',
    title: 'Personal Interactive Portfolio Site',
    badge: 'PORTFOLIO SITE 2026',
    year: '2026',
    category: 'Frontend Engineering & Motion',
    icon: Globe,
    stats: '100 Lighthouse • 60 FPS Spring Lerp',
    description: 'High-performance digital engineering showcase inspired by modern motorsport aerodynamics, featuring customized spring physics cursor and seamless scroll color transitions.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Three.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: true,
    visualType: 'portfolio',
  },
  {
    id: 'task-orchestrator',
    title: 'Distributed Async Task Orchestrator',
    badge: 'TASK ORCHESTRATOR 2025',
    year: '2025',
    category: 'Distributed Systems & Backend',
    icon: Layers,
    stats: '10K req/sec • Sub-ms Queue Dispatch',
    description: 'Fault-tolerant distributed task worker engine providing priority queueing, dead-letter redrive, automated worker backpressure, and live telemetry WebSocket broadcasting.',
    tags: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false,
    visualType: 'backend',
  },
  {
    id: 'drone-telemetry',
    title: 'Autonomous Drone Flight Telemetry Visualizer',
    badge: 'AERO TELEMETRY 2025',
    year: '2025',
    category: 'Real-Time Telemetry & WebGL',
    icon: Compass,
    stats: 'MQTT Pub/Sub • 3D Spatial Vectoring',
    description: 'Real-time telemetry ground control station rendering 3D drone spatial attitude (pitch/roll/yaw), battery consumption gradient, and automated waypoint tracking coordinates.',
    tags: ['Node.js', 'Three.js', 'MQTT', 'WebSockets', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false,
    visualType: 'drone',
  },
]

/**
 * Procedural Dynamic Project Graphic Mockup
 * Renders stylized motorsport / cyber-architecture visual accents
 */
function ProjectVisual({ type, title }) {
  switch (type) {
    case 'vision':
      return (
        <svg className="w-full h-full text-neutral-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#0d0d0d" />
          {/* Subtle Grid */}
          <path d="M0 60 H400 M0 120 H400 M0 180 H400 M80 0 V240 M160 0 V240 M240 0 V240 M320 0 V240" stroke="#1c1c1c" strokeWidth="1" />
          {/* Camera Crosshair */}
          <circle cx="200" cy="120" r="48" stroke="#00ff9d" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="200" cy="120" r="3" fill="#00ff9d" />
          {/* YOLO Bounding Box */}
          <rect x="120" y="70" width="160" height="100" stroke="#00ff9d" strokeWidth="1.8" fill="rgba(0,255,157,0.06)" />
          {/* Bounding Box Corner Accents */}
          <path d="M115 80 V65 H130 M265 65 H285 V80 M115 160 V175 H130 M265 175 H285 V160" stroke="#00ff9d" strokeWidth="2.5" />
          {/* HUD Target Tag */}
          <rect x="120" y="52" width="95" height="18" fill="#00ff9d" />
          <text x="125" y="65" fill="#0a0a0a" fontSize="10" fontFamily="monospace" fontWeight="900">VEHICLE // 98.4%</text>
          {/* FPS & Telemetry */}
          <text x="20" y="32" fill="#666" fontSize="10" fontFamily="monospace">CAM_01 // 1920x1080 @ 60FPS</text>
          <text x="20" y="220" fill="#00ff9d" fontSize="10" fontFamily="monospace">INFERENCE: 14.8ms [YOLOv8x]</text>
        </svg>
      )

    case 'analytics':
      return (
        <svg className="w-full h-full text-neutral-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#0d0d0d" />
          {/* Grid lines */}
          <path d="M40 40 H360 M40 90 H360 M40 140 H360 M40 190 H360" stroke="#1c1c1c" strokeWidth="1" />
          {/* Stylized Bar Charts */}
          <rect x="60" y="120" width="22" height="70" fill="#222" rx="2" />
          <rect x="100" y="90" width="22" height="100" fill="#222" rx="2" />
          <rect x="140" y="110" width="22" height="80" fill="#222" rx="2" />
          <rect x="180" y="65" width="22" height="125" fill="#00ff9d" rx="2" opacity="0.85" />
          <rect x="220" y="80" width="22" height="110" fill="#222" rx="2" />
          <rect x="260" y="50" width="22" height="140" fill="#00ff9d" rx="2" />
          <rect x="300" y="95" width="22" height="95" fill="#222" rx="2" />
          {/* Trend Polyline */}
          <path d="M71 115 L111 85 L151 105 L191 60 L231 75 L271 45 L311 90" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
          <circle cx="271" cy="45" r="4" fill="#00ff9d" />
          <text x="40" y="28" fill="#666" fontSize="10" fontFamily="monospace">REVENUE COHORT INDEX // +18.2%</text>
        </svg>
      )

    case 'geo':
      return (
        <svg className="w-full h-full text-neutral-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#0d0d0d" />
          {/* World/Regional Contour Vector */}
          <path d="M 60 120 Q 120 70 180 110 T 320 80 T 370 140" stroke="#252525" strokeWidth="3" fill="none" />
          <path d="M 80 160 Q 140 120 220 170 T 340 150" stroke="#1f1f1f" strokeWidth="2.5" fill="none" />
          {/* Geospatial Radar Nodes */}
          <circle cx="140" cy="95" r="16" stroke="#00ff9d" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <circle cx="140" cy="95" r="4" fill="#00ff9d" />
          <circle cx="270" cy="120" r="24" stroke="#00ff9d" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          <circle cx="270" cy="120" r="5" fill="#00ff9d" />
          <line x1="140" y1="95" x2="270" y2="120" stroke="#00ff9d" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          {/* KPI Card Tag */}
          <rect x="250" y="30" width="115" height="34" fill="#141414" stroke="#333" rx="4" />
          <text x="260" y="45" fill="#888" fontSize="8" fontFamily="monospace">PROFIT MARGIN</text>
          <text x="260" y="58" fill="#00ff9d" fontSize="11" fontFamily="monospace" fontWeight="900">34.8% // PEAK</text>
        </svg>
      )

    case 'portfolio':
      return (
        <svg className="w-full h-full text-neutral-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#0d0d0d" />
          {/* Minimalist Browser Frame */}
          <rect x="30" y="30" width="340" height="180" rx="8" fill="#121212" stroke="#252525" strokeWidth="1.2" />
          <circle cx="48" cy="45" r="3.5" fill="#333" />
          <circle cx="60" cy="45" r="3.5" fill="#333" />
          <circle cx="72" cy="45" r="3.5" fill="#333" />
          <line x1="30" y1="58" x2="370" y2="58" stroke="#222" strokeWidth="1" />
          {/* Stylized Silhouette & Typography */}
          <text x="50" y="110" fill="#262626" fontSize="32" fontFamily="sans-serif" fontWeight="900" letterSpacing="-0.04em">HASSYA</text>
          <path d="M 230 180 C 240 120 270 100 290 120 C 310 100 340 120 350 180 Z" fill="#181818" />
          <circle cx="290" cy="90" r="22" fill="#202020" />
          {/* Accent Line */}
          <path d="M 50 135 H 180" stroke="#00ff9d" strokeWidth="2" />
          <text x="50" y="152" fill="#666" fontSize="9" fontFamily="monospace">MOTORSPORT TELEMETRY // 2026</text>
        </svg>
      )

    case 'backend':
      return (
        <svg className="w-full h-full text-neutral-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#0d0d0d" />
          {/* Distributed Topology Nodes */}
          <rect x="40" y="95" width="60" height="50" rx="4" fill="#141414" stroke="#333" strokeWidth="1.2" />
          <text x="55" y="125" fill="#888" fontSize="10" fontFamily="monospace">GATEWAY</text>
          
          <rect x="170" y="55" width="60" height="45" rx="4" fill="#141414" stroke="#00ff9d" strokeWidth="1.2" />
          <text x="182" y="82" fill="#00ff9d" fontSize="9" fontFamily="monospace">WORKER 1</text>
          
          <rect x="170" y="140" width="60" height="45" rx="4" fill="#141414" stroke="#333" strokeWidth="1.2" />
          <text x="182" y="167" fill="#888" fontSize="9" fontFamily="monospace">WORKER 2</text>

          <rect x="300" y="95" width="60" height="50" rx="4" fill="#141414" stroke="#333" strokeWidth="1.2" />
          <text x="312" y="125" fill="#888" fontSize="10" fontFamily="monospace">REDIS</text>

          {/* Connectors */}
          <path d="M 100 120 H 140 V 78 H 170 M 140 120 V 162 H 170 M 230 78 H 260 V 120 H 300 M 230 162 H 260 V 120" stroke="#00ff9d" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
          <text x="40" y="32" fill="#666" fontSize="10" fontFamily="monospace">THROUGHPUT: 10,240 REQ/SEC</text>
        </svg>
      )

    default: // drone
      return (
        <svg className="w-full h-full text-neutral-800" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#0d0d0d" />
          {/* Radar Circles */}
          <circle cx="200" cy="120" r="85" stroke="#1c1c1c" strokeWidth="1" />
          <circle cx="200" cy="120" r="55" stroke="#222" strokeWidth="1" />
          <circle cx="200" cy="120" r="25" stroke="#00ff9d" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          {/* Axis lines */}
          <line x1="90" y1="120" x2="310" y2="120" stroke="#222" strokeWidth="1" />
          <line x1="200" y1="30" x2="200" y2="210" stroke="#222" strokeWidth="1" />
          {/* Drone Vector icon */}
          <circle cx="200" cy="120" r="5" fill="#00ff9d" />
          <path d="M 180 100 L 220 140 M 180 140 L 220 100" stroke="#fff" strokeWidth="2" opacity="0.7" />
          <circle cx="180" cy="100" r="7" stroke="#00ff9d" strokeWidth="1.5" />
          <circle cx="220" cy="100" r="7" stroke="#00ff9d" strokeWidth="1.5" />
          <circle cx="180" cy="140" r="7" stroke="#00ff9d" strokeWidth="1.5" />
          <circle cx="220" cy="140" r="7" stroke="#00ff9d" strokeWidth="1.5" />
          <text x="30" y="32" fill="#00ff9d" fontSize="10" fontFamily="monospace">ALTITUDE: 124.5M // YAW: 42°</text>
        </svg>
      )
  }
}

/**
 * ProjectsSection Component
 * Inspired by landonorris.com helmet gallery:
 * - Asymmetric / Staggered 3-Column Grid
 * - Rounded minimalist card frame with signature bottom-right badge
 * - Neon green #00ff9d border highlight on hover
 * - Smooth Framer Motion reveal
 */
export default function ProjectsSection({
  projects = PROJECTS_DATA,
  title = "SELECTED WORKS",
  subtitle = "High-throughput systems, real-time computer vision, and telemetry-driven engineering.",
}) {
  const [filter, setFilter] = useState('ALL')
  const sectionRef = useRef(null)

  // ─── SCROLL TRACKING ────────────────────────────────────────────────────────
  // Offset penuh [start end, end start] = siklus masuk dari bawah → fokus → keluar ke atas
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Spring lerp 60fps
  const smooth = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  })

  // ─── SCROLL-DRIVEN FOCUS ANIMATION: SECTION TITLE ───────────────────────────
  // ProjectsSection lebih panjang (banyak kartu) → zona fokus lebih lebar
  // [0.05, 0.18] → fade-in & zoom-in
  // [0.18, 0.72] → plateau fokus (pembaca membaca kartu-kartu)
  // [0.72, 0.88] → fade-out & zoom-out ke atas
  const titleOpacity = useTransform(smooth, [0.05, 0.18, 0.72, 0.88], [0, 1, 1, 0])
  const titleScale   = useTransform(smooth, [0.05, 0.18, 0.72, 0.88], [0.90, 1.0, 1.0, 0.78])
  const titleY       = useTransform(smooth, [0.05, 0.20, 0.88],       [38, 0, -32])

  // Sub-description dengan stagger +1 progress unit
  const subOpacity = useTransform(smooth, [0.09, 0.22, 0.74, 0.90], [0, 1, 1, 0])
  const subScale   = useTransform(smooth, [0.09, 0.22, 0.74, 0.90], [0.92, 1.0, 1.0, 0.80])
  const subY       = useTransform(smooth, [0.09, 0.24, 0.90],       [28, 0, -28])

  const categories = ['ALL', 'COMPUTER VISION', 'DATA SCIENCE', 'BACKEND']

  const filteredProjects = projects.filter((item) => {
    if (filter === 'ALL') return true
    if (filter === 'COMPUTER VISION') return item.category.toLowerCase().includes('vision')
    if (filter === 'DATA SCIENCE') return item.category.toLowerCase().includes('data') || item.category.toLowerCase().includes('intelligence')
    if (filter === 'BACKEND') return item.category.toLowerCase().includes('backend') || item.category.toLowerCase().includes('frontend') || item.category.toLowerCase().includes('distributed')
    return true
  })

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative w-full bg-[#0a0a0a] text-white pt-20 pb-24 sm:pt-24 sm:pb-28 px-6 sm:px-12 md:px-16 overflow-hidden select-none"
    >
      {/* Background Subtle Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        
        {/* 1. SECTION HEADER */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-neutral-800">
          <div>
            {/* ─── SCROLL-DRIVEN FOCUS: MAIN HEADLINE ─────────────────────────────── */}
            <motion.div
              style={{
                opacity: titleOpacity,
                scale: titleScale,
                y: titleY,
                transformOrigin: 'left center',
              }}
              className="will-change-transform"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tighter uppercase text-white">
                {title}
              </h2>
            </motion.div>

            {/* ─── SCROLL-DRIVEN FOCUS: SUB-DESCRIPTION ───────────────────────────── */}
            <motion.div
              style={{
                opacity: subOpacity,
                scale: subScale,
                y: subY,
                transformOrigin: 'left center',
              }}
              className="will-change-transform"
            >
              <p className="mt-3 text-neutral-400 text-sm sm:text-base font-sans max-w-xl font-light">
                {subtitle}
              </p>
            </motion.div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 border transition-all duration-200 interactive-card ${
                  filter === cat
                    ? 'border-[#00ff9d] bg-[#00ff9d]/10 text-[#00ff9d] shadow-[0_0_12px_rgba(0,255,157,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. ASYMMETRIC / STAGGERED GRID (3 Columns on Desktop) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start"
        >
          {filteredProjects.map((project, idx) => {
            // Apply asymmetric height offsets to column 2 and 3 for dynamic rhythm
            const isCol2 = idx % 3 === 1
            const isCol3 = idx % 3 === 2
            const staggerClass = isCol2 ? 'lg:translate-y-12' : isCol3 ? 'lg:translate-y-6' : ''

            return (
              <motion.article
                key={project.id}
                variants={cardVariants}
                className={`group interactive-card relative flex flex-col rounded-2xl bg-neutral-900/50 border border-neutral-800/90 overflow-hidden backdrop-blur-md transition-all duration-400 hover:border-[#00ff9d] hover:shadow-[0_12px_45px_rgba(0,255,157,0.18)] hover:-translate-y-2 ${staggerClass}`}
              >
                {/* Visual Graphic Mockup Preview */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-neutral-950 border-b border-neutral-800/80">
                  
                  {/* Subtle Corner Telemetry Index */}
                  <div className="absolute top-3.5 left-4 z-20 flex items-center gap-2 font-mono text-[9px] tracking-widest text-neutral-400 uppercase pointer-events-none select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_6px_#00ff9d]" />
                    <span>REF // 0{idx + 1}</span>
                  </div>

                  {/* Top-Right Quick External Action */}
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-neutral-900/80 border border-neutral-700/80 text-neutral-300 hover:text-white hover:border-[#00ff9d] hover:bg-[#00ff9d]/10 transition-all duration-200"
                  >
                    <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-[#00ff9d] transition-colors" />
                  </a>

                  {/* Render Mockup Visual with Scale-up on Hover */}
                  <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                    <ProjectVisual type={project.visualType} title={project.title} />
                  </div>

                  {/* Tech Specs Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#00ff9d]">
                      {project.stats}
                    </span>
                  </div>

                  {/* ============================================================ */}
                  {/* SIGNATURE BADGE (Sudut Kanan Bawah - Lando Norris Helmet Style) */}
                  {/* ============================================================ */}
                  <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-full bg-neutral-950/90 border border-neutral-700/90 backdrop-blur-md shadow-md transition-colors duration-300 group-hover:border-[#00ff9d] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_6px_#00ff9d]" />
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-white group-hover:text-[#00ff9d] transition-colors">
                        {project.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Category */}
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                      <span>{project.category}</span>
                      <span className="text-neutral-400 font-semibold">{project.year}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl font-bold font-display text-white tracking-tight leading-snug group-hover:text-[#00ff9d] transition-colors duration-200">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips & Links */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col gap-4">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 group-hover:border-neutral-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action Links */}
                    <div className="flex items-center justify-between pt-1 text-xs font-mono">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#00ff9d] hover:text-white hover:underline transition-colors uppercase tracking-wider font-semibold"
                      >
                        <span>Inspect Repo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
