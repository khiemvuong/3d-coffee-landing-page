import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  scrollProgress: number
  setScrollProgress: (progress: number) => void
  currentChapter: number
  setCurrentChapter: (chapter: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  currentChapter: 0,
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
}))
