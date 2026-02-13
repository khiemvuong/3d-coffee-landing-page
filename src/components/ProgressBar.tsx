import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

export default function ProgressBar() {
  const scrollProgress = useAppStore((s) => s.scrollProgress)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-coffee-600 via-coffee-400 to-coffee-600"
        style={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}
