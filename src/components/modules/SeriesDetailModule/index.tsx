'use client'

import { useEffect, useState } from 'react'
import { SeriesDetailModuleProps } from './interface'
import { Series } from 'src/components/elements/SeriesCard/interface'
import { AiOutlineLoading } from 'react-icons/ai'
import { useApi, useModal } from '@hooks'
import Image from 'next/image'
import {
  AddChapterModal,
  Button,
  ChapterCard,
  Chips,
  EpisodeCard,
} from '@elements'
import { Chapter } from 'src/components/elements/ChapterCard/interface'
import { Episode } from 'src/components/elements/EpisodeCard/interface'
import { useAuthContext } from '@contexts'
import { parseDuration } from '@utils'

export const SeriesDetailModule: React.FC<SeriesDetailModuleProps> = ({
  id,
}) => {
  const [series, setSeries] = useState<Series>()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const { loading, api } = useApi()
  const { isAuthenticated } = useAuthContext()
  const { isOpen, openModal, closeModal } = useModal()

  const fetchSeries = async () => {
    const { response } = await api.get(`/series/${id}`)

    if (response) {
      setSeries(response.data)
    }
  }

  const chapterOrEpisode = () => {
    return series?.seriesType === 'Comic' || series?.seriesType === 'Novel'
      ? 'Chapter'
      : 'Episode'
  }

  const parseEpisode = (episode: any) => {
    const { duration, ...rest } = episode
    return {
      duration: parseDuration(duration),
      ...rest,
    } as Episode
  }

  const fetchChaptersOrEpisodes = async () => {
    const type = chapterOrEpisode().toLowerCase()

    const { response } = await api.get(`/series/${id}/${type}`)

    if (response) {
      if (type === 'chapter') setChapters(response.data)
      else {
        setEpisodes(response.data.map(parseEpisode))
      }
    }
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  useEffect(() => {
    series && fetchChaptersOrEpisodes()
  }, [series])

  return (
    <section className="flex flex-col px-20 py-16 gap-16">
      <section className="flex flex-col">
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
              height={600}
              width={200}
            />
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <span className="text-4xl font-semibold">{series.title}</span>
                <Chips value={series.seriesType} />
              </div>
              <span className="text-xl">{series.year}</span>
              <span className="text-xl">Rated {series.rating}/5</span>
              <p>{series.description}</p>
              {isAuthenticated && (
                <Button className="w-fit">Track this series</Button>
              )}
            </div>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-8">
        {series && (
          <div className="flex items-center gap-6">
            <span className="text-3xl font-semibold">{chapterOrEpisode()}</span>
            <Button onClick={openModal}>Add {chapterOrEpisode()}</Button>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {chapters.map((value) => {
            return <ChapterCard {...value} key={value.no} />
          })}
          {episodes.map((value) => {
            return <EpisodeCard {...value} key={value.no} />
          })}
        </div>
      </section>
      {isOpen && series && chapterOrEpisode() === 'Chapter' && (
        <AddChapterModal
          seriesId={series.id}
          close={closeModal}
          onSave={fetchChaptersOrEpisodes}
        />
      )}
    </section>
  )
}
