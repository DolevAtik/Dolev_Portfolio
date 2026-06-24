import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import CursorGlow from './components/CursorGlow'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          className="min-h-screen bg-[#070707] text-white relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CursorGlow />
          <CommandPalette />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Journey />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
