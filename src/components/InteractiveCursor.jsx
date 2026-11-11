import React, { useEffect, useRef, useState } from 'react'
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
  CLICK_SCALE: 0.8,     // Skala halus saat mouse ditekan (mousedown)
}

/**
 * InteractiveCursor Component
 * Minimalist Single Black Dot Cursor:
 * - Single solid black dot (8px - 10px) tracking cursor with 1:1 precision.
 * - Smoothly scales up (~1.5x) on hover and subtly compresses (0.8x) on mousedown without fading out.
 * - mix-blend-difference berada di root layer z-[99999] agar tidak terisolasi saat animasi GPU berjalan.
 * - pointer-events-none pada kontainer & titik agar klik selalu menembus ke elemen di bawahnya.
 * - Listener global dipasang di level window tanpa re-bind saat state berubah.
 */
export default function InteractiveCursor({ config = {} }) {
  const cfg = { ...CURSOR_CONFIG, ...config }

  const [isTouch, setIsTouch] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Ref untuk membaca status klik secara sinkron di dalam event listener window
  const isClickedRef = useRef(false)

  // Direct mouse coordinates (awal di luar viewport hingga event pertama masuk)
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
    // Nonaktifkan kursor kustom hanya pada perangkat touch-only
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      isClickedRef.current = true
      setIsClicked(true)
      setIsVisible(true) // Pastikan kursor tetap terlihat (opacity: 1) saat diklik
    }

    const handleMouseUp = () => {
      isClickedRef.current = false
      setIsClicked(false)
      setIsVisible(true)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      // Jangan sembunyikan kursor jika pengguna sedang menekan tombol mouse
      if (isClickedRef.current) return
      setIsVisible(false)
      setIsHovered(false)
    }

    const handleWindowBlur = () => {
      isClickedRef.current = false
      setIsClicked(false)
    }

    // Deteksi hover pada foto profil, tombol, link, atau kartu interaktif
    const handleMouseOver = (e) => {
      const target = e.target
      if (!(target instanceof Element)) {
        setIsHovered(false)
        return
      }
      const interactiveTarget = target.closest(
        'a, button, [role="button"], input, .interactive-card, [data-cursor="photo"]'
      )
      setIsHovered(Boolean(interactiveTarget))
    }

    // Semua event listener global terpasang stabil di level window
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null

  // Hitung skala halus saat diklik (0.8) dan saat hover (1.5x)
  const currentScale = isClicked
    ? (isHovered ? cfg.HOVER_SCALE * cfg.CLICK_SCALE : cfg.CLICK_SCALE)
    : (isHovered ? cfg.HOVER_SCALE : 1)

  // Opacity kursor selalu 1 saat terlihat atau saat diklik
  const dotOpacity = isClicked || isVisible ? 1 : 0

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] mix-blend-difference select-none">
      {/* SINGLE ADAPTIVE DOT CURSOR (Black on light background, White on dark background) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none bg-white will-change-transform"
        style={{
          width: cfg.DOT_SIZE,
          height: cfg.DOT_SIZE,
          marginLeft: -(cfg.DOT_SIZE / 2),
          marginTop: -(cfg.DOT_SIZE / 2),
          x: cursorX,
          y: cursorY,
          opacity: dotOpacity,
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
