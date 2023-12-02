'use client'

import { useAuthContext } from '@contexts'
import { usePageGuard } from '@hooks'

export default function ProtectedPage() {
  usePageGuard()

  const { isAuthenticated, name } = useAuthContext()

  return (
    <>
      <span>THIS IS PROTECTED</span>
      {isAuthenticated && <span>HELLO {name}</span>}
    </>
  )
}
