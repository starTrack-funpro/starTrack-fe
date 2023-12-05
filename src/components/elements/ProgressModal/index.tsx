import { useEffect, useState } from 'react'
import { ProgressModalProps } from './interface'
import { Button } from '../Button'

export const ProgressModal: React.FC<ProgressModalProps> = ({
  title,
  close,
  onSave,
  children,
  disableSave = false,
}) => {
  const [offsetY, setOffsetY] = useState(0)
  const [offsetX, setOffsetX] = useState(0)

  useEffect(() => {
    setOffsetY(window.scrollY)
    setOffsetX(window.scrollX)
  }, [window.scrollY, window.scrollX])

  return (
    <div
      className="flex justify-center items-center absolute h-full w-full bg-black/50"
      style={{
        top: offsetY,
        left: offsetX,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close && close()
        }
      }}
    >
      <div className="flex flex-col bg-black border border-folly2 rounded-2xl p-8 gap-4">
        <span className="text-xl font-semibold">{title}</span>
        <div className="flex flex-col gap-2">{children}</div>
        <div className="flex justify-end pt-4 gap-2">
          <Button variant="transparent" onClick={close}>
            Cancel
          </Button>
          <Button disabled={disableSave} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export * from './ChapterModal'
