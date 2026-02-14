import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

export default function LoadingScreen({ progress }: { progress?: number }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf5ef]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Coffee className="w-16 h-16 text-coffee-500" />
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-6 bg-coffee-400/40 rounded-full blur-sm"
          animate={{ y: [-5, -15], opacity: [0.6, 0], scale: [1, 1.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 ml-2 w-2 h-5 bg-coffee-400/30 rounded-full blur-sm"
          animate={{ y: [-5, -18], opacity: [0.4, 0], scale: [1, 1.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-coffee-700 font-serif text-lg tracking-widest"
      >
        BREW & BEYOND
      </motion.p>
      <motion.div
        className="mt-4 w-48 h-0.5 bg-coffee-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-coffee-700 to-coffee-400 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress ?? 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  )
}
