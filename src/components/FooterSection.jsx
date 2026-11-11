import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * FooterSection Component
 * Terinspirasi langsung dari layout footer landonorris.com:
 * 1. Latar belakang dark mode murni (#0a0a0a) tanpa gangguan visual latar
 * 2. Tanda tangan melayang (/signature.png) dengan pendaran neon hijau-kuning
 * 3. Judul pernyataan tegas: "BUILDING HIGH-PERFORMANCE BACKEND ARCHITECTURE."
 * 4. Navigasi dua sisi (PAGES di kiri, CONNECT di kanan) dengan link vertikal tebal
 * 5. Tombol CTA utama mencolok di tengah ("INTERNSHIP ENQUIRIES ↗")
 * 6. Telemetry Status Bar paling bawah dengan 4 kartu status & tombol aksi
 */
export default function FooterSection({
  signatureSrc = "/signature.png",
  name = "HASSYA",
  semester = "Semester 5",
  email = "hassya.dev@gmail.com",
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
  instagramUrl = "https://instagram.com",
}) {
  const [sigImgError, setSigImgError] = useState(false)
  const footerRef = useRef(null)

  // ─── SCROLL TRACKING ────────────────────────────────────────────────────────
  // Footer adalah section terakhir → kita hanya perlu animasi MASUK (entry only).
  // Offset ["start end", "start center"] → progress 0 saat bawah footer masuk viewport,
  // progress 1 saat bagian atas footer mencapai tengah layar.
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start center'],
  })

  // Spring lerp 60fps
  const smooth = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  })

  // ─── SCROLL-DRIVEN FOCUS ANIMATION: FOOTER TAGLINE (Entry Only) ─────────────
  // Footer adalah section terakhir, jadi tidak perlu exit animation (tidak ada section setelahnya).
  // Hanya entry: fade-in & zoom-in saat footer masuk viewport.
  const titleOpacity = useTransform(smooth, [0.05, 0.60], [0, 1])
  const titleScale   = useTransform(smooth, [0.05, 0.60], [0.88, 1.0])
  const titleY       = useTransform(smooth, [0.05, 0.70], [42, 0])

  // Sub-description dengan stagger kecil
  const subOpacity = useTransform(smooth, [0.15, 0.75], [0, 1])
  const subScale   = useTransform(smooth, [0.15, 0.75], [0.92, 1.0])
  const subY       = useTransform(smooth, [0.15, 0.80], [28, 0])

  const pageLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'TECH STACK', href: '#tech-stack' },
  ]

  const connectLinks = [
    { label: 'GITHUB', href: githubUrl, external: true },
    { label: 'LINKEDIN', href: linkedinUrl, external: true },
    { label: 'INSTAGRAM', href: instagramUrl, external: true },
    { label: 'EMAIL', href: `mailto:${email}`, external: false },
  ]

  const telemetryCards = [
    { label: 'DISCIPLINE', value: 'BACKEND & FULL-STACK' },
    { label: 'LOCATION', value: 'INDONESIA (GMT+7)' },
    { label: 'STATUS', value: 'AVAILABLE', isStatus: true },
    { label: 'SEMESTER', value: semester.toUpperCase() },
  ]

  return (
    <footer ref={footerRef} className="relative w-full bg-[#0a0a0a] text-white overflow-hidden pt-12 pb-12 sm:pt-16 px-6 sm:px-12 md:px-16 select-none">

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* 2. SIGNATURE MELAYANG & STATEMENT TITLE (Bagian Atas Footer) */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl">
          
          {/* Signature Melayang dengan Aksen Neon Hijau-Kuning */}
          <div className="mb-6 flex justify-center items-center">
            {!sigImgError ? (
              <img
                src={signatureSrc}
                alt={`${name} Signature`}
                onError={() => setSigImgError(true)}
                className="w-52 sm:w-64 md:w-72 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,255,157,0.9)] drop-shadow-[0_0_45px_rgba(0,255,157,0.45)] transition-transform duration-300 hover:scale-105 pointer-events-auto"
              />
            ) : (
              /* Fallback SVG Stroke Draw */
              <svg 
                className="w-52 sm:w-64 md:w-72 h-auto text-[#00ff9d] filter drop-shadow-[0_0_20px_rgba(0,255,157,0.85)] drop-shadow-[0_0_40px_rgba(0,255,157,0.4)]"
                viewBox="0 0 500 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M 50 140 C 70 40, 80 30, 90 40 C 95 160, 85 180, 75 160 C 100 90, 130 80, 150 150 M 170 120 C 190 100, 210 120, 200 145 C 180 150, 175 125, 210 115 M 230 110 C 250 100, 245 130, 255 145 M 275 110 C 295 100, 290 130, 300 145 M 320 115 C 335 140, 345 115, 350 160 C 345 190, 320 200, 300 175 C 360 145, 390 145, 410 120 M 60 185 C 200 190, 350 185, 450 165" 
                  stroke="#00ff9d" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          {/* Bold Tagline All-Caps */}
          {/* ─── SCROLL-DRIVEN FOCUS: FOOTER TAGLINE (Entry Animation) ─────────── */}
          <motion.div
            style={{
              opacity: titleOpacity,
              scale: titleScale,
              y: titleY,
              transformOrigin: 'center center',
            }}
            className="will-change-transform w-full"
          >
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-white leading-[1.05]">
              BUILDING HIGH-PERFORMANCE BACKEND ARCHITECTURE.
            </h2>
          </motion.div>

          {/* ─── SCROLL-DRIVEN FOCUS: SUB-DESCRIPTION ───────────────────────────── */}
          <motion.div
            style={{
              opacity: subOpacity,
              scale: subScale,
              y: subY,
              transformOrigin: 'center center',
            }}
            className="will-change-transform w-full"
          >
            <p className="mt-4 font-sans text-neutral-400 text-sm sm:text-base font-light max-w-xl">
              Scalable microservices, low-latency APIs, and analytical intelligence built with engineering rigor.
            </p>
          </motion.div>
        </div>

        {/* 3. DUAL-COLUMN NAVIGATION & CENTRAL CTA BUTTON */}
        <div className="w-full mt-16 sm:mt-20 pt-12 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          
          {/* Kolom Kiri: PAGES */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">
              // PAGES
            </span>
            <ul className="space-y-3 font-display font-black text-2xl sm:text-3xl tracking-tight uppercase">
              {pageLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="interactive-card text-neutral-300 hover:text-[#00ff9d] hover:translate-x-1 transition-all duration-200 inline-block focus:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Tengah: CENTRAL CTA PILL BUTTON */}
          <div className="md:col-span-6 flex flex-col items-center text-center px-4">
            <div className="p-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md shadow-2xl">
              <a
                href={`mailto:${email}`}
                className="interactive-card inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#00ff9d] text-neutral-950 font-display font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(0,255,157,0.4)] hover:shadow-[0_0_45px_rgba(0,255,157,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>INTERNSHIP ENQUIRIES</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>

            <span className="mt-4 font-mono text-[11px] tracking-widest uppercase text-neutral-400">
              OPEN FOR 2026 SOFTWARE ENGINEERING OPPORTUNITIES
            </span>
          </div>

          {/* Kolom Kanan: CONNECT / SOCIALS */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end text-center md:text-right">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">
              // FOLLOW ON / CONNECT
            </span>
            <ul className="space-y-3 font-display font-black text-2xl sm:text-3xl tracking-tight uppercase">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="interactive-card text-neutral-300 hover:text-[#00ff9d] hover:-translate-x-1 transition-all duration-200 inline-block focus:outline-none"
                  >
                    {item.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 4. ABSOLUTE BOTTOM BAR: TELEMETRY STATUS BAR */}
        <div className="w-full border-t border-neutral-800/80 pt-6 mt-14 sm:mt-16 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6">
          
          {/* Kiri: 4 Kartu Status Telemetry Minimalis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap xl:flex-nowrap items-stretch gap-2.5 sm:gap-3 w-full lg:w-auto">
            {telemetryCards.map((item) => (
              <div
                key={item.label}
                className="bg-neutral-900/60 border border-neutral-800 px-4 py-2.5 rounded-sm"
              >
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase block">
                  {item.label}
                </span>
                {item.isStatus ? (
                  <span className="text-xs font-mono font-bold text-[#00ff9d] uppercase whitespace-nowrap mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_6px_#00ff9d] animate-pulse" />
                    <span>{item.value}</span>
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-white uppercase whitespace-nowrap mt-0.5 block">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Kanan: 3 Interactive Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="interactive-card inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm border border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 text-xs font-mono font-bold tracking-wider uppercase text-neutral-200 hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              <span>GITHUB</span>
              <span>↗</span>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="interactive-card inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm border border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 text-xs font-mono font-bold tracking-wider uppercase text-neutral-200 hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              <span>LINKEDIN</span>
              <span>↗</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="interactive-card flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#00ff9d] text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#10b981] hover:shadow-[0_0_18px_rgba(0,255,157,0.45)] transition-all duration-200 whitespace-nowrap"
            >
              <span>GET IN TOUCH</span>
              <span>→</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}
