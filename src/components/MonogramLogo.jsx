import React, { useState } from 'react'

/**
 * MonogramLogo Component
 * Stylized geometric monogram emblem inspired by modern motorsport & streetwear branding.
 */
export default function MonogramLogo({ className = "w-10 h-10" }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a 
      href="#home"
      aria-label="Home Monogram"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex items-center justify-center p-2 focus:outline-none transition-transform duration-300 active:scale-95`}
    >
      {/* Background geometric frame on hover */}
      <div 
        className={`absolute inset-0 border border-neutral-900 transition-all duration-300 pointer-events-none ${
          isHovered ? 'scale-105 opacity-100 bg-neutral-900' : 'scale-90 opacity-0'
        }`}
      />

      <svg 
        className={`${className} transition-colors duration-300 z-10 ${
          isHovered ? 'text-white' : 'text-neutral-900'
        }`}
        viewBox="0 0 100 100" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monogram Glyph: Architectural & High-Speed Stylized 'H' with dynamic angular cuts */}
        <polygon points="18,12 36,12 36,41 64,41 64,12 82,12 82,88 64,88 64,57 36,57 36,88 18,88" />
        
        {/* Modernist dynamic racing slant cutouts */}
        <polygon 
          points="40,24 60,24 48,34" 
          className="fill-[#F5F4F0] group-hover:fill-neutral-900 transition-colors duration-300"
        />
        <polygon 
          points="40,76 60,76 52,66" 
          className="fill-[#F5F4F0] group-hover:fill-neutral-900 transition-colors duration-300"
        />
        
        {/* Micro brand mark: '05' (Semester / Driver Number) */}
        <text 
          x="50" 
          y="52" 
          textAnchor="middle" 
          fontSize="11" 
          fontFamily="monospace" 
          fontWeight="900"
          letterSpacing="0.05em"
          className="fill-[#F5F4F0] group-hover:fill-neutral-900 transition-colors duration-300 select-none"
        >
          05
        </text>
      </svg>
    </a>
  )
}
