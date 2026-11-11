import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiJson,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiFigma,
  SiNumpy,
  SiYolo,
  SiPandas,
  SiJupyter,
  SiLooker,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiDbeaver,
} from 'react-icons/si'
import {
  FaCss3Alt,
  FaDatabase,
  FaCubes,
  FaCode,
} from 'react-icons/fa'
import { IoLogoTableau } from 'react-icons/io5'

/**
 * ============================================================================
 * DATA KATEGORI TECH STACK (TECH_CATEGORIES)
 * ============================================================================
 */
export const TECH_CATEGORIES = [
  {
    id: 'backend-db',
    title: 'BACKEND & DATABASE ENGINEERING',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'SQL', icon: FaDatabase },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'JSON', icon: SiJson },
    ],
  },
  {
    id: 'frontend',
    title: 'FRONTEND INTERFACES',
    items: [
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'JavaScript (ES6+)', icon: SiJavascript },
      { name: 'React', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Figma', icon: SiFigma },
    ],
  },
  {
    id: 'data-cv',
    title: 'DATA ANALYTICS & COMPUTER VISION',
    items: [
      { name: 'NumPy', icon: SiNumpy },
      { name: 'YOLOv8', icon: SiYolo },
      { name: 'Pandas', icon: SiPandas },
      { name: 'Jupyter', icon: SiJupyter },
      { name: 'Looker Studio', icon: SiLooker },
      { name: 'Tableau', icon: IoLogoTableau },
    ],
  },
  {
    id: 'devops-tools',
    title: 'DEVOPS, TOOLS & ENVIRONMENT',
    items: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Docker Compose', icon: FaCubes },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Linux CLI', icon: SiLinux },
      { name: 'DBeaver', icon: SiDbeaver },
    ],
  },
]

// ─── FRAMER MOTION VARIANTS (STAGGERED ENTRANCE) ────────────────────────────
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.055,
      delayChildren: 0.15,
    },
  },
}

const techItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * TechStackSection Component
 * Halaman Keahlian & Framework yang ditempatkan di antara ProjectsSection dan FooterSection:
 * - Dark mode murni (#0a0a0a / bg-neutral-950) dengan kisi telemetry latar belakang
 * - Header & sub-judul dengan scroll-driven focus animation konsisten
 * - 4 Grid Cards kategori teknologi (Backend, Frontend, Data/CV, DevOps/Tools)
 * - Icon Cards Grid di dalam setiap kategori dengan ikon react-icons & efek hover emerald
 * - Staggered fade-in-up animation saat scroll memasuki viewport
 */
export default function TechStackSection({
  categories = TECH_CATEGORIES,
  title = 'TECH STACK',
  subtitle = 'Technologies and frameworks I use to build backend systems, data analytics pipelines, and interactive web applications.',
}) {
  const sectionRef = useRef(null)

  // ─── SCROLL TRACKING (UNTUK SCROLL-DRIVEN FOCUS PADA HEADER) ──────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  })

  // Scroll-driven focus-in / focus-out pada header section
  const titleOpacity = useTransform(smooth, [0.06, 0.22, 0.72, 0.90], [0, 1, 1, 0])
  const titleScale = useTransform(smooth, [0.06, 0.22, 0.72, 0.90], [0.90, 1.0, 1.0, 0.78])
  const titleY = useTransform(smooth, [0.06, 0.24, 0.90], [36, 0, -30])

  const subOpacity = useTransform(smooth, [0.10, 0.26, 0.74, 0.92], [0, 1, 1, 0])
  const subScale = useTransform(smooth, [0.10, 0.26, 0.74, 0.92], [0.92, 1.0, 1.0, 0.80])
  const subY = useTransform(smooth, [0.10, 0.28, 0.92], [26, 0, -26])

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative w-full bg-neutral-950 text-white py-20 sm:py-24 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-neutral-900 select-none"
    >
      {/* 1. TELEMETRY GRID BACKGROUND OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Subtle Secondary Coordinate Crosshair Dots Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #00ff9d 1px, transparent 1px)',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        {/* 2. SECTION HEADER */}
        <div className="w-full flex flex-col pb-8 border-b border-neutral-800">
          {/* Bold Headline dengan Scroll-Driven Focus */}
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

          {/* Sub-deskripsi dengan Stagger Scroll Focus */}
          <motion.div
            style={{
              opacity: subOpacity,
              scale: subScale,
              y: subY,
              transformOrigin: 'left center',
            }}
            className="will-change-transform"
          >
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-sans max-w-2xl font-light leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* 3. 4-CARD CATEGORY GRID */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.article
              key={category.id}
              variants={cardVariants}
              className="group interactive-card relative flex flex-col rounded-xl bg-neutral-900/40 border border-neutral-800 p-5 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#00ff9d] hover:bg-neutral-900/65 hover:shadow-[0_0_35px_rgba(0,255,157,0.16)]"
            >
              {/* Category Heading */}
              <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight uppercase text-white group-hover:text-[#00ff9d] transition-colors duration-300">
                {category.title}
              </h3>

              {/* Icon Cards Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {category.items.map((tool) => {
                  const toolName = typeof tool === 'string' ? tool : tool.name
                  const IconComponent = (typeof tool === 'object' && tool.icon) || FaCode

                  return (
                    <motion.div key={toolName} variants={techItemVariants}>
                      <div className="group/item interactive-card h-full flex flex-col items-center justify-center text-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-neutral-300 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 hover:text-emerald-400 transition-all duration-300">
                        <IconComponent
                          className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-200 group-hover/item:text-emerald-400 transition-colors duration-300 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover/item:text-emerald-400 mt-2 transition-colors duration-300 leading-tight">
                          {toolName}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
