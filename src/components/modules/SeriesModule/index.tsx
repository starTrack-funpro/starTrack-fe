'use client'

import { SeriesCard } from '@elements'
import { useApi } from '@hooks'
import { useEffect, useState } from 'react'
import { Series } from 'src/components/elements/SeriesCard/interface'
import { useDebouncedCallback } from 'use-debounce'

export const SeriesModule = () => {
  const { api } = useApi()
  const [series, setSeries] = useState<Series[]>([])
  const [searchTitle, setSearchTitle] = useState('')

  const fetchSeries = async () => {
    const { response } = await api.get(`/series?title=${searchTitle}&type=`)
    setSeries(response.data)
  }

  useEffect(() => {
    fetchSeries()
  }, [searchTitle])

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchTitle(value)
  }, 300)

  return (
    <div className="flex px-12">
      <section className="w-1/5"></section>
      <section className="w-full flex flex-col gap-6">
        <div className="w-full flex">
          <input
            className="w-1/3 py-2 px-4 rounded-xl bg-platinum text-black outline-folly"
            type="text"
            placeholder="Search by title"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-6">
          {series.map((value) => (
            <SeriesCard {...value} key={value.id} />
          ))}
        </div>
      </section>
    </div>
  )
}
