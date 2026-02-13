import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowDown } from 'lucide-react'
import CoffeeScene from './CoffeeScene'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0605] via-[#1a100c] to-[#0a0605]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,128,46,0.08)_0%,transparent_70%)]" />

      {/* 3D Canvas */}
      <div className="absolute right-0 top-0 w-full md:w-[55%] h-full">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <CoffeeScene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-coffee-500 text-sm tracking-[0.3em] font-medium mb-4"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="text-gradient">{t('hero.title')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-cream-300/70 text-lg leading-relaxed mb-10 max-w-md"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#menu"
              className="px-8 py-3.5 bg-coffee-700 hover:bg-coffee-600 text-cream-50 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-coffee-700/30 tracking-wide"
            >
              {t('hero.cta')}
            </a>
            <a
              href="#menu"
              className="px-8 py-3.5 border border-coffee-700/50 text-coffee-300 hover:bg-coffee-900/30 rounded-full transition-all duration-300 tracking-wide"
            >
              {t('hero.secondary')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-coffee-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
