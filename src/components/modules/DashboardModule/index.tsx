'use client'

import { useApi } from '@hooks'
import { Sidebar } from './module-elements/Sidebar'
import { Series } from 'src/components/elements/SeriesCard/interface'
import { useEffect, useState } from 'react'
import { SeriesCard } from '@elements'
import Link from 'next/link'

export const DashboardModule = () => {
  const { loading, api } = useApi()
  const [series, setSeries] = useState<Series[]>([])

  const fetchSeries = async () => {
    const { response } = await api.get('/series/track')

    if (response) {
      setSeries(response.data)
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <section className="flex w-full pr-12 gap-10">
      <Sidebar />
      <section className="w-full flex flex-col gap-6">
        {series.map((value) => (
          <Link href={`/dashboard/series/${value.id}`} key={value.id}>
            <SeriesCard {...value} />
          </Link>
        ))}
      </section>
    </section>
  )
}
