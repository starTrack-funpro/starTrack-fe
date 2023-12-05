export interface EpisodeCardProps {
  withProgress?: boolean
}

export type Episode = {
  no: number
  duration: Duration
  title: string
  seriesId: number
  userEpisode: EpisodeTracking
}

type Duration = {
  hours: number
  minutes: number
  seconds: number
}

type EpisodeTracking = {
  lastWatchTime: Duration
  seriesId: number
  chapterNo: number
}
