import React from 'react'

/**
 * Navbar Component
 * Minimalist high-impact navigation bar inspired by landonorris.com.
 * Left: Bold Name typography
 */
export default function Navbar({
  name = "HASSYA",
}) {
  return (
    <header className="relative z-30 w-full px-5 py-4 sm:px-8 sm:py-6 md:px-12 md:py-7 flex items-center justify-between">
      {/* Left: Bold Name */}
      <div className="flex items-center gap-3">
        <a 
          href="#top" 
          className="group inline-flex items-baseline gap-2 focus:outline-none"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-neutral-900 uppercase font-display group-hover:opacity-75 transition-opacity">
            {name}
          </span>
        </a>
      </div>
    </header>
  )
}
