import React, { useState, useEffect } from 'react'

/**
 * FloatingInfoCard Component
 * Sharp-cornered floating telemetry card positioned at bottom-left.
 * Features live time, role specifications, location coordinates, and semester details.
 */
export default function FloatingInfoCard({
  role = "Full-Stack / Backend Developer",
  location = "Indonesia",
  semester = "Semester 5",
  className = ""
}) {
  // Live local time for Indonesia (WIB - UTC+7)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now)
      setTime(formatted + ' WIB')
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className={`interactive-card relative rounded-none border border-neutral-900/15 bg-white/85 backdrop-blur-md p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] max-w-[320px] sm:max-w-[360px] w-full transition-all duration-300 hover:border-neutral-900/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group ${className}`}
    >
      {/* Precision corner markers (Brutalist / Racing HUD style) */}
      <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-neutral-900 pointer-events-none" />
      <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-neutral-900 pointer-events-none" />
      <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-neutral-900 pointer-events-none" />
      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-neutral-900 pointer-events-none" />

      {/* Card Header: Category & Live Time */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200/80 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        <span className="flex items-center gap-1.5 font-semibold text-neutral-800">
          <span className="w-1.5 h-1.5 bg-neutral-900 inline-block" />
          SPECIFICATION // 01
        </span>
        <span className="tabular-nums font-mono text-neutral-600">
          {time || '12:00:00 WIB'}
        </span>
      </div>

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
        <div className="flex items-baseline justify-between gap-1 pt-1 border-t border-neutral-100">
          <span className="text-neutral-400 uppercase tracking-wider text-[11px]">LOCATION:</span>
          <div className="flex items-center gap-1.5 text-neutral-900 font-semibold">
            <span>{location}</span>
            <span className="text-[10px] text-neutral-400 font-normal">[07°S, 110°E]</span>
          </div>
        </div>

        {/* SEMESTER */}
        <div className="flex items-baseline justify-between gap-1 pt-1 border-t border-neutral-100">
          <span className="text-neutral-400 uppercase tracking-wider text-[11px]">EDUCATION:</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-neutral-900">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            {semester}
          </span>
        </div>
      </div>

      {/* Tech Stack Mini Tags */}
      <div className="mt-3.5 pt-3 border-t border-neutral-200/80 flex flex-wrap gap-1.5">
        {['Golang', 'Node.js', 'PostgreSQL', 'React', 'Docker'].map((tech) => (
          <span 
            key={tech}
            className="px-1.5 py-0.5 text-[10px] font-mono tracking-wider bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-colors duration-200 text-neutral-700 cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
