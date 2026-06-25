import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMobileViewport } from '../lib/mobile'

export default function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px 300px 0px' })
  const isMobile = useMobileViewport()

  if (isMobile) return <>{children}</>

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
