import { useState } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { useTranslation } from 'react-i18next'
  import { Coffee, Menu as MenuIcon, X, Globe } from 'lucide-react'
  import { useAppStore } from '../store/useAppStore'
  
  export default function Navbar() {
    const { t, i18n } = useTranslation()
    const { scrollProgress, currentChapter } = useAppStore()
    const [mobileOpen, setMobileOpen] = useState(false)
    const scrolled = scrollProgress > 0.02
  
    const toggleLang = () => {
      i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')
    }
  
    const handleNavClick = (id: string) => {
      setMobileOpen(false)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        // Prevent hash from appearing in URL
        window.history.pushState(null, '', window.location.pathname)
      }
    }
  
    const navLinks = [
      { id: 'chapter-0', label: t('nav.home'), idx: 0 },
      { id: 'chapter-1', label: t('nav.origin'), idx: 1 },
      { id: 'chapter-4', label: t('nav.about'), idx: 4 },
      { id: 'chapter-5', label: t('nav.menu'), idx: 5 },
    ]
  
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          scrolled ? 'glass py-3 shadow-[0_4px_30px_rgba(40,20,10,0.03)]' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          <button 
            onClick={() => handleNavClick('chapter-0')}
            className="flex items-center gap-3 group transition-all"
          >
            <div className="w-9 h-9 bg-coffee-950 rounded-lg flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-coffee-900/20">
              <Coffee className="w-5 h-5 text-cream-50" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-black text-coffee-950 tracking-tighter leading-none">
                Brew & Beyond
              </span>
              <span className="text-[7px] text-coffee-600 font-black tracking-[0.4em] uppercase mt-1 opacity-60">
                Premium Coffee Art
              </span>
            </div>
          </button>
  
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-[10px] font-black tracking-[0.25em] uppercase relative transition-all duration-500 ${
                    currentChapter === link.idx ? 'text-coffee-950' : 'text-coffee-950/40 hover:text-coffee-950'
                  }`}
                >
                  {link.label}
                  <AnimatePresence>
                    {currentChapter === link.idx && (
                      <motion.span 
                        layoutId="nav-active"
                        className="absolute -bottom-1.5 left-0 w-full h-[1.5px] bg-coffee-800"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
  
            <div className="w-[1px] h-4 bg-coffee-950/10 mx-2" />
            
            <button
              onClick={toggleLang}
              className="px-3 py-1 text-[9px] font-black text-coffee-950/50 hover:text-coffee-950 hover:bg-coffee-950/5 rounded-md transition-all tracking-[0.1em]"
            >
              {i18n.language === 'en' ? 'VI' : 'EN'}
            </button>
  
            <button
              onClick={() => handleNavClick('chapter-5')}
              className="px-8 py-2.5 bg-coffee-950 hover:bg-coffee-900 text-cream-50 text-[10px] font-black rounded-full transition-all tracking-[0.2em] uppercase shadow-lg shadow-coffee-950/15 hover:shadow-coffee-950/30 hover:-translate-y-0.5"
            >
              {t('nav.order')}
            </button>
          </div>
  
          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-coffee-950/5 text-coffee-950"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
  
        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 glass border-t border-coffee-950/5 overflow-hidden"
            >
              <div className="p-8 flex flex-col gap-6 items-center">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-xs font-black tracking-[0.3em] uppercase transition-colors ${
                      currentChapter === link.idx ? 'text-coffee-600' : 'text-coffee-950'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px w-10 bg-coffee-950/10" />
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 text-xs font-black text-coffee-600 tracking-widest uppercase"
                >
                  <Globe className="w-4 h-4" />
                  {i18n.language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    )
  }
