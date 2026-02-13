import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
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

export default function App() {
  const { isLoading, setLoading } = useAppStore()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [setLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {/* Fixed fullscreen 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 1, 7], fov: 45, near: 0.1, far: 50 }}
          style={{ background: '#0a0605' }}
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

        {/* Chapters - each takes full viewport height via ScrollManager */}
        <div className="relative">
          {/* Invisible scroll spacers */}
          <ScrollManager />

          {/* Visible overlays pinned to each chapter */}
          <div className="absolute inset-0 pointer-events-none">
            <HeroChapter />
            <OriginChapter />
            <ProcessChapter />
            <RoastChapter />
            <ExperienceChapter />
            <MenuChapter />
          </div>
        </div>
      </div>
    </>
  )
}
