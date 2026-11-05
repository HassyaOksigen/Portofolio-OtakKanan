import React, { useState } from 'react'

/**
 * StatusBadge Component
 * Interactive badge indicating availability for internship.
 * Features a pulsing emerald live beacon, brutalist sharp border,
 * and click-to-copy / contact popup interaction.
 */
export default function StatusBadge({ 
  email = "hassya.dev@gmail.com",
  statusText = "AVAILABLE FOR INTERNSHIP"
}) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCopy = (e) => {
    e.preventDefault()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Availability Status - Click to copy contact email"
        className={`group relative flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 border text-xs sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 select-none ${
          copied 
            ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' 
            : isHovered
              ? 'bg-white border-neutral-900 shadow-sm -translate-y-0.5'
              : 'bg-white/70 backdrop-blur-sm border-neutral-300 hover:border-neutral-800 text-neutral-800'
        }`}
      >
        {/* Pulsing Green Indicator Dot */}
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000" />
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </span>

        {/* Status Text (Responsive label) */}
        <span className="font-semibold tracking-wide sm:tracking-widest">
          {copied ? (
            <span className="flex items-center gap-1.5 text-emerald-400">
              EMAIL COPIED!
            </span>
          ) : (
            <>
              <span className="hidden sm:inline">{statusText}</span>
              <span className="inline sm:hidden">AVAILABLE</span>
            </>
          )}
        </span>

        {/* Hover Arrow Hint */}
        <span className={`text-[10px] text-neutral-400 group-hover:text-neutral-900 transition-transform duration-200 ${isHovered ? 'translate-x-0.5' : ''}`}>
          ↗
        </span>
      </button>

      {/* Floating tooltip popover hint */}
      <div 
        className={`absolute right-0 top-full mt-1.5 pointer-events-none transition-all duration-200 z-50 ${
          isHovered && !copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        }`}
      >
        <div className="bg-neutral-900 text-white text-[10px] font-mono py-1 px-2.5 border border-neutral-700 whitespace-nowrap shadow-xl flex items-center gap-2">
          <span className="text-emerald-400 font-bold">CLICK:</span>
          <span>Copy {email}</span>
        </div>
      </div>
    </div>
  )
}
