'use client'

import { usePageGuard } from '@hooks'
import { DashboardSeriesModule } from '@modules'

export default function DashboardSeriesPage({
  params,
}: {
  params: { id: number }
}) {
  usePageGuard()
  return <DashboardSeriesModule id={params.id} />
}
