import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * AboutSection Component
 * Inspired by landonorris.com transition & quote section:
 * 1. Giant Running Text / Marquee Background moving horizontally in background
 * 2. Editorial Quote + Sub-description dengan scroll-driven focus animation
 * 3. Mini Code Terminal Snippet Card (developer.config.js) & Bio Narrative
 */
export default function AboutSection({
  quote = "DESIGNED WITH PRECISION. BUILT FOR PERFORMANCE.",
  subquote = "Crafting robust backend architectures, real-time data pipelines, and seamless web applications.",
}) {
  const sectionRef = useRef(null)

  // ─── SCROLL TRACKING ────────────────────────────────────────────────────────
  // Gunakan offset penuh ["start end", "end start"] agar kita bisa track
  // seluruh siklus hidup section: masuk dari bawah → fokus → keluar ke atas.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Spring lerp untuk pergerakan 60fps tanpa jank
  const smooth = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  })

  // ─── SCROLL-DRIVEN FOCUS ANIMATION: QUOTE HEADING ───────────────────────────
  const quoteOpacity = useTransform(smooth, [0.08, 0.26, 0.60, 0.80], [0, 1, 1, 0])
  const quoteScale   = useTransform(smooth, [0.08, 0.26, 0.60, 0.80], [0.90, 1.0, 1.0, 0.78])
  const quoteY       = useTransform(smooth, [0.08, 0.30, 0.80],       [38, 0, -32])

  // ─── SCROLL-DRIVEN FOCUS ANIMATION: SUB-DESCRIPTION (slight stagger) ────────
  const subOpacity = useTransform(smooth, [0.14, 0.32, 0.62, 0.82], [0, 1, 1, 0])
  const subScale   = useTransform(smooth, [0.14, 0.32, 0.62, 0.82], [0.92, 1.0, 1.0, 0.80])
  const subY       = useTransform(smooth, [0.14, 0.34, 0.82],       [28, 0, -28])

  // ─── MARQUEE SCROLL SCRUB ───────────────────────────────────────────────────
  const marqueeScrollX = useTransform(smooth, [0, 1], ['0%', '-15%'])

  // Pecah quote per kalimat menjadi 2 baris eksplisit (misal: Baris 1 & Baris 2)
  const quoteLines = typeof quote === 'string'
    ? quote.replace(/\.\s+/g, '.\n').split('\n').filter(Boolean)
    : [quote]

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col pt-20 pb-16 sm:pt-24 sm:pb-20 px-6 sm:px-12 md:px-16 select-none"
    >
      {/* 1. GIANT RUNNING TEXT / MARQUEE BACKGROUND */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden opacity-20 select-none z-0">
        {/* Track 1: Moving Left (Hollow Outline Text) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            style={{ x: marqueeScrollX }}
            className="flex whitespace-nowrap gap-8 font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[11vw] tracking-tighter uppercase text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,0.4)]"
          >
            <motion.div
              className="flex whitespace-nowrap gap-8"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 24 }}
            >
              <span>CREATING DIGITAL EXPERIENCES • FULL-STACK & BACKEND ENGINEER •</span>
              <span>CREATING DIGITAL EXPERIENCES • FULL-STACK & BACKEND ENGINEER •</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Track 2: Moving Right (Solid Faint Text) */}
        <div className="flex whitespace-nowrap overflow-hidden mt-[-2vw]">
          <motion.div 
            className="flex whitespace-nowrap gap-8 font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] tracking-tighter uppercase text-white/[0.08]"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
          >
            <span>IN PURSUIT OF VELOCITY • RESILIENT DISTRIBUTED ARCHITECTURE •</span>
            <span>IN PURSUIT OF VELOCITY • RESILIENT DISTRIBUTED ARCHITECTURE •</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle Dark Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* 2. CENTERPIECE: EDITORIAL QUOTE + SIGNATURE SHOWCASE FRAME */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center">
        
        {/* ─── SCROLL-DRIVEN FOCUS: QUOTE SUPER-HEADING ──────────────────────────
            Dibungkus motion.div dengan style berisi nilai scroll-driven transforms.
            will-change-transform → browser pakai GPU compositor, 0 layout shift. */}
        <motion.div
          style={{
            opacity: quoteOpacity,
            scale: quoteScale,
            y: quoteY,
            transformOrigin: 'center center',
          }}
          className="will-change-transform w-full max-w-5xl mx-auto flex justify-center mb-6"
        >
          <h2 className="font-display font-black text-[length:clamp(1rem,4.3vw,1.5rem)] sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter uppercase text-white leading-[1.15] max-w-5xl mx-auto text-center">
            {quoteLines.map((line, index) => (
              <span key={index} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* ─── SCROLL-DRIVEN FOCUS: SUB-DESCRIPTION (slight stagger delay) ──────── */}
        <motion.div
          style={{
            opacity: subOpacity,
            scale: subScale,
            y: subY,
            transformOrigin: 'center center',
          }}
          className="will-change-transform w-full flex justify-center"
        >
          <p className="text-base sm:text-xl text-neutral-400 font-sans font-light max-w-2xl leading-relaxed mx-auto text-center">
            {subquote}
          </p>
        </motion.div>

        {/* CENTERPIECE: MINI CODE TERMINAL SNIPPET CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 sm:mt-12 bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 text-left font-mono text-xs sm:text-sm shadow-xl max-w-md w-full mx-auto mb-8 interactive-card hover:border-emerald-500/40 transition-colors duration-300"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[11px] text-neutral-500 tracking-wide">
              developer.config.js
            </span>
          </div>

          {/* Syntax-Highlighted Config Snippet */}
          <pre className="overflow-x-auto leading-relaxed">
            <code>
              <span className="text-neutral-400">const </span>
              <span className="text-white font-semibold">developer</span>
              <span className="text-neutral-400"> = {'{\n'}</span>
              <span className="text-neutral-100">  name</span>
              <span className="text-neutral-400">: </span>
              <span className="text-emerald-400">&quot;Hassya&quot;</span>
              <span className="text-neutral-400">{',\n'}</span>
              <span className="text-neutral-100">  role</span>
              <span className="text-neutral-400">: </span>
              <span className="text-emerald-400">&quot;Full-Stack&quot;</span>
              <span className="text-neutral-400">{',\n'}</span>
              <span className="text-neutral-100">  focus</span>
              <span className="text-neutral-400">: [</span>
              <span className="text-emerald-400">&quot;Scalable APIs&quot;</span>
              <span className="text-neutral-400">, </span>
              <span className="text-emerald-400">&quot;Data Intelligence&quot;</span>
              <span className="text-neutral-400">, </span>
              <span className="text-emerald-400">&quot;Python&quot;</span>
              <span className="text-neutral-400">{']\n};'}</span>
            </code>
          </pre>
        </motion.div>

        {/* Narrative Bio Paragraph */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-neutral-300 font-sans max-w-2xl w-full leading-relaxed text-center mx-auto bg-neutral-950/70 border border-neutral-800 rounded-xl p-6 backdrop-blur-md"
        >
          <p>
            Full-stack and backend engineering student passionate about performance-driven systems. I bridge scalable server architecture, edge vehicle detection models, and data intelligence platforms into reliable, high-impact digital solutions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
