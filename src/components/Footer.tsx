import { useTranslation } from 'react-i18next'
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer id="contact" className="relative pt-20 pb-8 border-t border-coffee-900/50">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050302] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-coffee-500" />
              <span className="font-serif text-xl font-semibold text-cream-100">
                Brew & Beyond
              </span>
            </div>
            <p className="text-cream-300/40 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-coffee-600/40 transition-colors"
              >
                <Instagram className="w-4 h-4 text-coffee-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-coffee-600/40 transition-colors"
              >
                <Facebook className="w-4 h-4 text-coffee-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream-100 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <div className="flex flex-col gap-2.5">
              {['home', 'menu', 'about', 'contact'].map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-cream-300/40 text-sm hover:text-coffee-400 transition-colors"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream-100 mb-4">
              {t('footer.hours')}
            </h4>
            <p className="text-cream-300/40 text-sm">{t('footer.hoursDetail')}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream-100 mb-4">
              {t('footer.contact')}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-cream-300/40 text-sm">
                <MapPin className="w-4 h-4 text-coffee-600 flex-shrink-0" />
                <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 text-cream-300/40 text-sm">
                <Phone className="w-4 h-4 text-coffee-600 flex-shrink-0" />
                <span>+84 28 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-cream-300/40 text-sm">
                <Mail className="w-4 h-4 text-coffee-600 flex-shrink-0" />
                <span>hello@brewbeyond.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee-900/30 pt-6 text-center">
          <p className="text-cream-300/30 text-xs">
            &copy; 2026 Brew & Beyond. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
