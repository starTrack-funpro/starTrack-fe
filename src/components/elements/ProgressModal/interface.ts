import { ReactNode } from 'react'

export interface ProgressModalProps {
  title?: string
  close: () => void
  onSave: () => void
  children?: ReactNode
  disableSave?: boolean
}
