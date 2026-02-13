import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Coffee, MapPin, Wind, Thermometer, Sparkles, Star, ChevronRight, Droplets } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   Chapter 0: HERO
   ══════════════════════════════════════════════════════════════ */
export function HeroChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)
  
  return (
    <div ref={ref} className="h-screen relative flex flex-col justify-center pt-[15vh] overflow-hidden" id="chapter-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="chapter-panel max-w-lg text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-coffee-600 text-[10px] md:text-xs font-black tracking-[0.5em] mb-4 uppercase italic">
              {t('hero.subtitle')}
            </p>

            <h1 className="relative font-serif leading-[0.8] mb-8">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gradient block text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
              >
                Brew
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute top-1/2 left-0 -translate-y-1/2 text-coffee-950 font-light italic text-7xl md:text-9xl lg:text-[11rem] whitespace-nowrap pointer-events-none select-none z-[-1]"
                style={{ WebkitTextStroke: '1px rgba(44, 24, 16, 0.4)' }}
              >
                & Beyond
              </motion.span>

              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gradient block text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter ml-8 md:ml-16"
              >
                Studio
              </motion.span>
            </h1>

            <div className="w-20 h-1 bg-gradient-to-r from-coffee-500 to-transparent mb-8 rounded-full" />

            <p className="text-coffee-950 text-base md:text-lg leading-relaxed max-w-md mb-8 font-bold opacity-80">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#chapter-5"
                className="px-10 py-4 bg-coffee-950 text-cream-50 text-sm font-black rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95 shadow-xl shadow-coffee-900/10"
              >
                {t('hero.cta')}
              </a>
              <a
                href="#chapter-3"
                className="px-10 py-4 border-2 border-coffee-950 text-coffee-950 text-sm font-black rounded-full hover:bg-coffee-950 hover:text-cream-50 transition-all duration-500"
              >
                {t('hero.secondary')}
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Dynamic Anchor for Hero (Right side) - High position */}
        <div className="w-1/2 relative hidden md:block self-stretch">
          <div 
            data-cake-anchor="hero"
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" 
          />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 1: ORIGIN
   ══════════════════════════════════════════════════════════════ */
export function OriginChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)

  return (
    <div ref={ref} className="h-screen relative flex flex-col justify-center pt-[15vh] overflow-hidden" id="chapter-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col md:flex-row items-center justify-between">
        {/* Dynamic Anchor for Origin (FAR LEFT, LOWERED) */}
        <div className="w-1/2 relative hidden md:block self-stretch">
          <div 
            data-cake-anchor="origin"
            className="absolute top-[70%] left-[5%] -translate-y-1/2 w-4 h-4" 
          />
        </div>

        <div className="chapter-panel max-w-xl text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-1 bg-emerald-600 rounded-full" />
              <span className="text-emerald-800 text-sm md:text-base font-black tracking-[0.4em] uppercase">
                01 &mdash; {t('features.origin.title')}
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl font-black text-coffee-950 mb-8 leading-tight">
              {t('features.origin.title')}
            </h2>

            <p className="text-coffee-950 text-xl md:text-2xl leading-relaxed mb-12 font-bold opacity-90">
              {t('features.origin.desc')}
            </p>

            <div className="flex justify-end gap-6">
              {[
                { label: 'Dak Lak', value: '1200m', color: 'text-emerald-900' },
                { label: 'Lam Dong', value: '1500m', color: 'text-emerald-800' },
                { label: 'Ethiopia', value: '1800m', color: 'text-emerald-900' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="text-center px-8 py-6 rounded-[2rem] bg-emerald-100/40 border-2 border-emerald-600/10"
                >
                  <p className={`text-3xl md:text-4xl font-serif font-black ${item.color}`}>
                    {item.value}
                  </p>
                  <p className="text-xs text-emerald-800 font-black mt-3 tracking-widest uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 2: PROCESS
   ══════════════════════════════════════════════════════════════ */
export function ProcessChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)

  const steps = [
    { step: '01', label: 'Thu hoạch', desc: 'Hái lựa thủ công từng quả chín' },
    { step: '02', label: 'Sơ chế', desc: 'Lên men tự nhiên 48 giờ' },
    { step: '03', label: 'Rang', desc: 'Rang profile riêng từng mẻ' },
    { step: '04', label: 'Pha', desc: 'Chiết xuất chính xác từng giọt' },
  ]

  return (
    <div ref={ref} className="h-screen relative flex flex-col justify-center pt-[15vh] overflow-hidden" id="chapter-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="chapter-panel max-w-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sky-800 text-sm md:text-base font-black tracking-[0.4em] uppercase">
              02 &mdash; {t('features.brew.title')}
            </span>
            <div className="w-16 h-1 bg-sky-600 rounded-full" />
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-black text-coffee-950 mb-8 leading-tight">
            {t('features.brew.title')}
          </h2>

          <p className="text-coffee-950 text-xl md:text-2xl leading-relaxed mb-12 font-bold opacity-90">
            {t('features.brew.desc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="absolute left-6 top-2 bottom-2 w-[3px] bg-sky-600/10 hidden md:block" />

            {steps.map((item, i) => (
              <div key={item.step} className="flex items-start gap-6 pl-1">
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-sky-100 border-2 border-sky-400/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-900/5">
                  <span className="text-sky-800 text-lg font-black font-mono">{item.step}</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="text-coffee-950 font-black text-xl mb-2">{item.label}</h4>
                  <p className="text-coffee-800 font-bold opacity-70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Anchor for Process (CENTER, LOWERED) */}
        <div className="w-1/2 relative hidden md:block self-stretch">
          <div 
            data-cake-anchor="process"
            className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" 
          />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 3: ROAST
   ══════════════════════════════════════════════════════════════ */
export function RoastChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)

  const roasts = [
    { label: 'Light Roast', temp: '196°C', pct: 45, gradient: 'from-amber-400 to-orange-400' },
    { label: 'Medium Roast', temp: '210°C', pct: 65, gradient: 'from-orange-500 to-orange-600' },
    { label: 'Dark Roast', temp: '230°C', pct: 90, gradient: 'from-orange-600 to-red-600' },
  ]

  return (
    <div ref={ref} className="h-screen relative flex flex-col justify-center pt-[15vh] overflow-hidden" id="chapter-3">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="chapter-panel max-w-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-orange-800 text-sm md:text-base font-black tracking-[0.4em] uppercase">
              03 &mdash; {t('features.roast.title')}
            </span>
            <div className="w-16 h-1 bg-orange-600 rounded-full" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-black text-coffee-950 mb-6 leading-tight">
            {t('features.roast.title')}
          </h2>

          <p className="text-coffee-950 text-lg md:text-xl leading-relaxed mb-8 font-bold opacity-90">
            {t('features.roast.desc')}
          </p>

          <div className="space-y-6">
            {roasts.map((roast) => (
              <div key={roast.label}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-coffee-950 font-black text-base">{roast.label}</span>
                  <span className="text-orange-800 font-bold font-mono text-sm">{roast.temp}</span>
                </div>
                <div className="h-4 w-full bg-orange-100 rounded-full overflow-hidden border border-orange-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${roast.pct}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${roast.gradient}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Anchor for Roast (FAR RIGHT, LOWERED) */}
        <div className="w-1/2 relative hidden md:block self-stretch">
          <div 
            data-cake-anchor="roast"
            className="absolute top-[85%] left-[95%] -translate-x-1/2 -translate-y-1/2 w-4 h-4" 
          />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 4: EXPERIENCE
   ══════════════════════════════════════════════════════════════ */
export function ExperienceChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)

  return (
    <div ref={ref} className="h-screen relative flex flex-col justify-center pt-[15vh] overflow-hidden" id="chapter-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col md:flex-row items-center justify-between">
        {/* Dynamic Anchor for Experience (FAR LEFT, HIGH) */}
        <div className="w-1/2 relative hidden md:block self-stretch">
          <div 
            data-cake-anchor="experience"
            className="absolute top-[50%] left-[5%] -translate-y-1/2 w-4 h-4" 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="chapter-panel max-w-md text-right ml-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-coffee-800 rounded-full" />
            <span className="text-coffee-900 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
              04 &mdash; {t('about.title')}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-black text-coffee-950 mb-5 leading-tight">
            {t('about.title')}
          </h2>

          <p className="text-coffee-950 text-base md:text-lg leading-relaxed mb-8 font-bold opacity-80">
            {t('about.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            <div className="p-4 md:p-6 rounded-[1.5rem] bg-coffee-100/60 border-2 border-coffee-800/10 text-center">
              <p className="text-2xl md:text-3xl font-serif font-black text-coffee-950">15+</p>
              <p className="text-[9px] text-coffee-800 font-black mt-2 tracking-widest uppercase">
                {t('about.stats.years')}
              </p>
            </div>
            <div className="p-4 md:p-6 rounded-[1.5rem] bg-coffee-950 text-cream-50 text-center shadow-lg shadow-coffee-900/20">
              <p className="text-2xl md:text-3xl font-serif font-black">50k+</p>
              <p className="text-[9px] text-cream-50/60 font-bold mt-2 tracking-widest uppercase">
                {t('about.stats.customers')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   Chapter 5: MENU
   ══════════════════════════════════════════════════════════════ */
export function MenuChapter() {
  const { t } = useTranslation()
  const ref = useRef(null)

  const menuItems = [
    { key: 'espresso', color: 'bg-coffee-50' },
    { key: 'cappuccino', color: 'bg-warm-50' },
    { key: 'pourover', color: 'bg-cream-50' },
    { key: 'coldbrew', color: 'bg-coffee-50' },
    { key: 'latte', color: 'bg-warm-50' },
    { key: 'vietnamese', color: 'bg-cream-50' },
  ]

  return (
    <div ref={ref} className="min-h-screen relative flex flex-col justify-center pt-[15vh] pb-[25vh] overflow-hidden" id="chapter-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col items-center">
        {/* Dynamic Anchor for Menu (Top Center) - More specific position, raised up */}
        <div className="w-full h-24 relative flex justify-center">
          <div 
            data-cake-anchor="menu"
            className="absolute top-0 left-[55%] w-4 h-4" 
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="chapter-panel w-full max-w-5xl mx-auto"
        >
          <div className="text-center mb-4">
            <span className="text-coffee-900 text-xs md:text-sm font-black tracking-[0.5em] uppercase">
              05 &mdash; {t('menu.title')}
            </span>
          </div>

          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl md:text-5xl font-black text-coffee-950 mb-2 leading-tight">
              {t('menu.title')}
            </h2>
            <p className="text-coffee-900 text-sm md:text-base font-black opacity-70 italic">{t('menu.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {menuItems.map((item) => (
              <motion.div
                key={item.key}
                whileHover={{ y: -5, scale: 1.01 }}
                className={`${item.color} p-4 md:p-5 rounded-[1.5rem] border-2 border-coffee-950/5 shadow-sm transition-all duration-500 hover:shadow-lg group`}
              >
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-coffee-950 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Coffee className="w-4 h-4 md:w-5 md:h-5 text-cream-50" />
                  </div>
                  <span className="text-base md:text-lg font-serif font-black text-coffee-950">
                    {t(`menu.items.${item.key}.price`)}
                  </span>
                </div>
                <h3 className="font-serif text-lg md:text-xl font-black text-coffee-950 mb-1">
                  {t(`menu.items.${item.key}.name`)}
                </h3>
                <p className="text-coffee-800 text-[10px] md:text-xs font-bold opacity-70 leading-relaxed line-clamp-2">
                  {t(`menu.items.${item.key}.desc`)}
                </p>
                
                <div className="mt-3 md:mt-4 pt-3 border-t border-coffee-950/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <span className="text-[8px] font-black tracking-widest uppercase text-coffee-600">Thêm vào giỏ</span>
                   <ChevronRight className="w-3 h-3 text-coffee-950" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-10 w-full text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-coffee-950/20 to-transparent mb-8" />
          <p className="text-coffee-950 text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
            Brew & Beyond &copy; 2026 &mdash; The Art of Coffee Craftsmanship
          </p>
        </div>
      </footer>
    </div>
  )
}
