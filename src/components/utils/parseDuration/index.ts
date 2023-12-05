export const parseDuration = (durationString: string) => {
  const [hours, minutes, seconds] = durationString.split(':')
  return {
    hours,
    minutes,
    seconds,
  }
}
