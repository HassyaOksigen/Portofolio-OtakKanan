import { useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * useScrollFocus Hook
 * 
 * Pola Reusable Scroll-Driven Focus & Fade Animation (Framer Motion useScroll):
 * 1. Opacity: Berubah dari 0 (saat masuk dari bawah) ➔ 1 (saat berada di tengah layar/fokus) ➔ 0 (saat digulir ke luar atas).
 * 2. Scale: Berubah dari 0.90 (zoom in saat masuk) ➔ 1.0 (posisi penuh) ➔ mengecil ke 0.78 (scale down saat keluar).
 * 3. Y-Translate: Efek parallax naik-turun halus (transform Y) yang mulus.
 * 
 * Menghasilkan performa 60 FPS murni via GPU composite transforms tanpa layout shift.
 */
export function useScrollFocus(targetRef, options = {}) {
  const {
    offset = ["start end", "end start"],
    springConfig = { damping: 28, stiffness: 180, mass: 0.4 },
    enterProgress = 0.15,
    focusProgress = 0.38,
    exitStartProgress = 0.65,
    exitEndProgress = 0.90,
    startScale = 0.90,
    endScale = 0.78,
    yOffset = 40,
  } = options

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  })

  // Spring lerp smoothing for buttery 60fps interaction
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  // 1. Opacity: 0 (bottom) -> 1 (center focus) -> 0 (top exit)
  const opacity = useTransform(
    smoothProgress,
    [enterProgress, focusProgress, exitStartProgress, exitEndProgress],
    [0, 1, 1, 0]
  )

  // 2. Scale: 0.90 (in) -> 1.0 (focus) -> 0.78 (out)
  const scale = useTransform(
    smoothProgress,
    [enterProgress, focusProgress, exitStartProgress, exitEndProgress],
    [startScale, 1.0, 1.0, endScale]
  )

  // 3. Y-Translate: Parallax naik-turun mulus
  const y = useTransform(
    smoothProgress,
    [enterProgress, (focusProgress + exitStartProgress) / 2, exitEndProgress],
    [yOffset, 0, -yOffset]
  )

  return {
    scrollYProgress,
    smoothProgress,
    opacity,
    scale,
    y,
    motionProps: {
      style: {
        opacity,
        scale,
        y,
        transformOrigin: 'center center',
      },
    },
  }
}
