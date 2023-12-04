export type Episode = {
  no: number
  duration: Duration
  title: string
  seriesId: number
}

type Duration = {
  hours: number
  minutes: number
  seconds: number
}
