import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

const CHAPTER_COUNT = 6

export function ScrollManager() {
  const { setCurrentChapter, setScrollProgress } = useAppStore()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / Math.max(docHeight, 1), 1)
      setScrollProgress(progress)

      // Detect active chapter based on which element is most visible in the center
      const vh = window.innerHeight
      const center = scrollY + vh / 2
      
      let active = 0
      for (let i = 0; i < CHAPTER_COUNT; i++) {
        const el = document.getElementById(`chapter-${i}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          const absoluteTop = rect.top + scrollY
          if (center >= absoluteTop && center <= absoluteTop + rect.height) {
            active = i
            break
          }
        }
      }
      setCurrentChapter(active)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress, setCurrentChapter])

  return null
}
