import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    document.body.style.overflow = 'hidden'
    setIsOpen(true)
  }

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setIsOpen(false)
  }

  return {
    isOpen,
    openModal,
    closeModal,
  }
}
