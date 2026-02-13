import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function FloatingCoffeeBeanScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 3]} intensity={1} color="#f4deb3" />
      <pointLight position={[-2, 2, 2]} intensity={0.5} color="#d4802e" />
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <group>
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#3a1a0e" roughness={0.6} />
          </mesh>
          <mesh scale={[1, 1, 0.65]}>
            <sphereGeometry args={[0.82, 32, 32]} />
            <meshStandardMaterial color="#6c351e" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.6]}>
            <boxGeometry args={[0.04, 1.1, 0.04]} />
            <meshStandardMaterial color="#1a0a05" roughness={0.9} />
          </mesh>
        </group>
      </Float>
    </>
  )
}

const stats = [
  { value: '12+', key: 'years' },
  { value: '50K+', key: 'customers' },
  { value: '30+', key: 'beans' },
  { value: '2000+', key: 'cups' },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,128,46,0.06)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Bean */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,128,46,0.1)_0%,transparent_70%)]" />
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
              <Suspense fallback={null}>
                <FloatingCoffeeBeanScene />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-4">
              {t('about.title')}
            </h2>
            <p className="text-coffee-500 text-sm tracking-[0.2em] mb-6">
              {t('about.subtitle')}
            </p>
            <p className="text-cream-300/60 leading-relaxed mb-10">
              {t('about.description')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="font-serif text-2xl font-bold text-coffee-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-cream-300/40 text-xs tracking-wide">
                    {t(`about.stats.${stat.key}`)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
