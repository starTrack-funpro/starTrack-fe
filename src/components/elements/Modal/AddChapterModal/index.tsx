import { useApi } from '@hooks'
import { ProgressModal } from '..'
import { AddChapterModalProps } from './interface'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input } from '@elements'

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
        <Input type="text" onChange={(e) => setTitle(e.target.value)} />
        <span>Chapter No</span>
        <Input
          type="number"
          onChange={(e) => setChapterNo(Number(e.target.value))}
        />
        <span>Page</span>
        <div className="flex gap-2">
          <Input
            type="number"
            onChange={(e) => setPageFrom(Number(e.target.value))}
          />
          <span>to</span>
          <Input
            type="number"
            onChange={(e) => setPageTo(Number(e.target.value))}
          />
        </div>
      </div>
    </ProgressModal>
  )
}
