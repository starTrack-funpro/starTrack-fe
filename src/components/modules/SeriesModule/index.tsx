'use client'

import { SeriesCard } from '@elements'
import { useApi } from '@hooks'
import { useEffect, useState } from 'react'
import { Series } from 'src/components/elements/SeriesCard/interface'

export const SeriesModule = () => {
  const { api } = useApi()
  const [series, setSeries] = useState<Series[]>([])

  const fetchSeries = async () => {
    const { response } = await api.get('/series?title=&type=')
    setSeries(response.data)

    console.log(response)
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <div className="flex px-12">
      <div className="w-1/5"></div>
      <div className="w-full flex flex-col gap-6">
        {series.map((value) => (
          <SeriesCard {...value} key={value.id} />
        ))}
      </div>
    </div>
  )
}
