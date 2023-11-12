'use client'

import { useAuthContext } from '@contexts'
import { PageGuard } from '@elements'

export default function ProtectedPage() {
  const { isAuthenticated, name } = useAuthContext()

  return (
    <PageGuard>
      <span>THIS IS PROTECTED</span>
      {isAuthenticated && <span>HELLO {name}</span>}
    </PageGuard>
  )
}
