export type Series = {
  id: number
  title: string
  year: number
  imageUrl: string
  description: string
  rating: number
  seriesType: SeriesType
}

export type SeriesType = 'TVSeries' | 'Film' | 'Comic' | 'Novel'
