import { Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Preload, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import Navbar from './components/Navbar'
import { ScrollManager } from './components/ScrollManager'
import CoffeeScene3D from './components/CoffeeScene3D'
import ChapterIndicator from './components/ChapterIndicator'
import ScrollHint from './components/ScrollHint'
import ProgressBar from './components/ProgressBar'
import LoadingScreen from './components/LoadingScreen'
import {
  HeroChapter,
  OriginChapter,
  ProcessChapter,
  RoastChapter,
  ExperienceChapter,
  MenuChapter,
} from './components/Chapters'
import { useAppStore } from './store/useAppStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const { isLoading, setLoading } = useAppStore()
  const { progress } = useProgress()
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)
  
  // Initialize smooth scroll
  useSmoothScroll()

  // Minimum intro duration
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Sync loading state with models + timer
  useEffect(() => {
    if (progress === 100 && minTimeElapsed) {
      // Small extra delay for a smoother transition after everything is ready
      const timeout = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [progress, minTimeElapsed, setLoading])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
      {/* Fixed fullscreen 3D Canvas */}
      <div className="fixed inset-0 z-0 bg-[#faf5ef]">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
          }}
          camera={{ position: [0, 1, 7], fov: 45, near: 0.1, far: 50 }}
        >
          <Suspense fallback={null}>
            <CoffeeScene3D />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable overlay content */}
      <div className="relative z-10">
        <ProgressBar />
        <Navbar />
        <ChapterIndicator />
        <ScrollHint />

        {/* Chapters - following natural scroll flow */}
        <div className="relative">
          <ScrollManager />
          <HeroChapter />
          <OriginChapter />
          <ProcessChapter />
          <RoastChapter />
          <ExperienceChapter />
          <MenuChapter />
        </div>
      </div>
    </motion.div>
    </>
  )
}
