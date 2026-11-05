import React from 'react'

/**
 * TopographyBackground Component
 * Renders smooth contour elevation lines, cartographic elevation labels,
 * and subtle technical crosshairs inspired by high-end automotive & editorial layouts.
 */
export default function TopographyBackground({ mousePosition = { x: 0, y: 0 } }) {
  // Parallax subtle offset calculation
  const offsetX = (mousePosition.x - 0.5) * 18
  const offsetY = (mousePosition.y - 0.5) * 18

  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none overflow-hidden transition-transform duration-700 ease-out"
      style={{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Background off-white base with subtle grain/gradient */}
      <div className="absolute inset-0 bg-[#F5F4F0]" />
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Subtle radial spotlight following mouse */}
      <div 
        className="absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.9), transparent 70%)`
        }}
      />

      {/* SVG Topographic Contour Lines */}
      <svg
        className="absolute inset-0 w-full h-full text-neutral-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle center fade mask so portrait subject pops cleanly */}
          <radialGradient id="centerFade" cx="50%" cy="65%" r="45%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#000" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </radialGradient>
          <mask id="topoMask">
            <rect width="100%" height="100%" fill="url(#centerFade)" />
          </mask>
        </defs>

        <g mask="url(#topoMask)" fill="none" stroke="currentColor">
          {/* Contour Line 1 - Deep outer ridge */}
          <path
            d="M -100 120 C 300 80, 520 280, 850 200 C 1180 120, 1420 30, 2020 90"
            strokeWidth="0.75"
            strokeOpacity="0.08"
          />
          {/* Contour Line 2 */}
          <path
            d="M -100 200 C 320 160, 550 360, 870 270 C 1190 180, 1450 110, 2020 160"
            strokeWidth="0.75"
            strokeOpacity="0.07"
          />
          {/* Contour Line 3 - Index contour */}
          <path
            d="M -100 290 C 340 240, 580 430, 900 340 C 1220 250, 1480 180, 2020 240"
            strokeWidth="1.2"
            strokeOpacity="0.12"
          />

          {/* Contour Line 4 */}
          <path
            d="M -100 380 C 350 320, 600 500, 930 420 C 1260 340, 1500 260, 2020 320"
            strokeWidth="0.75"
            strokeOpacity="0.07"
          />

          {/* Contour Line 5 */}
          <path
            d="M -100 480 C 370 410, 630 580, 970 510 C 1310 440, 1530 350, 2020 410"
            strokeWidth="0.75"
            strokeOpacity="0.08"
          />

          {/* Contour Line 6 - Index contour */}
          <path
            d="M -100 590 C 380 500, 660 670, 1020 610 C 1380 550, 1560 450, 2020 510"
            strokeWidth="1.2"
            strokeOpacity="0.11"
          />

          {/* Left Basin Nested Contours */}
          <path
            d="M -80 720 C 120 680, 320 740, 420 890 C 500 1010, 350 1150, 100 1150 C -50 1150, -100 950, -80 720 Z"
            strokeWidth="0.75"
            strokeOpacity="0.07"
          />
          <path
            d="M -40 760 C 140 720, 300 770, 380 900 C 450 1000, 320 1110, 120 1110 C -20 1110, -60 960, -40 760 Z"
            strokeWidth="1.1"
            strokeOpacity="0.1"
          />
          <path
            d="M 0 810 C 160 770, 280 810, 340 910 C 400 990, 290 1070, 140 1070 C 10 1070, -20 970, 0 810 Z"
            strokeWidth="0.75"
            strokeOpacity="0.06"
          />

          {/* Right Ridge Elevation Contours */}
          <path
            d="M 1200 1150 C 1300 920, 1500 820, 1750 860 C 1900 880, 2000 950, 2040 1020"
            strokeWidth="0.75"
            strokeOpacity="0.08"
          />
          <path
            d="M 1280 1150 C 1370 960, 1540 870, 1760 900 C 1890 920, 1980 980, 2020 1050"
            strokeWidth="1.1"
            strokeOpacity="0.1"
          />
          <path
            d="M 1360 1150 C 1440 1000, 1580 920, 1770 945 C 1880 960, 1960 1010, 2000 1080"
            strokeWidth="0.75"
            strokeOpacity="0.07"
          />

          {/* Midground organic undulating tracks */}
          <path
            d="M -80 840 C 350 780, 700 870, 1150 780 C 1500 710, 1750 760, 2020 730"
            strokeWidth="0.75"
            strokeOpacity="0.06"
          />
          <path
            d="M -80 940 C 370 880, 720 950, 1180 860 C 1530 790, 1780 830, 2020 800"
            strokeWidth="1.2"
            strokeOpacity="0.09"
          />
        </g>

        {/* Topographic Altitude Markers / Telemetry Numbers */}
        <g className="font-mono text-[9px] fill-neutral-600/40 select-none" style={{ letterSpacing: '0.15em' }}>
          <text x="350" y="235">ELEV. 240M</text>
          <text x="895" y="335">ELEV. 320M</text>
          <text x="1475" y="175">ELEV. 380M</text>
          <text x="375" y="495">ELEV. 420M</text>
          <text x="1015" y="605">ELEV. 480M</text>
          <text x="1755" y="895">ELEV. 540M</text>
          <text x="1175" y="855">INDEX // 08-B</text>
        </g>

        {/* Technical Coordinate Crosshairs & Grid Ticks */}
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.15">
          {/* Top Left crosshair */}
          <line x1="120" y1="105" x2="120" y2="125" />
          <line x1="110" y1="115" x2="130" y2="115" />

          {/* Top Right crosshair */}
          <line x1="1800" y1="105" x2="1800" y2="125" />
          <line x1="1790" y1="115" x2="1810" y2="115" />

          {/* Center Left crosshair */}
          <line x1="80" y1="540" x2="80" y2="560" />
          <line x1="70" y1="550" x2="90" y2="550" />

          {/* Center Right crosshair */}
          <line x1="1840" y1="540" x2="1840" y2="560" />
          <line x1="1830" y1="550" x2="1850" y2="550" />

          {/* Bottom Right crosshair */}
          <line x1="1780" y1="980" x2="1780" y2="1000" />
          <line x1="1770" y1="990" x2="1790" y2="990" />
        </g>
      </svg>

      {/* Subtle fine technical grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}
      />
    </div>
  )
}
