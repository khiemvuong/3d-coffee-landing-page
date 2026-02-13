import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function ScrollHint() {
  const scrollProgress = useAppStore((s) => s.scrollProgress)

  if (scrollProgress > 0.05) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
    >
      <span className="text-coffee-400/50 text-xs tracking-[0.2em] uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-coffee-500/60" />
      </motion.div>
    </motion.div>
  )
}
