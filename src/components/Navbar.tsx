import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Coffee, Menu as MenuIcon, X, Globe } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const scrollProgress = useAppStore((s) => s.scrollProgress)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = scrollProgress > 0.02

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')
  }

  const navLinks = [
    { href: '#chapter-0', label: t('nav.home') },
    { href: '#chapter-5', label: t('nav.menu') },
    { href: '#chapter-4', label: t('nav.about') },
    { href: '#chapter-1', label: t('nav.contact') },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#chapter-0" className="flex items-center gap-2 group">
          <Coffee className="w-6 h-6 text-coffee-500 group-hover:text-coffee-400 transition-colors" />
          <span className="font-serif text-lg font-semibold text-cream-100 tracking-wide">
            Brew & Beyond
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-cream-200/70 hover:text-coffee-400 transition-colors tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs text-cream-300/60 hover:text-coffee-400 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {i18n.language === 'vi' ? 'EN' : 'VI'}
          </button>
          <a
            href="#chapter-5"
            className="px-5 py-2 bg-coffee-700/80 hover:bg-coffee-600 text-cream-50 text-xs rounded-full transition-all tracking-wider backdrop-blur-sm"
          >
            {t('nav.order')}
          </a>
        </div>

        <button
          className="md:hidden text-cream-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-cream-200 hover:text-coffee-400 transition-colors tracking-wide text-sm"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-cream-300 hover:text-coffee-400 transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                {i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
