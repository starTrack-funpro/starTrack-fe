export interface ChapterCardProps {
  withProgress?: boolean
}

export type Chapter = {
  no: number
  pageFrom: number
  pageTo: number
  title: string
  seriesId: number
  userChapter: ChapterTracking
}

type ChapterTracking = {
  lastReadPage: number
  seriesId: number
  chapterNo: number
}
