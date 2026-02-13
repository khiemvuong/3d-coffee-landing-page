import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

const chapterNames = [
  'Brew & Beyond',
  'Nguồn gốc',
  'Quy trình',
  'Rang',
  'Trải nghiệm',
  'Thực đơn',
]

export default function ChapterIndicator() {
  const currentChapter = useAppStore((s) => s.currentChapter)

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3">
      {chapterNames.map((name, i) => {
        const isActive = i === currentChapter
        return (
          <a
            key={i}
            href={`#chapter-${i}`}
            className="group flex items-center gap-3"
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xs text-coffee-400/80 tracking-wider uppercase whitespace-nowrap"
                >
                  {name}
                </motion.span>
              )}
            </AnimatePresence>
            <div className="relative flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-coffee-400 scale-125 shadow-[0_0_8px_rgba(212,128,46,0.5)]'
                    : 'bg-cream-400/20 group-hover:bg-cream-400/40'
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="chapter-ring"
                  className="absolute w-5 h-5 rounded-full border border-coffee-500/40"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </a>
        )
      })}
    </div>
  )
}
