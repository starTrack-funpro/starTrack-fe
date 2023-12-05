import { useState } from 'react'
import { EpisodeModalProps } from './interface'
import { useApi } from '@hooks'
import { durationToString, parseDuration, rangeValidation } from '@utils'
import { Duration } from '../../EpisodeCard/interface'
import toast from 'react-hot-toast'
import { ProgressModal } from '..'

export const EpisodeModal: React.FC<EpisodeModalProps> = ({
  episode,
  onSave,
  close,
}) => {
  const title = episode.userEpisode ? 'Edit Progress' : 'Add Progress'
  const [durationInput, setDurationInput] = useState<Duration>(
    episode.userEpisode
      ? episode.userEpisode.lastWatchTime
      : parseDuration('00:00:00')
  )
  const { api, loading } = useApi()

  const setHours = (hours: number) => {
    setDurationInput({
      ...durationInput,
      hours,
    })
  }

  const setMinutes = (minutes: number) => {
    setDurationInput({
      ...durationInput,
      minutes,
    })
  }

  const setSeconds = (seconds: number) => {
    setDurationInput({
      ...durationInput,
      seconds,
    })
  }

  const toSeconds = (duration: Duration) => {
    const { hours, minutes, seconds } = duration
    return hours * 3600 + minutes * 60 + seconds
  }

  const rangeValid = () => {
    const episodeDurationSeconds = toSeconds(episode.duration)
    const inputDurationSeconds = toSeconds(durationInput)
    const validRange = rangeValidation(
      0,
      inputDurationSeconds,
      episodeDurationSeconds
    )
    const validSeconds = rangeValidation(0, durationInput.seconds, 59)
    const validMinutes = rangeValidation(0, durationInput.minutes, 59)
    const validHours = rangeValidation(
      0,
      durationInput.minutes,
      Number.MAX_VALUE
    )

    return validRange && validSeconds && validMinutes && validHours
  }

  const postData = async (data: FormData) => {
    return await api.post(
      `/series/track/${episode.seriesId}/episode/${episode.no}`,
      data
    )
  }

  const patchData = async (data: FormData) => {
    return await api.patch(
      `/series/track/${episode.seriesId}/episode/${episode.no}`,
      data
    )
  }

  const saveHandler = async () => {
    if (!rangeValid()) {
      toast.error('Please check your input')
      return
    }

    const formData = new FormData()
    formData.append('lastWatchTime', durationToString(durationInput))
    const { response } = episode.userEpisode
      ? await patchData(formData)
      : await postData(formData)

    if (response) {
      toast.success('Progress save success')
    } else {
      toast.error('Progress save failed')
    }

    onSave()
    close()
  }

  return (
    <ProgressModal
      title={title}
      close={close}
      onSave={saveHandler}
      disableSave={loading}
    >
      <span>{episode.title}</span>
      <div className="flex gap-2">
        <span>Watched</span>
        <input
          type="number"
          className="rounded-lg bg-platinum text-black px-2 outline-folly w-16"
          value={durationInput.hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <span>:</span>
        <input
          type="number"
          className="rounded-lg bg-platinum text-black px-2 outline-folly w-16"
          value={durationInput.minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
        <span>:</span>
        <input
          type="number"
          className="rounded-lg bg-platinum text-black px-2 outline-folly w-16"
          value={durationInput.seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
        <span>/{durationToString(episode.duration)}</span>
      </div>
      {!rangeValid() && (
        <span className="text-folly2">
          Invalid page number! Must be in range 00:00:00-
          {durationToString(episode.duration)}
        </span>
      )}
    </ProgressModal>
  )
}
