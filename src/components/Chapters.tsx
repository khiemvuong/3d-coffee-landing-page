import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/useAppStore'

/* ─── Shared animation wrapper ─── */
function ChapterContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Chapter 0: Hero ─── */
export function HeroChapter() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <ChapterContent className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-coffee-400 text-xs md:text-sm font-medium tracking-[0.3em] mb-4 uppercase"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="text-gradient block">Brew</span>
            <span className="text-cream-50 block">&</span>
            <span className="text-gradient block">Beyond</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-cream-300/70 text-base md:text-lg leading-relaxed max-w-md mb-8"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex gap-4 pointer-events-auto"
          >
            <a
              href="#chapter-5"
              className="group relative px-7 py-3.5 bg-gradient-to-r from-coffee-600 to-coffee-700 text-cream-50 text-sm font-medium rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,128,46,0.3)]"
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#chapter-3"
              className="px-7 py-3.5 border border-coffee-700/50 text-cream-200 text-sm rounded-full hover:border-coffee-500/80 hover:text-coffee-300 transition-all"
            >
              {t('hero.secondary')}
            </a>
          </motion.div>
        </ChapterContent>
      </div>
    </div>
  )
}

/* ─── Chapter 1: Origin ─── */
export function OriginChapter() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-end">
        <ChapterContent className="max-w-lg text-right">
          <p className="text-emerald-400/80 text-xs tracking-[0.3em] uppercase mb-3">
            01 &mdash; {t('features.origin.title')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream-50 mb-4 leading-tight">
            {t('features.origin.title')}
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-emerald-500/60 ml-auto mb-6" />
          <p className="text-cream-300/60 text-base md:text-lg leading-relaxed">
            {t('features.origin.desc')}
          </p>
          <div className="mt-8 flex justify-end gap-8">
            {[
              { label: 'Dak Lak', value: '1200m' },
              { label: 'Lam Dong', value: '1500m' },
              { label: 'Ethiopia', value: '1800m' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-serif font-bold text-coffee-400">{item.value}</p>
                <p className="text-xs text-cream-400/50 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </ChapterContent>
      </div>
    </div>
  )
}

/* ─── Chapter 2: Process ─── */
export function ProcessChapter() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <ChapterContent className="max-w-lg mx-auto text-center">
          <p className="text-blue-400/80 text-xs tracking-[0.3em] uppercase mb-3">
            02 &mdash; {t('features.brew.title')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream-50 mb-4 leading-tight">
            {t('features.brew.title')}
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mx-auto mb-6" />
          <p className="text-cream-300/60 text-base md:text-lg leading-relaxed">
            {t('features.brew.desc')}
          </p>

          {/* Process steps */}
          <div className="mt-10 flex justify-center gap-6 md:gap-10">
            {[
              { step: '01', label: 'Thu hoạch' },
              { step: '02', label: 'Sơ chế' },
              { step: '03', label: 'Rang' },
              { step: '04', label: 'Pha' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ amount: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center mb-2">
                  <span className="text-blue-400/80 text-sm font-mono">{item.step}</span>
                </div>
                <span className="text-cream-300/50 text-xs">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </ChapterContent>
      </div>
    </div>
  )
}

/* ─── Chapter 3: Roast ─── */
export function RoastChapter() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <ChapterContent className="max-w-lg">
          <p className="text-orange-400/80 text-xs tracking-[0.3em] uppercase mb-3">
            03 &mdash; {t('features.roast.title')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream-50 mb-4 leading-tight">
            {t('features.roast.title')}
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-orange-500/60 to-transparent mb-6" />
          <p className="text-cream-300/60 text-base md:text-lg leading-relaxed">
            {t('features.roast.desc')}
          </p>

          {/* Temperature gauge */}
          <div className="mt-10 space-y-4">
            {[
              { label: 'Light Roast', temp: '196°C', width: '45%' },
              { label: 'Medium Roast', temp: '210°C', width: '65%' },
              { label: 'Dark Roast', temp: '230°C', width: '90%' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ amount: 0.5 }}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-cream-300/60">{item.label}</span>
                  <span className="text-orange-400/80 font-mono">{item.temp}</span>
                </div>
                <div className="h-1 bg-coffee-950/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 1, ease: 'easeOut' }}
                    viewport={{ amount: 0.5 }}
                    className="h-full bg-gradient-to-r from-orange-600 to-red-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </ChapterContent>
      </div>
    </div>
  )
}

/* ─── Chapter 4: Experience ─── */
export function ExperienceChapter() {
  const { t } = useTranslation()
  return (
    <div className="h-screen flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-end">
        <ChapterContent className="max-w-lg text-right">
          <p className="text-coffee-400/80 text-xs tracking-[0.3em] uppercase mb-3">
            04 &mdash; {t('about.title')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-cream-50 mb-4 leading-tight">
            {t('about.title')}
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-coffee-500/60 ml-auto mb-6" />
          <p className="text-cream-300/60 text-base md:text-lg leading-relaxed">
            {t('about.description')}
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { value: '12+', label: t('about.stats.years') },
              { value: '50K+', label: t('about.stats.customers') },
              { value: '30+', label: t('about.stats.beans') },
              { value: '2000+', label: t('about.stats.cups') },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ amount: 0.5 }}
                className="text-right"
              >
                <p className="text-3xl font-serif font-bold text-gradient">{stat.value}</p>
                <p className="text-xs text-cream-400/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ChapterContent>
      </div>
    </div>
  )
}

/* ─── Chapter 5: Menu ─── */
export function MenuChapter() {
  const { t } = useTranslation()

  const menuItems = [
    { key: 'espresso', emoji: '' },
    { key: 'cappuccino', emoji: '' },
    { key: 'pourover', emoji: '' },
    { key: 'coldbrew', emoji: '' },
    { key: 'latte', emoji: '' },
    { key: 'vietnamese', emoji: '' },
  ]

  return (
    <div className="h-screen flex items-center pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <ChapterContent className="w-full">
          <p className="text-coffee-400/80 text-xs tracking-[0.3em] uppercase mb-3 text-center">
            05 &mdash; {t('menu.title')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream-50 mb-2 text-center leading-tight">
            {t('menu.title')}
          </h2>
          <p className="text-cream-300/50 text-sm text-center mb-10">{t('menu.subtitle')}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ amount: 0.3 }}
                className="pointer-events-auto group cursor-pointer p-4 rounded-2xl border border-coffee-900/30 bg-coffee-950/20 backdrop-blur-sm hover:border-coffee-600/50 hover:bg-coffee-950/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-cream-100 group-hover:text-coffee-300 transition-colors leading-tight">
                    {t(`menu.items.${item.key}.name`)}
                  </h3>
                  <span className="text-coffee-400 text-xs font-mono whitespace-nowrap ml-2">
                    {t(`menu.items.${item.key}.price`)}
                  </span>
                </div>
                <p className="text-cream-400/40 text-xs leading-relaxed">
                  {t(`menu.items.${item.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </ChapterContent>
      </div>
    </div>
  )
}
