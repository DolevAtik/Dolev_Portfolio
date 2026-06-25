import { createContext, useContext } from 'react'

export const SiteReadyContext = createContext(false)

export function useSiteReady() {
  return useContext(SiteReadyContext)
}

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const
export const REVEAL_DURATION = 0.95
