'use client'

import { useEffect, useState } from 'react'
import { DashboardSeriesModuleProps } from './interface'
import { Series } from 'src/components/elements/SeriesCard/interface'
import { Chapter } from 'src/components/elements/ChapterCard/interface'
import { Episode } from 'src/components/elements/EpisodeCard/interface'
import { useApi, useModal } from '@hooks'
import { AiOutlineLoading } from 'react-icons/ai'
import {
  ChapterCard,
  ChapterModal,
  Chips,
  EpisodeCard,
  EpisodeModal,
} from '@elements'
import Image from 'next/image'
import { parseDuration } from '@utils'

export const DashboardSeriesModule: React.FC<DashboardSeriesModuleProps> = ({
  id,
}) => {
  const [series, setSeries] = useState<Series>()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chapter>()
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>()
  const { isOpen, openModal, closeModal } = useModal()
  const { loading, api } = useApi()

  const chapterMapper = (e: any) => {
    return {
      userChapter: e.userChapter,
      ...e.chapter,
    }
  }

  const episodeMapper = (e: any) => {
    return {
      ...parseEpisode(e.episode),
      userEpisode: parseUserEpisode(e.userEpisode),
    }
  }

  const fetchSeries = async () => {
    const { response } = await api.get(`/series/track/${id}`)

    console.log(response)

    if (response) {
      setSeries(response.data.series)
      const seriesType = response.data.series.seriesType
      const type =
        seriesType === 'Comic' || seriesType === 'Novel' ? 'chapter' : 'episode'
      if (type === 'chapter')
        setChapters(response.data.trackingInfo.map(chapterMapper))
      else setEpisodes(response.data.trackingInfo.map(episodeMapper))
    }
  }

  const parseEpisode = (episode: any) => {
    const { duration, ...rest } = episode
    return {
      duration: parseDuration(duration),
      ...rest,
    } as Episode
  }

  const parseUserEpisode = (userEpisode: any) => {
    if (!userEpisode) return null
    const { lastWatchTime, ...rest } = userEpisode
    return {
      lastWatchTime: parseDuration(lastWatchTime),
      ...rest,
    }
  }

  const prepareChapterModal = (chapter: Chapter) => {
    setSelectedChapter(chapter)
    openModal()
  }

  const prepareEpisodeModal = (episode: Episode) => {
    setSelectedEpisode(episode)
    openModal()
  }

  useEffect(() => {
    fetchSeries()
  }, [])

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
            </div>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-8">
        {series && (
          <span className="text-3xl font-semibold">
            {series.seriesType === 'Comic' || series.seriesType === 'Novel'
              ? 'Chapters'
              : 'Episodes'}
          </span>
        )}
        <div className="flex flex-col gap-6">
          {chapters.map((value) => {
            return (
              <ChapterCard
                {...value}
                key={value.no}
                withProgress
                onButtonClick={() => prepareChapterModal(value)}
              />
            )
          })}
          {episodes.map((value) => {
            return (
              <EpisodeCard
                {...value}
                key={value.no}
                withProgress
                onButtonClick={() => prepareEpisodeModal(value)}
              />
            )
          })}
        </div>
      </section>
      {isOpen && selectedChapter && (
        <ChapterModal
          chapter={selectedChapter}
          close={closeModal}
          onSave={fetchSeries}
        />
      )}
      {isOpen && selectedEpisode && (
        <EpisodeModal
          episode={selectedEpisode}
          close={closeModal}
          onSave={fetchSeries}
        />
      )}
    </section>
  )
}
