import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

const chapterNames = [
  'Brew & Beyond',
  'Nguồn cội',
  'Nghi thức',
  'Lửa thiêng',
  'Trải nghiệm',
  'Danh mục',
]

export default function ChapterIndicator() {
  const currentChapter = useAppStore((s) => s.currentChapter)

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
    >
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
                  className="text-xs text-coffee-600/70 tracking-wider uppercase whitespace-nowrap"
                >
                  {name}
                </motion.span>
              )}
            </AnimatePresence>
            <div className="relative flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-coffee-500 scale-125 shadow-[0_0_8px_rgba(168,90,36,0.35)]'
                    : 'bg-coffee-300/30 group-hover:bg-coffee-400/40'
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="chapter-ring"
                  className="absolute w-5 h-5 rounded-full border border-coffee-400/40"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </a>
        )
      })}
    </motion.div>
  )
}
