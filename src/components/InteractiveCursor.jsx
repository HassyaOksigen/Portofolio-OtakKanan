import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * ============================================================================
 * KONFIGURASI SINGLE BLACK DOT CURSOR (MINIMALIST)
 * ============================================================================
 */
export const CURSOR_CONFIG = {
  DOT_SIZE: 9,          // Ukuran titik hitam dalam pixel (8px - 10px)
  DOT_COLOR: '#111111', // Warna solid titik hitam murni
  HOVER_SCALE: 1.5,     // Perbesaran saat mengarah ke foto atau tombol/link
}

/**
 * InteractiveCursor Component
 * Minimalist Single Black Dot Cursor:
 * - Single solid black dot (8px - 10px) tracking cursor with 1:1 precision.
 * - Smoothly scales up (~1.5x) when hovering over interactive elements or the profile photo.
 * - 100% clean: Zero text labels, zero outer rings, zero green trail lines.
 * - Automatically disabled on touchscreens.
 */
export default function InteractiveCursor({ config = {} }) {
  const cfg = { ...CURSOR_CONFIG, ...config }

  const [isTouch, setIsTouch] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Direct mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Silky smooth spring interpolation with tight precision (zero perceptible lag)
  const springConfig = {
    damping: 38,
    stiffness: 950,
    mass: 0.08,
  }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Detect mobile / touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsHovered(false)
    }

    const handleMouseEnter = () => setIsVisible(true)

    // Deteksi hover pada foto profil, tombol, link, atau kartu interaktif
    const handleMouseOver = (e) => {
      const interactiveTarget = e.target.closest(
        'a, button, [role="button"], input, .interactive-card, [data-cursor="photo"]'
      )
      setIsHovered(!!interactiveTarget)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible, mouseX, mouseY])

  if (isTouch) return null

  // Hitung skala berdasarkan kondisi hover dan klik
  const currentScale = isClicked 
    ? (isHovered ? cfg.HOVER_SCALE * 0.8 : 0.8) 
    : (isHovered ? cfg.HOVER_SCALE : 1)

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* SINGLE SOLID BLACK DOT CURSOR */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: cfg.DOT_SIZE,
          height: cfg.DOT_SIZE,
          backgroundColor: cfg.DOT_COLOR,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: currentScale,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 26,
        }}
      />
    </div>
  )
}
