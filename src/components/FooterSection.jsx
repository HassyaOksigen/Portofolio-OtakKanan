import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * FooterSection Component
 * Terinspirasi langsung dari layout footer landonorris.com:
 * 1. Latar belakang dark mode murni (#0a0a0a) tanpa gangguan visual latar
 * 2. Judul penutup terpusat: "READY TO BUILD THE NEXT BIG THING TOGETHER."
 * 3. Tombol CTA utama mencolok di tengah ("INTERNSHIP ENQUIRIES ↗")
 * 4. Telemetry Status Bar paling bawah dengan 4 kartu status & tombol aksi
 */
export default function FooterSection({
  semester = "Semester 5",
  email = "hassyaoksigen20@gmail.com",
  githubUrl = "https://github.com/HassyaOksigen",
  linkedinUrl = "https://www.linkedin.com/in/hassyaoksigen",
}) {
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

  const telemetryCards = [
    { label: 'DISCIPLINE', value: 'BACKEND & FULL-STACK' },
    { label: 'LOCATION', value: 'INDONESIA, SURABAYA' },
    { label: 'STATUS', value: 'AVAILABLE', isStatus: true },
    { label: 'SEMESTER', value: semester.toUpperCase() },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-between py-12 px-6 md:px-12 select-none"
    >

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between items-center">

        {/* 1. CENTERED PRE-FOOTER BLOCK (Judul -> Deskripsi -> Tombol CTA) */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="my-auto flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full">

            {/* Bold Tagline All-Caps (2 Baris Eksplisit Tanpa Pemotongan Canggung) */}
            {/* ─── SCROLL-DRIVEN FOCUS: FOOTER TAGLINE (Entry Animation) ─────────── */}
            <motion.div
              style={{
                opacity: titleOpacity,
                scale: titleScale,
                y: titleY,
                transformOrigin: 'center center',
              }}
              className="will-change-transform w-full flex justify-center"
            >
              <h2 className="font-display font-black text-[length:clamp(0.95rem,4.1vw,1.4rem)] sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter uppercase text-white leading-tight text-center mx-auto">
                <span className="block whitespace-nowrap">READY TO BUILD THE NEXT</span>
                <span className="block whitespace-nowrap">BIG THING TOGETHER.</span>
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
              className="will-change-transform w-full flex justify-center mt-6 mb-14"
            >
              <p className="font-sans text-neutral-400 text-sm sm:text-base md:text-lg font-light max-w-2xl text-center mx-auto leading-relaxed">
                Open for software engineering internships, backend architecture, and full-stack development.
              </p>
            </motion.div>

            {/* CENTRAL CTA PILL BUTTON */}
            <div className="w-full flex flex-col items-center justify-center text-center px-4">
              <div className="p-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md shadow-2xl">
                <a
                  href={`mailto:${email}`}
                  className="interactive-card inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#00ff9d] text-neutral-950 font-display font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(0,255,157,0.4)] hover:shadow-[0_0_45px_rgba(0,255,157,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>INTERNSHIP ENQUIRIES</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ABSOLUTE BOTTOM BAR: TELEMETRY STATUS BAR */}
        <div className="mt-auto w-full pt-8">
          <div className="w-full border-t border-neutral-800/80 pt-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6">
          
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

      </div>
    </footer>
  )
}
