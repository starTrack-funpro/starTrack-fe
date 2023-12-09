import { useState } from 'react'
import { AddEpisodeModalProps } from './interface'
import { Duration } from '../../EpisodeCard/interface'
import { durationToString, parseDuration } from '@utils'
import { useApi } from '@hooks'
import { ProgressModal } from '..'
import toast from 'react-hot-toast'
import { Input } from '@elements'

export const AddEpisodeModal: React.FC<AddEpisodeModalProps> = ({
  seriesId,
  close,
  onSave,
}) => {
  const [title, setTitle] = useState('')
  const [episodeNo, setEpisodeNo] = useState(0)
  const [durationInput, setDurationInput] = useState<Duration>(
    parseDuration('00:00:00')
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

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('no', episodeNo.toString())
    formData.append('duration', durationToString(durationInput))

    const { response } = await api.post(`/series/${seriesId}/episode`, formData)

    if (response) {
      toast.success('Successfully add episode.')
    } else {
      toast.error('Add episode failed.')
    }

    onSave()
    close()
  }

  return (
    <ProgressModal
      title="Add Chapter"
      close={close}
      onSave={handleSave}
      disableSave={loading}
    >
      <div className="flex flex-col gap-2 w-64">
        <span>Title</span>
        <Input type="text" onChange={(e) => setTitle(e.target.value)} />
        <span>Episode No</span>
        <Input
          type="number"
          onChange={(e) => setEpisodeNo(Number(e.target.value))}
        />
        <span>Duration</span>
        <div className="flex gap-2">
          <Input
            type="number"
            value={durationInput.hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <span>:</span>
          <Input
            type="number"
            value={durationInput.minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <span>:</span>
          <Input
            type="number"
            value={durationInput.seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>
      </div>
    </ProgressModal>
  )
}
