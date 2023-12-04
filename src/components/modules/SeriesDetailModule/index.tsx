'use client'

import { useEffect, useState } from 'react'
import { SeriesDetailModuleProps } from './interface'
import { Series } from 'src/components/elements/SeriesCard/interface'
import { AiOutlineLoading } from 'react-icons/ai'
import { useApi } from '@hooks'
import Image from 'next/image'
import { Chips } from '@elements'

export const SeriesDetailModule: React.FC<SeriesDetailModuleProps> = ({
  id,
}) => {
  const [series, setSeries] = useState<Series>()
  const { loading, api } = useApi()

  const fetchSeries = async () => {
    const { response } = await api.get(`/series/${id}`)

    console.log(response)
    if (response) {
      setSeries(response.data)
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <section className="flex flex-col px-20 py-16">
      {loading && !series && (
        <span className="flex items-center gap-2 place-self-center py-12 text-slate-400">
          <AiOutlineLoading className="animate-spin" />
          Fetching series...
        </span>
      )}
      {series && (
        <div className="flex gap-8">
          <Image
            className="rounded-2xl"
            src={series.imageUrl}
            alt="image"
            width={200}
            height={600}
          />
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <span className="text-4xl font-semibold">{series.title}</span>
              <Chips value={series.seriesType} />
            </div>
            <span className="text-xl">{series.year}</span>
            <span className="text-xl">Rated {series.rating}/5</span>
            <p>{series.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}
