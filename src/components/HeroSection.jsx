import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import TopographyBackground from './TopographyBackground'
import Navbar from './Navbar'
import FloatingInfoCard from './FloatingInfoCard'

/**
 * HeroSection Component
 * Inspired by landonorris.com layout and aesthetic:
 * 1. Fullscreen (100vh) canvas with light/off-white background and subtle contour lines
 * 2. Scroll-driven background transition from light off-white to dark mode #0a0a0a
 * 3. Main profile photo positioned bottom-center, grounded, clean and unobstructed
 * 4. Minimalist Navbar (Name / Monogram / Interactive Available badge)
 * 5. Floating sharp-cornered info widget at bottom-left
 * 6. Fully responsive across desktop, tablet, and mobile devices
 */
export default function HeroSection({
  profileImageSrc = "/profile.png",
  name = "HASSYA",
  roleTag = "DEV // 05",
  role = "Full-Stack / Backend Developer",
  location = "Indonesia",
  semester = "Semester 5",
  email = "hassya.dev@gmail.com",
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
}) {
  // Track mouse position for subtle dynamic parallax & spotlight
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [imgError, setImgError] = useState(false)

  // Direct window scroll tracking - rock solid 100% visibility on initial load
  const { scrollY } = useScroll()

  // 1. Initial State (scrollY 0 - 80px): 100% visible, fully opaque (1.0), and scaled (1.0)
  // 2. Active Scroll Animation: Elements only begin scaling & fading when user scrolls down
  const sectionBg = useTransform(scrollY, [80, 480], ['#F5F4F0', '#0a0a0a'])
  const heroUiOpacity = useTransform(scrollY, [120, 380], [1.0, 0.0])
  const heroPhotoScale = useTransform(scrollY, [100, 460], [1.0, 0.82])
  const heroPhotoOpacity = useTransform(scrollY, [120, 420], [1.0, 0.0])
  const heroPhotoY = useTransform(scrollY, [100, 460], ['0%', '0%'])

  useEffect(() => {
    // Ensure clean initial scroll position on mount
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: e.clientX / innerWidth,
        y: e.clientY / innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Parallax subtle shifts for portrait and typography
  const portraitShiftX = (mousePos.x - 0.5) * -16
  const portraitShiftY = (mousePos.y - 0.5) * -8
  const textShiftX = (mousePos.x - 0.5) * 12

  return (
    <motion.section 
      id="home"
      style={{ backgroundColor: sectionBg }}
      className="relative w-full h-[100dvh] min-h-[640px] text-neutral-900 flex flex-col justify-between select-none cursor-none overflow-visible"
    >
      {/* 1. TOPOGRAPHY & CONTOUR LINES BACKGROUND */}
      <motion.div style={{ opacity: heroUiOpacity }} className="absolute inset-0 pointer-events-none">
        <TopographyBackground mousePosition={mousePos} />
      </motion.div>

      {/* 2. MINIMALIST TOP NAVBAR */}
      <Navbar 
        name={name}
        roleTag={roleTag}
      />

      {/* GIGANTIC EDITORIAL WATERMARK TYPOGRAPHY (Behind Portrait) */}
      <motion.div 
        style={{
          opacity: heroUiOpacity,
          transform: `translate3d(${textShiftX}px, -50%, 0)`,
        }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-10 transition-transform duration-700 ease-out"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center">
          <span className="font-display text-[15vw] md:text-[17vw] lg:text-[18vw] font-black leading-none tracking-tighter text-neutral-900/[0.045] uppercase">
            {name}
          </span>
          <div className="flex items-center gap-6 mt-[-1vw] opacity-30">
            <span className="h-[1px] w-16 md:w-32 bg-neutral-900" />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-neutral-800">
              05 // MOTORSPORT & ARCHITECTURE
            </span>
            <span className="h-[1px] w-16 md:w-32 bg-neutral-900" />
          </div>
        </div>
      </motion.div>

      {/* 3. MAIN PROFILE PHOTO (Grounded & Scaling down on scroll - Center Bottom Alignment) */}
      <motion.div 
        style={{
          scale: heroPhotoScale,
          y: heroPhotoY,
          opacity: heroPhotoOpacity,
          transformOrigin: 'bottom center',
        }}
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none flex items-end justify-center w-full h-full overflow-visible"
      >
        {/* KONTANER FOTO DENGAN HOVER REACTION KURSOR (Center Bottom Alignment - Transparan & Tanpa Border) */}
        <div 
          data-cursor="photo"
          className="relative mx-auto flex items-end justify-center h-[65vh] sm:h-[75vh] md:h-[82vh] lg:h-[88vh] max-h-[92vh] bg-transparent pointer-events-auto cursor-none group overflow-visible"
        >
          {/* Foto Profil Bersih */}
          {!imgError ? (
            <img
              src={profileImageSrc}
              alt={`${name} Portrait`}
              onError={() => setImgError(true)}
              className="h-full w-auto max-w-[90vw] md:max-w-none object-contain object-bottom filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] select-none pointer-events-none bg-transparent border-none outline-none overflow-visible"
              loading="eager"
            />
          ) : (
            /* Graceful stylized silhouette fallback jika file custom belum dimasukkan */
            <div className="relative flex flex-col items-center justify-end h-full bg-transparent pointer-events-auto">
              <svg 
                className="h-full w-auto text-neutral-800 drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] bg-transparent"
                viewBox="0 0 500 700" 
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="250" cy="180" rx="90" ry="110" />
                <path d="M 120 700 C 130 450, 160 330, 200 300 C 230 320, 270 320, 300 300 C 340 330, 370 450, 380 700 Z" />
                <path d="M 170 340 L 150 500" stroke="#D4FF00" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <div className="absolute bottom-6 bg-neutral-900/90 text-white text-[11px] font-mono px-3 py-1.5 border border-neutral-700 backdrop-blur-md">
                PLACE YOUR FOTO IN: /public/profile.png
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* 4. BOTTOM BAR / OVERLAY LAYER (Widget Card + Telemetry & Links) */}
      <motion.div 
        style={{ opacity: heroUiOpacity }}
        className="relative z-20 w-full px-5 pb-5 sm:px-8 sm:pb-8 md:px-12 md:pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none"
      >
        {/* Floating Info Card (Sudut Kiri Bawah) */}
        <div className="pointer-events-auto w-full sm:w-auto cursor-none">
          <FloatingInfoCard 
            role={role}
            location={location}
            semester={semester}
          />
        </div>

        {/* Right Corner Quick Action Hub */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 text-right cursor-none">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-mono tracking-wider uppercase border border-neutral-300 bg-white/80 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 shadow-sm cursor-none"
          >
            GitHub ↗
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-mono tracking-wider uppercase border border-neutral-300 bg-white/80 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 shadow-sm cursor-none"
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${email}`}
            className="px-4 py-2 text-xs font-mono tracking-wider uppercase bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-200 flex items-center gap-2 shadow-sm cursor-none"
          >
            <span>Contact</span>
            <span className="text-emerald-400">●</span>
          </a>
        </div>
      </motion.div>

    </motion.section>
  )
}
