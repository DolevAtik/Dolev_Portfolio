import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, rgba(168,85,247,0.02) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Small precise glow */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
    </>
  )
}
