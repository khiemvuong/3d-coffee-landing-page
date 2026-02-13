import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

const CHAPTER_COUNT = 6

export default function ScrollManager() {
  const containerRef = useRef<HTMLDivElement>(null)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)
  const setCurrentChapter = useAppStore((s) => s.setCurrentChapter)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / docHeight, 1)
      setScrollProgress(progress)

      // DOM-based chapter detection — find which chapter section we're in
      let active = 0
      const vh = window.innerHeight
      for (let i = CHAPTER_COUNT - 1; i >= 0; i--) {
        const el = document.getElementById(`chapter-${i}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Chapter is active when its top is at or above 40% of viewport
          if (rect.top <= vh * 0.4) {
            active = i
            break
          }
        }
      }
      setCurrentChapter(active)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress, setCurrentChapter])

  // Spacer divs — 140vh each: 100vh visible content + 40vh dwell zone for 3D animation
  return (
    <div ref={containerRef} className="relative">
      {Array.from({ length: CHAPTER_COUNT }).map((_, i) => (
        <div key={i} className="h-[140vh]" id={`chapter-${i}`} />
      ))}
    </div>
  )
}
