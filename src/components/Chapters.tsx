import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

/* ─── Staggered reveal for child elements ─── */
function RevealGroup({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, once: false })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 0: HERO
   ══════════════════════════════════════════════════════════════ */
export function HeroChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -80])
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const ctaY = useTransform(scrollYProgress, [0, 0.5], [0, 40])

  return (
    <div ref={ref} className="h-[140vh] relative">
      {/* sticky inner: top-0 + pt-24 ensures content clears the fixed navbar (~80px) */}
      <div className="sticky top-0 h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24">
          <div className="chapter-panel max-w-xl">
            {/* Subtitle */}
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="text-coffee-500 text-xs md:text-sm font-medium tracking-[0.4em] mb-4 uppercase"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Main title — refined, not oversized */}
            <motion.h1
              style={{ y: titleY }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] mb-6"
            >
              <span className="text-gradient block">Brew</span>
              <span className="text-coffee-400/30 block text-3xl md:text-4xl lg:text-5xl italic font-light my-0.5">&</span>
              <span className="text-gradient block">Beyond</span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-32 h-[2px] bg-gradient-to-r from-coffee-500 via-coffee-400 to-transparent mb-6 origin-left"
            />

            {/* Description */}
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="text-coffee-700/80 text-base md:text-lg leading-relaxed max-w-md mb-8"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              style={{ y: ctaY }}
              className="flex flex-wrap gap-3 pointer-events-auto"
            >
              <a
                href="#chapter-5"
                className="group relative px-8 py-3 bg-gradient-to-r from-coffee-600 to-coffee-700 text-cream-50 text-sm font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_8px_40px_rgba(168,90,36,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">{t('hero.cta')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#chapter-3"
                className="px-8 py-3 border-2 border-coffee-300/60 text-coffee-700 text-sm font-semibold rounded-full hover:border-coffee-500 hover:text-coffee-600 hover:bg-coffee-50/40 transition-all duration-300"
              >
                {t('hero.secondary')}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 1: ORIGIN — content RIGHT, cup LEFT
   ══════════════════════════════════════════════════════════════ */
export function OriginChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const headingX = useTransform(scrollYProgress, [0.1, 0.35], [120, 0])
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const bodyOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const statsY = useTransform(scrollYProgress, [0.25, 0.45], [60, 0])

  return (
    <div ref={ref} className="h-[140vh] relative">
      <div className="sticky top-0 h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex justify-end">
          <div className="chapter-panel max-w-xl text-right">
            {/* Chapter label */}
            <RevealGroup>
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-10 h-[2px] bg-gradient-to-l from-emerald-500/70 to-transparent" />
                <span className="text-emerald-600/90 text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                  01 &mdash; {t('features.origin.title')}
                </span>
              </div>
            </RevealGroup>

            {/* Heading */}
            <motion.h2
              style={{ x: headingX, opacity: headingOpacity }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-900 mb-4 leading-[0.95]"
            >
              {t('features.origin.title')}
            </motion.h2>

            {/* Decorative line */}
            <div className="w-20 h-[2px] bg-gradient-to-l from-emerald-500/60 via-emerald-400/30 to-transparent ml-auto mb-5" />

            {/* Body text */}
            <motion.p
              style={{ opacity: bodyOpacity }}
              className="text-coffee-700/80 text-base md:text-lg leading-relaxed mb-8"
            >
              {t('features.origin.desc')}
            </motion.p>

            {/* Stats cards */}
            <motion.div
              style={{ y: statsY, opacity: bodyOpacity }}
              className="flex justify-end gap-5"
            >
              {[
                { label: 'Dak Lak', value: '1200m', color: 'text-emerald-700' },
                { label: 'Lam Dong', value: '1500m', color: 'text-emerald-600' },
                { label: 'Ethiopia', value: '1800m', color: 'text-emerald-700' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.7 }}
                  viewport={{ amount: 0.3 }}
                  className="text-center px-4 py-3 rounded-xl bg-white/40 border border-emerald-200/30"
                >
                  <p className={`text-2xl md:text-3xl font-serif font-bold ${item.color}`}>
                    {item.value}
                  </p>
                  <p className="text-xs text-coffee-600/60 mt-1 font-medium">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 2: PROCESS — content LEFT, cup RIGHT-offset
   ══════════════════════════════════════════════════════════════ */
export function ProcessChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const headingY = useTransform(scrollYProgress, [0.1, 0.3], [60, 0])
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  const steps = [
    { step: '01', label: 'Thu hoạch', desc: 'Hái lựa thủ công từng quả chín' },
    { step: '02', label: 'Sơ chế', desc: 'Lên men tự nhiên 48 giờ' },
    { step: '03', label: 'Rang', desc: 'Rang profile riêng từng mẻ' },
    { step: '04', label: 'Pha', desc: 'Chiết xuất chính xác từng giọt' },
  ]

  return (
    <div ref={ref} className="h-[140vh] relative">
      <div className="sticky top-0 h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="chapter-panel max-w-xl">
            {/* Chapter label */}
            <RevealGroup>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sky-600/90 text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                  02 &mdash; {t('features.brew.title')}
                </span>
                <div className="w-10 h-[2px] bg-gradient-to-r from-sky-500/70 to-transparent" />
              </div>
            </RevealGroup>

            {/* Heading */}
            <motion.h2
              style={{ y: headingY, opacity: headingOpacity }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-900 mb-4 leading-[0.95]"
            >
              {t('features.brew.title')}
            </motion.h2>

            <div className="w-20 h-[2px] bg-gradient-to-r from-sky-500/60 via-sky-400/30 to-transparent mb-5" />

            <motion.p
              style={{ opacity: headingOpacity }}
              className="text-coffee-700/80 text-base md:text-lg leading-relaxed mb-8"
            >
              {t('features.brew.desc')}
            </motion.p>

            {/* Process steps — vertical timeline */}
            <div className="space-y-5 relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-sky-400/40 via-sky-300/20 to-transparent" />

              {steps.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ amount: 0.3 }}
                  className="flex items-start gap-5 pl-1"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white/60 border-2 border-sky-400/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(56,152,236,0.08)]">
                    <span className="text-sky-600 text-xs font-bold font-mono">{item.step}</span>
                  </div>
                  <div className="pt-1.5">
                    <h4 className="text-coffee-900 font-semibold text-base md:text-lg mb-1">{item.label}</h4>
                    <p className="text-coffee-600/70 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 3: ROAST — content LEFT, cup RIGHT (dramatic)
   ══════════════════════════════════════════════════════════════ */
export function RoastChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const headingScale = useTransform(scrollYProgress, [0.1, 0.35], [0.85, 1])
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  const roasts = [
    { label: 'Light Roast', temp: '196°C', pct: 45, gradient: 'from-amber-400 to-orange-400' },
    { label: 'Medium Roast', temp: '210°C', pct: 65, gradient: 'from-orange-500 to-orange-600' },
    { label: 'Dark Roast', temp: '230°C', pct: 90, gradient: 'from-orange-600 to-red-600' },
  ]

  return (
    <div ref={ref} className="h-[140vh] relative">
      <div className="sticky top-0 h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="chapter-panel max-w-xl">
            {/* Chapter label */}
            <RevealGroup>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-orange-600/90 text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                  03 &mdash; {t('features.roast.title')}
                </span>
                <div className="w-10 h-[2px] bg-gradient-to-r from-orange-500/70 to-transparent" />
              </div>
            </RevealGroup>

            {/* Heading with scale animation */}
            <motion.h2
              style={{ scale: headingScale, opacity: headingOpacity }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-900 mb-4 leading-[0.95] origin-left"
            >
              {t('features.roast.title')}
            </motion.h2>

            <div className="w-20 h-[2px] bg-gradient-to-r from-orange-500/60 via-amber-400/30 to-transparent mb-5" />

            <motion.p
              style={{ opacity: headingOpacity }}
              className="text-coffee-700/80 text-base md:text-lg leading-relaxed mb-8"
            >
              {t('features.roast.desc')}
            </motion.p>

            {/* Temperature bars — scroll-driven fill */}
            <div className="space-y-6">
              {roasts.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ amount: 0.3 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-coffee-800 font-medium text-base">{item.label}</span>
                    <span className="text-orange-600 font-mono font-bold text-base">{item.temp}</span>
                  </div>
                  <div className="h-2.5 bg-coffee-200/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.2, duration: 1.2, ease: 'easeOut' }}
                      viewport={{ amount: 0.3 }}
                      className={`h-full bg-gradient-to-r ${item.gradient} rounded-full shadow-sm`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 4: EXPERIENCE — content RIGHT, cup LEFT
   ══════════════════════════════════════════════════════════════ */
export function ExperienceChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const headingX = useTransform(scrollYProgress, [0.1, 0.35], [-100, 0])
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const statsScale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1])

  return (
    <div ref={ref} className="h-[140vh] relative">
      <div className="sticky top-0 h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex justify-end">
          <div className="chapter-panel max-w-xl text-right">
            {/* Chapter label */}
            <RevealGroup>
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-10 h-[2px] bg-gradient-to-l from-coffee-500/70 to-transparent" />
                <span className="text-coffee-600/90 text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                  04 &mdash; {t('about.title')}
                </span>
              </div>
            </RevealGroup>

            {/* Heading */}
            <motion.h2
              style={{ x: headingX, opacity: headingOpacity }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-900 mb-4 leading-[0.95]"
            >
              {t('about.title')}
            </motion.h2>

            <div className="w-20 h-[2px] bg-gradient-to-l from-coffee-500/60 via-coffee-400/30 to-transparent ml-auto mb-5" />

            <motion.p
              style={{ opacity: headingOpacity }}
              className="text-coffee-700/80 text-base md:text-lg leading-relaxed mb-8"
            >
              {t('about.description')}
            </motion.p>

            {/* Stats grid */}
            <motion.div
              style={{ scale: statsScale, opacity: headingOpacity }}
              className="grid grid-cols-2 gap-5 origin-right"
            >
              {[
                { value: '12+', label: t('about.stats.years'), accent: 'from-coffee-600 to-coffee-500' },
                { value: '50K+', label: t('about.stats.customers'), accent: 'from-coffee-500 to-amber-500' },
                { value: '30+', label: t('about.stats.beans'), accent: 'from-amber-600 to-coffee-500' },
                { value: '2000+', label: t('about.stats.cups'), accent: 'from-coffee-600 to-orange-500' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ amount: 0.3 }}
                  className="text-right p-5 rounded-2xl bg-white/40 border border-coffee-200/30 hover:border-coffee-300/50 transition-colors"
                >
                  <p className={`text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-coffee-600/60 mt-1.5 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 5: MENU — content CENTER, cup behind/above
   ══════════════════════════════════════════════════════════════ */
export function MenuChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const gridY = useTransform(scrollYProgress, [0.15, 0.4], [80, 0])
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])

  const menuItems = [
    { key: 'espresso' },
    { key: 'cappuccino' },
    { key: 'pourover' },
    { key: 'coldbrew' },
    { key: 'latte' },
    { key: 'vietnamese' },
  ]

  return (
    <div ref={ref} className="h-[140vh] relative">
      <div className="sticky top-0 h-screen flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="chapter-panel w-full max-w-4xl mx-auto">
            {/* Chapter label */}
            <RevealGroup className="text-center mb-4">
              <span className="text-coffee-500/80 text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                05 &mdash; {t('menu.title')}
              </span>
            </RevealGroup>

            {/* Heading */}
            <RevealGroup className="text-center mb-3" delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-900 leading-[0.95]">
                {t('menu.title')}
              </h2>
            </RevealGroup>

            <RevealGroup className="text-center mb-8" delay={0.15}>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-coffee-400/50 to-transparent mx-auto mb-4" />
              <p className="text-coffee-600/70 text-base md:text-lg">{t('menu.subtitle')}</p>
            </RevealGroup>

            {/* Menu grid */}
            <motion.div
              style={{ y: gridY, opacity: gridOpacity }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ amount: 0.2 }}
                  className="pointer-events-auto group cursor-pointer p-5 md:p-6 rounded-2xl border border-coffee-200/50 bg-white/50 hover:border-coffee-400/60 hover:bg-white/70 hover:shadow-[0_8px_30px_rgba(168,90,36,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-base md:text-lg font-bold text-coffee-900 group-hover:text-coffee-600 transition-colors leading-tight">
                      {t(`menu.items.${item.key}.name`)}
                    </h3>
                    <span className="text-coffee-500 text-sm font-mono font-bold whitespace-nowrap ml-3 bg-coffee-100/50 px-2 py-0.5 rounded-md">
                      {t(`menu.items.${item.key}.price`)}
                    </span>
                  </div>
                  <p className="text-coffee-600/70 text-sm leading-relaxed">
                    {t(`menu.items.${item.key}.desc`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
