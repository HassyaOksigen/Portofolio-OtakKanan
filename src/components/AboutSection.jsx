import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * AboutSection Component
 * Inspired by landonorris.com transition & quote section:
 * 1. Giant Running Text / Marquee Background moving horizontally in background
 * 2. Centerpiece: Frameless Floating Signature (/signature.png with electric neon green #00ff9d glow)
 * 3. High-Fashion Editorial Quote & Bio Narrative
 *
 * SCROLL-DRIVEN FOCUS ANIMATION:
 * - Quote & subquote menggunakan scroll-driven opacity/scale/y agar terasa "fokus saat dibaca"
 *   dan menghilang secara alami saat pengguna scroll meninggalkan section.
 */
export default function AboutSection({
  signatureSrc = "/signature.png",
  quote = "ENGINEERED FOR VELOCITY. BUILT FOR SCALE.",
  subquote = "Turning complex backend architecture into seamless, high-impact digital experiences.",
  name = "HASSYA",
  role = "Full-Stack / Backend Engineer",
  location = "Indonesia",
  semester = "Semester 5",
}) {
  const [sigImgError, setSigImgError] = useState(false)
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
  // Skema progress:
  //  0.00 → 0.12 : Section masuk dari bawah (tersembunyi)
  //  0.12 → 0.30 : Zoom-in & fade-in ke posisi fokus penuh
  //  0.30 → 0.65 : Diam di fokus (pembaca membaca teks)
  //  0.65 → 0.82 : Mulai mengecil & memudar saat scroll ke atas menuju Projects
  const quoteOpacity = useTransform(smooth, [0.08, 0.26, 0.60, 0.80], [0, 1, 1, 0])
  const quoteScale   = useTransform(smooth, [0.08, 0.26, 0.60, 0.80], [0.90, 1.0, 1.0, 0.78])
  const quoteY       = useTransform(smooth, [0.08, 0.30, 0.80],       [38, 0, -32])

  // ─── SCROLL-DRIVEN FOCUS ANIMATION: SUB-DESCRIPTION (slight stagger) ────────
  const subOpacity = useTransform(smooth, [0.14, 0.32, 0.62, 0.82], [0, 1, 1, 0])
  const subScale   = useTransform(smooth, [0.14, 0.32, 0.62, 0.82], [0.92, 1.0, 1.0, 0.80])
  const subY       = useTransform(smooth, [0.14, 0.34, 0.82],       [28, 0, -28])

  // ─── SIGNATURE PARALLAX ─────────────────────────────────────────────────────
  // Gunakan spring terpisah dari offset ["start end", "center center"] agar signature
  // tetap menggunakan scroll tracking aslinya dari atas (fade-in saat masuk saja)
  const { scrollYProgress: sigProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })
  const sigSmooth = useSpring(sigProgress, { damping: 28, stiffness: 180, mass: 0.5 })
  const signatureOpacity = useTransform(sigSmooth, [0.2, 0.85], [0.15, 1.0])
  const signatureScale   = useTransform(sigSmooth, [0.2, 0.85], [0.85, 1.05])

  // ─── MARQUEE SCROLL SCRUB ───────────────────────────────────────────────────
  const marqueeScrollX = useTransform(smooth, [0, 1], ['0%', '-15%'])

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
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
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
          className="will-change-transform w-full"
        >
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-white leading-[1.05] max-w-4xl mx-auto">
            {quote}
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
          className="will-change-transform w-full mt-5"
        >
          <p className="text-base sm:text-xl text-neutral-400 font-sans font-light max-w-2xl leading-relaxed mx-auto">
            {subquote}
          </p>
        </motion.div>

        {/* CENTERPIECE: FRAMELESS FLOATING SIGNATURE (MELAYANG DI TENGAH TANPA BINGKAI/KOTAK) */}
        <div className="relative my-8 sm:my-12 flex flex-col items-center justify-center w-full">
          {/* Signature Graphic: Centered, Frameless, and Glowing Neon Green */}
          <motion.div 
            style={{
              opacity: signatureOpacity,
              scale: signatureScale,
            }}
            className="relative flex items-center justify-center pointer-events-none z-10"
          >
            {!sigImgError ? (
              <img 
                src={signatureSrc}
                alt={`${name} Signature`}
                onError={() => setSigImgError(true)}
                className="w-64 sm:w-80 md:w-96 lg:w-[26rem] max-w-[85vw] h-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,255,157,0.9)] drop-shadow-[0_0_50px_rgba(0,255,157,0.5)] transition-transform duration-500 hover:scale-105 pointer-events-auto select-none"
              />
            ) : (
              /* Animated SVG Stroke Draw Signature Fallback */
              <svg 
                className="w-64 sm:w-80 md:w-96 lg:w-[26rem] max-w-[85vw] h-auto text-[#00ff9d] filter drop-shadow-[0_0_20px_rgba(0,255,157,0.85)] drop-shadow-[0_0_45px_rgba(0,255,157,0.45)] select-none pointer-events-auto"
                viewBox="0 0 500 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path 
                  d="M 50 140 C 70 40, 80 30, 90 40 C 95 160, 85 180, 75 160 C 100 90, 130 80, 150 150 M 170 120 C 190 100, 210 120, 200 145 C 180 150, 175 125, 210 115 M 230 110 C 250 100, 245 130, 255 145 M 275 110 C 295 100, 290 130, 300 145 M 320 115 C 335 140, 345 115, 350 160 C 345 190, 320 200, 300 175 C 360 145, 390 145, 410 120 M 60 185 C 200 190, 350 185, 450 165" 
                  stroke="#00ff9d" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                />
              </svg>
            )}
          </motion.div>

          {/* Minimalist Author Tag */}
          <span className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-neutral-400 select-none">
            {name} — {role}
          </span>
        </div>

        {/* Narrative Bio Paragraph */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 sm:mt-10 text-sm sm:text-base text-neutral-300 font-sans max-w-2xl leading-relaxed text-center sm:text-left bg-neutral-950/70 border border-neutral-800 p-6 backdrop-blur-md"
        >
          <p>
            I am a <strong className="text-white font-semibold">{semester}</strong> Software Engineering student from <strong className="text-white font-semibold">{location}</strong>. 
            Inspired by the high-velocity precision of motorsport telemetry and clean structural engineering, I build resilient backend microservices, real-time data pipelines, and responsive digital interfaces with relentless focus on speed, scalability, and code clarity.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
