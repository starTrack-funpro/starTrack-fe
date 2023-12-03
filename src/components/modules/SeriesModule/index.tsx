'use client'

import { Radio, SeriesCard } from '@elements'
import { useApi } from '@hooks'
import { useEffect, useState } from 'react'
import { Series } from 'src/components/elements/SeriesCard/interface'
import { useDebouncedCallback } from 'use-debounce'
import { AiOutlineLoading } from 'react-icons/ai'

export const SeriesModule = () => {
  const { api, loading } = useApi()
  const [series, setSeries] = useState<Series[]>([])
  const [searchTitle, setSearchTitle] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const fetchSeries = async () => {
    const { response } = await api.get(
      `/series?title=${searchTitle}&type=${selectedType}`
    )
    setSeries(response.data)
  }

  useEffect(() => {
    fetchSeries()
  }, [searchTitle, selectedType])

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchTitle(value)
  }, 300)

  return (
    <div className="flex px-12">
      <section className="w-1/5 flex flex-col">
        <span className="pt-16 font-semibold">Filter by Type</span>
        <div className="flex flex-col pl-6 py-2">
          <Radio
            value=""
            currentValue={selectedType}
            name="type-filter"
            onChange={() => setSelectedType('')}
            label="All"
          />
          <Radio
            value="Film"
            currentValue={selectedType}
            name="type-filter"
            onChange={() => setSelectedType('Film')}
            label="Film"
          />
          <Radio
            value="TVSeries"
            currentValue={selectedType}
            name="type-filter"
            onChange={() => setSelectedType('TVSeries')}
            label="TV Series"
          />
          <Radio
            value="Novel"
            currentValue={selectedType}
            name="type-filter"
            onChange={() => setSelectedType('Novel')}
            label="Novel"
          />
          <Radio
            value="Comic"
            currentValue={selectedType}
            name="type-filter"
            onChange={() => setSelectedType('Comic')}
            label="Comic"
          />
        </div>
      </section>
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
          {loading && (
            <span className="flex items-center gap-2 place-self-center py-12 text-slate-400">
              <AiOutlineLoading className="animate-spin" />
              Finding series...
            </span>
          )}
          {series.map((value) => (
            <SeriesCard {...value} key={value.id} />
          ))}
          {!loading && series.length === 0 && (
            <span className=" place-self-center py-12 text-slate-400">
              Sorry! No series available yet.
            </span>
          )}
        </div>
      </section>
    </div>
  )
}
