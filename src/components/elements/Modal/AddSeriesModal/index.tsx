import { useState } from 'react'
import { ProgressModal } from '..'
import { AddSeriesModalProps } from './interface'
import { rangeValidation } from '@utils'
import toast from 'react-hot-toast'
import { useApi } from '@hooks'
import { Input } from '@elements'

export const AddSeriesModal: React.FC<AddSeriesModalProps> = ({
  close,
  onSave,
}) => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Comic')
  const [year, setYear] = useState(0)
  const [rating, setRating] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const { api, loading } = useApi()

  const handleSave = async () => {
    if (!rangeValidation(0, rating, 5)) {
      toast.error('Rating must be in range 0-5')
      return
    }

    if (!rangeValidation(0, year, 2023)) {
      toast.error('Year must be in range 0-2023')
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('year', year.toString())
    formData.append('rating', rating.toString())
    formData.append('description', description)
    formData.append('seriesType', type)
    formData.append('imageUrl', imageUrl)

    const { response } = await api.post('/series', formData)

    if (response) {
      toast.success('Successfully add series.')
    } else {
      toast.error('Add series failed.')
    }

    onSave()
    close()
  }

  return (
    <ProgressModal
      title="Add Series"
      close={close}
      onSave={handleSave}
      disableSave={loading}
    >
      <div className="flex flex-col gap-2 w-64">
        <span>Title</span>
        <Input type="text" onChange={(e) => setTitle(e.target.value)} />
        <span>Type</span>
        <select
          className="rounded-lg bg-platinum text-black px-2 outline-folly"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Comic">Comic</option>
          <option value="Novel">Novel</option>
          <option value="TVSeries">TV Series</option>
          <option value="Film">Film</option>
        </select>
        <span>Year</span>
        <Input
          type="number"
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <span>Rating</span>
        <Input
          type="number"
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <span>Image URL</span>
        <Input type="text" onChange={(e) => setImageUrl(e.target.value)} />
        <span>Description</span>
        <textarea
          className="rounded-lg bg-platinum text-black px-2 outline-folly"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </ProgressModal>
  )
}
