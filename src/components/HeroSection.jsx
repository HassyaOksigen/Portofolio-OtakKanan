import React, { useState, useEffect } from 'react'
import TopographyBackground from './TopographyBackground'
import Navbar from './Navbar'
import FloatingInfoCard from './FloatingInfoCard'
import InteractiveCursor, { CURSOR_CONFIG } from './InteractiveCursor'

/**
 * HeroSection Component
 * Inspired by landonorris.com layout and aesthetic:
 * 1. Fullscreen (100vh) canvas with light/off-white background and subtle contour lines
 * 2. Main profile photo positioned bottom-center, grounded, clean and unobstructed
 * 3. Minimalist Single Black Dot Cursor with smooth hover scale reaction
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
  cursorConfig = CURSOR_CONFIG,
}) {
  // Track mouse position for subtle dynamic parallax & spotlight
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
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
    <section 
      id="home"
      className="relative w-full h-[100dvh] min-h-[640px] bg-[#F5F4F0] text-neutral-900 overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      {/* KURSOR KUSTOM MINIMALIS (SINGLE BLACK DOT) */}
      <InteractiveCursor config={cursorConfig} />

      {/* 1. TOPOGRAPHY & CONTOUR LINES BACKGROUND */}
      <TopographyBackground mousePosition={mousePos} />

      {/* 2. MINIMALIST TOP NAVBAR */}
      <Navbar 
        name={name}
        roleTag={roleTag}
        email={email}
      />

      {/* GIGANTIC EDITORIAL WATERMARK TYPOGRAPHY (Behind Portrait) */}
      <div 
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${textShiftX}px, -50%, 0)`,
        }}
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
      </div>

      {/* 3. MAIN PROFILE PHOTO (CLEAN, PROMINENT & UNOBSTRUCTED) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${portraitShiftX}px), ${portraitShiftY}px, 0)`,
        }}
      >
        {/* KONTANER FOTO DENGAN HOVER REACTION KURSOR */}
        <div 
          data-cursor="photo"
          className="relative inline-flex items-end justify-center h-[62vh] sm:h-[72vh] md:h-[80vh] lg:h-[85vh] max-h-[90vh] pointer-events-auto cursor-none group"
        >
          {/* Foto Profil Bersih */}
          {!imgError ? (
            <img
              src={profileImageSrc}
              alt={`${name} Portrait`}
              onError={() => setImgError(true)}
              className="h-full w-auto max-w-[90vw] md:max-w-none object-contain object-bottom filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.01]"
              loading="eager"
            />
          ) : (
            /* Graceful stylized silhouette fallback jika file custom belum dimasukkan */
            <div className="relative flex flex-col items-center justify-end h-full pointer-events-auto">
              <svg 
                className="h-full w-auto text-neutral-800 drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
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
      </div>

      {/* 4. BOTTOM BAR / OVERLAY LAYER (Widget Card + Telemetry & Links) */}
      <div className="relative z-20 w-full px-5 pb-5 sm:px-8 sm:pb-8 md:px-12 md:pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
        
        {/* Floating Info Card (Sudut Kiri Bawah) */}
        <div className="pointer-events-auto w-full sm:w-auto cursor-none">
          <FloatingInfoCard 
            role={role}
            location={location}
            semester={semester}
          />
        </div>

        {/* Right Corner Telemetry & Quick Action Hub (Lando Norris style) */}
        <div className="pointer-events-auto hidden md:flex flex-col items-end gap-2.5 text-right cursor-none">
          
          {/* Coordinates & Season indicator */}
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase bg-white/75 backdrop-blur-sm px-3 py-1.5 border border-neutral-200 shadow-sm">
            <span className="text-neutral-500">INDEX // 2026.05</span>
            <span className="w-1 h-1 bg-neutral-300" />
            <span className="text-neutral-800 font-semibold">IDN — SBY</span>
          </div>

          {/* Social and Action Buttons */}
          <div className="flex items-center gap-2">
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

        </div>

      </div>

      {/* Minimalist Bottom Safe Edge Accent (Very fine border) */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-neutral-300/40 pointer-events-none" />
    </section>
  )
}
