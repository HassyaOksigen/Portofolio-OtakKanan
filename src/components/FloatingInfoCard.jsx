import React from 'react'

/**
 * FloatingInfoCard Component
 * Sharp-cornered floating telemetry card positioned at bottom-left.
 * Features role specifications, location, and semester details.
 */
export default function FloatingInfoCard({
  role = "Full-Stack Developer",
  location = "Indonesia, Surabaya",
  semester = "Semester 5",
  className = ""
}) {
  return (
    <div 
      className={`interactive-card relative rounded-none border border-neutral-900/15 bg-white/85 backdrop-blur-md p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] max-w-[320px] sm:max-w-[360px] w-full transition-all duration-300 hover:border-neutral-900/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group ${className}`}
    >
      {/* Precision corner markers (Brutalist / Racing HUD style) */}
      <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-neutral-900 pointer-events-none" />
      <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-neutral-900 pointer-events-none" />
      <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-neutral-900 pointer-events-none" />
      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-neutral-900 pointer-events-none" />

      {/* Main Info Rows */}
      <div className="space-y-2.5 text-xs sm:text-xs font-mono">
        {/* ROLE */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span className="text-neutral-400 uppercase tracking-wider text-[11px]">ROLE:</span>
          <span className="font-bold text-neutral-900 tracking-tight sm:text-right">
            {role}
          </span>
        </div>

        {/* LOCATION */}
        <div className="flex items-baseline justify-between gap-1 pt-2 border-t border-neutral-100">
          <span className="text-neutral-400 uppercase tracking-wider text-[11px]">LOCATION:</span>
          <span className="text-neutral-900 font-semibold sm:text-right">
            {location}
          </span>
        </div>

        {/* SEMESTER */}
        <div className="flex items-baseline justify-between gap-1 pt-2 border-t border-neutral-100">
          <span className="text-neutral-400 uppercase tracking-wider text-[11px]">EDUCATION:</span>
          <span className="font-bold text-neutral-900">
            {semester}
          </span>
        </div>
      </div>
    </div>
  )
}
