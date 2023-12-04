'use client'

import { SeriesDetailModule } from '@modules'

export default function SeriesDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <SeriesDetailModule id={params.id} />
}
