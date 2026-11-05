import React from 'react'
import MonogramLogo from './MonogramLogo'
import StatusBadge from './StatusBadge'

/**
 * Navbar Component
 * Minimalist high-impact navigation bar inspired by landonorris.com.
 * Left: Bold Name typography
 * Center: Geometric Monogram
 * Right: Interactive "AVAILABLE FOR INTERNSHIP" badge
 */
export default function Navbar({
  name = "HASSYA",
  roleTag = "DEV // 05",
  email = "hassya.dev@gmail.com"
}) {
  return (
    <header className="relative z-30 w-full px-5 py-4 sm:px-8 sm:py-6 md:px-12 md:py-7 flex items-center justify-between">
      {/* Left: Bold Name */}
      <div className="flex-1 flex items-center gap-3">
        <a 
          href="#top" 
          className="group inline-flex items-baseline gap-2 focus:outline-none"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-neutral-900 uppercase font-display group-hover:opacity-75 transition-opacity">
            {name}
          </span>
          <span className="hidden lg:inline-block text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            [{roleTag}]
          </span>
        </a>
      </div>

      {/* Center: Monogram / Initial Logo */}
      <div className="flex justify-center items-center">
        <MonogramLogo className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
      </div>

      {/* Right: Interactive Status Badge */}
      <div className="flex-1 flex justify-end items-center">
        <StatusBadge email={email} statusText="AVAILABLE FOR INTERNSHIP" />
      </div>
    </header>
  )
}
