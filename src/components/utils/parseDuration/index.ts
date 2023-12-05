import { Duration } from 'src/components/elements/EpisodeCard/interface'

export const parseDuration = (durationString: string) => {
  const [hours, minutes, seconds] = durationString.split(':').map(Number)
  return {
    hours,
    minutes,
    seconds,
  }
}

export const durationToString = (duration: Duration) => {
  const hoursString = String(duration.hours).padStart(2, '0')
  const minutesString = String(duration.minutes).padStart(2, '0')
  const secondsString = String(duration.seconds).padStart(2, '0')
  return `${hoursString}:${minutesString}:${secondsString}`
}
