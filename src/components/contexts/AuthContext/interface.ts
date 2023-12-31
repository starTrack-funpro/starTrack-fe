import { ReactNode } from 'react'

export interface AuthContextProps {
  isAuthenticated: boolean
  name: string
  username: string
  role: string
  refresh: () => {}
}

export interface AuthContextProviderProps {
  children?: ReactNode
}
