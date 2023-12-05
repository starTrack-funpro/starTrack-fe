import { ReactNode } from 'react'

export interface ModalProps {
  title?: string
  close: () => void
  onSave: () => void
  children?: ReactNode
  disableSave?: boolean
}
