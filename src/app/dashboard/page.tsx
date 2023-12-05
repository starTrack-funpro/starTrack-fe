'use client'

import { usePageGuard } from '@hooks'
import { DashboardModule } from '@modules'

export default function ProtectedPage() {
  usePageGuard()

  return <DashboardModule />
}
