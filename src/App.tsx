import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const About = lazy(() => import('./components/About'))
const Journey = lazy(() => import('./components/Journey'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const CommandPalette = lazy(() => import('./components/CommandPalette'))
const CursorGlow = lazy(() => import('./components/CursorGlow'))

export default function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('visited')
  })

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  const handleLoaderComplete = () => {
    sessionStorage.setItem('visited', '1')
    setLoading(false)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div
        className="min-h-screen bg-[#070707] text-white relative"
        style={loading ? { visibility: 'hidden', pointerEvents: 'none' } : undefined}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-500 focus:text-white focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <CursorGlow />
          <CommandPalette />
        </Suspense>
        <Navbar />
        <main id="main-content" aria-label="Dolev Atik portfolio sections">
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Journey />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
