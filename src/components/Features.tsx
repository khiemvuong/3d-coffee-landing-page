import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Leaf, Flame, Coffee, Clock } from 'lucide-react'

const icons = [Leaf, Flame, Coffee, Clock]
const keys = ['origin', 'roast', 'brew', 'fresh'] as const

export default function Features() {
  const { t } = useTranslation()

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,128,46,0.06)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('features.title')}
          </h2>
          <p className="text-cream-300/60 text-lg max-w-lg mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-8 text-center group hover:border-coffee-600/30 transition-all duration-500"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-coffee-900/50 flex items-center justify-center group-hover:bg-coffee-800/60 transition-colors">
                  <Icon className="w-7 h-7 text-coffee-400" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-cream-100 mb-3">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="text-cream-300/50 text-sm leading-relaxed">
                  {t(`features.${key}.desc`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
