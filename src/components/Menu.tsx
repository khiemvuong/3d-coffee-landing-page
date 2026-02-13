import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ShoppingCart } from 'lucide-react'

const menuKeys = ['espresso', 'cappuccino', 'pourover', 'coldbrew', 'latte', 'vietnamese'] as const

const images = [
  'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=400&fit=crop',
]

export default function Menu() {
  const { t } = useTranslation()

  return (
    <section id="menu" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0806] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-cream-300/60 text-lg max-w-lg mx-auto">
            {t('menu.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-coffee-600/30 transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={images[i]}
                  alt={t(`menu.items.${key}.name`)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0605] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-cream-100">
                    {t(`menu.items.${key}.name`)}
                  </h3>
                  <span className="text-coffee-400 font-semibold text-lg whitespace-nowrap ml-3">
                    {t(`menu.items.${key}.price`)}
                  </span>
                </div>
                <p className="text-cream-300/50 text-sm mb-4">
                  {t(`menu.items.${key}.desc`)}
                </p>
                <button className="flex items-center gap-2 text-sm text-coffee-400 hover:text-coffee-300 transition-colors group/btn">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="border-b border-coffee-400/30 group-hover/btn:border-coffee-300/50 transition-colors">
                    {t('nav.order')}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
