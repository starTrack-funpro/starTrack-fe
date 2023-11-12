import { ReactNode } from 'react'

export interface AuthContextProps {
  isAuthenticated: boolean
  name: string
  username: string
}

export interface AuthContextProviderProps {
  children?: ReactNode
}
