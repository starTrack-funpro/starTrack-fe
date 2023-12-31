import { useState } from 'react'
import { ProgressModal } from '..'
import { ChapterModalProps } from './interface'
import { useApi } from '@hooks'
import toast from 'react-hot-toast'
import { rangeValidation } from '@utils'
import { Input } from '@elements'

export const ChapterModal: React.FC<ChapterModalProps> = ({
  close,
  onSave,
  chapter,
}) => {
  const title = chapter.userChapter ? 'Edit Progress' : 'Add Progress'
  const [pageInput, setPageInput] = useState<number | string>(
    chapter.userChapter ? chapter.userChapter.lastReadPage : chapter.pageFrom
  )
  const { api, loading } = useApi()

  const rangeValid = () => {
    return rangeValidation(chapter.pageFrom, Number(pageInput), chapter.pageTo)
  }

  const postData = async (data: FormData) => {
    return await api.post(
      `/series/track/${chapter.seriesId}/chapter/${chapter.no}`,
      data
    )
  }

  const patchData = async (data: FormData) => {
    return await api.patch(
      `/series/track/${chapter.seriesId}/chapter/${chapter.no}`,
      data
    )
  }

  const saveHandler = async () => {
    if (!rangeValid()) {
      toast.error('Please check your input')
      return
    }

    const pageInputNum = Number(pageInput)

    if (!Number.isInteger(pageInputNum)) {
      toast.error('Please enter an integer')
      return
    }

    const formData = new FormData()
    formData.append('lastReadPage', pageInputNum.toString())
    const { response } = chapter.userChapter
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
      <span>{chapter.title}</span>
      <div className="flex gap-2">
        <span>Page</span>
        <Input
          type="number"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
        />
        <span>/{chapter.pageTo}</span>
      </div>
      {!rangeValid() && (
        <span className="text-folly2">
          Invalid page number! Must be in range {chapter.pageFrom}-
          {chapter.pageTo}
        </span>
      )}
    </ProgressModal>
  )
}
