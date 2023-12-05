import { useApi } from '@hooks'
import { ProgressModal } from '..'
import { AddChapterModalProps } from './interface'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const AddChapterModal: React.FC<AddChapterModalProps> = ({
  seriesId,
  close,
  onSave,
}) => {
  const [title, setTitle] = useState('')
  const [chapterNo, setChapterNo] = useState(0)
  const [pageFrom, setPageFrom] = useState(0)
  const [pageTo, setPageTo] = useState(0)
  const { api, loading } = useApi()

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('no', chapterNo.toString())
    formData.append('pageFrom', pageFrom.toString())
    formData.append('pageTo', pageTo.toString())

    const { response } = await api.post(`/series/${seriesId}/chapter`, formData)

    if (response) {
      toast.success('Successfully add chapter.')
    } else {
      toast.error('Add chapter failed.')
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
        <input
          type="text"
          className="rounded-lg bg-platinum text-black px-2 outline-folly"
          onChange={(e) => setTitle(e.target.value)}
        />
        <span>Chapter No</span>
        <input
          type="number"
          className="rounded-lg bg-platinum text-black px-2 outline-folly"
          onChange={(e) => setChapterNo(Number(e.target.value))}
        />
        <span>Page</span>
        <div className="flex gap-2">
          <input
            type="number"
            className="rounded-lg bg-platinum text-black px-2 outline-folly w-20"
            onChange={(e) => setPageFrom(Number(e.target.value))}
          />
          <span>to</span>
          <input
            type="number"
            className="rounded-lg bg-platinum text-black px-2 outline-folly w-20"
            onChange={(e) => setPageTo(Number(e.target.value))}
          />
        </div>
      </div>
    </ProgressModal>
  )
}
