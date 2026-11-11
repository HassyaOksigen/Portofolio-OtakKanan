import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

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
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQL',
      'MongoDB',
      'RESTful API',
    ],
  },
  {
    id: 'frontend',
    title: 'FRONTEND INTERFACES',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React',
      'Tailwind CSS',
      'Framer Motion',
    ],
  },
  {
    id: 'data-cv',
    title: 'DATA ANALYTICS & COMPUTER VISION',
    items: [
      'OpenCV',
      'YOLOv8',
      'Pandas',
      'Seaborn',
      'Matplotlib',
      'Tableau',
    ],
  },
  {
    id: 'devops-tools',
    title: 'DEVOPS, TOOLS & ENVIRONMENT',
    items: [
      'Docker',
      'Docker Compose',
      'Git',
      'GitHub',
      'Linux CLI',
      'DBeaver',
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

const badgeItemVariants = {
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
 * - Technical pills/badges dengan neon green #00ff9d hover glow & scale-105 micro-interaction
 * - Staggered fade-in-up animation saat scroll memasuki viewport
 */
export default function TechStackSection({
  categories = TECH_CATEGORIES,
  title = 'TOOLS & ENGINE CORE',
  subtitle = 'Production-grade technologies powering resilient backend architectures, analytical intelligence pipelines, and high-precision frontend interfaces.',
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
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
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

          {/* Right Header Telemetry Readout */}
          <div className="flex items-center gap-3 self-start lg:self-end px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900/50 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse shadow-[0_0_8px_#00ff9d]" />
            <span>DIAGNOSTICS:</span>
            <span className="text-[#00ff9d] font-semibold">4 MODULES // 24 TOOLS</span>
          </div>
        </div>

        {/* 3. 4-CARD CATEGORY GRID */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.article
              key={category.id}
              variants={cardVariants}
              className="group interactive-card relative flex flex-col rounded-xl bg-neutral-900/40 border border-neutral-800 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#00ff9d] hover:bg-neutral-900/65 hover:shadow-[0_0_35px_rgba(0,255,157,0.16)]"
            >
              {/* Category Heading */}
              <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight uppercase text-white group-hover:text-[#00ff9d] transition-colors duration-300">
                {category.title}
              </h3>

              {/* Technical Badges / Pills Container */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                {category.items.map((tool) => (
                  <motion.div
                    key={tool}
                    variants={badgeItemVariants}
                    className="inline-flex"
                  >
                    <span className="interactive-card inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-950/90 border border-neutral-800 font-mono text-xs tracking-wide text-neutral-300 transition-all duration-200 hover:scale-105 group-hover:border-neutral-700 hover:!border-[#00ff9d] hover:text-[#00ff9d] hover:bg-[#00ff9d]/10 hover:shadow-[0_0_14px_rgba(0,255,157,0.25)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 transition-colors duration-200 group-hover:bg-[#00ff9d]/60" />
                      <span>{tool}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
