import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import CursorGlow from './components/CursorGlow'
import { isMobileViewport } from './lib/mobile'

const Journey = lazy(() => import('./components/Journey'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))

if (isMobileViewport()) {
  void import('./components/Journey')
  void import('./components/Projects')
  void import('./components/Skills')
  void import('./components/Education')
  void import('./components/Contact')
}

function BelowFoldSections() {
  const [mounted, setMounted] = useState(() => !isMobileViewport())

  useEffect(() => {
    if (mounted) return
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [mounted])

  if (!mounted) return null

  return (
    <Suspense fallback={null}>
      <Journey />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </Suspense>
  )
}

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

      <div className="min-h-screen bg-[#070707] text-white relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-500 focus:text-white focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>
        {typeof window !== 'undefined' && window.innerWidth >= 768 && <CursorGlow />}
        <CommandPalette />
        <Navbar />
        <main id="main-content" aria-label="Dolev Atik portfolio sections">
          <Hero />
          <About />
          <BelowFoldSections />
        </main>
        <Footer />
      </div>
    </>
  )
}
