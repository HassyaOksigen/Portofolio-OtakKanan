import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * ScrollFocusHeader Component
 * Komponen reusable untuk membungkus judul section atau blok teks:
 * - Zoom-in & Fade-in saat elemen masuk ke viewport dari bawah (scale 0.90 -> 1.0, opacity 0 -> 1)
 * - Berada dalam fokus penuh (scale 1.0, opacity 1.0) saat dibaca di tengah layar
 * - Mengecil dan memudar secara alami saat digulir ke atas (scale 1.0 -> 0.78, opacity 1 -> 0)
 * - Menerapkan translasi sumbu Y (parallax) yang mulus
 * - Bebas layout shift (berbasis CSS transform & opacity GPU composite)
 */
export default function ScrollFocusHeader({
  children,
  className = "",
  containerRef,
  offset = ["start end", "end start"],
  enterProgress = 0.15,
  focusProgress = 0.38,
  exitStartProgress = 0.65,
  exitEndProgress = 0.90,
  startScale = 0.90,
  endScale = 0.78,
  yOffset = 35,
  staggerDelay = 0,
}) {
  const localRef = useRef(null)
  const target = containerRef || localRef

  const { scrollYProgress } = useScroll({
    target,
    offset,
  })

  const smooth = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  })

  // Perhitungkan sedikit offset stagger jika ada
  const startP = Math.min(enterProgress + staggerDelay, 0.3)
  const focusP = Math.min(focusProgress + staggerDelay, 0.5)

  const opacity = useTransform(smooth, [startP, focusP, exitStartProgress, exitEndProgress], [0, 1, 1, 0])
  const scale = useTransform(smooth, [startP, focusP, exitStartProgress, exitEndProgress], [startScale, 1.0, 1.0, endScale])
  const y = useTransform(smooth, [startP, (focusP + exitStartProgress) / 2, exitEndProgress], [yOffset, 0, -yOffset])

  return (
    <motion.div
      ref={containerRef ? undefined : localRef}
      style={{
        opacity,
        scale,
        y,
        transformOrigin: "center center",
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
