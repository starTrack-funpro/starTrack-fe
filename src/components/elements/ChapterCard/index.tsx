import { Button } from '../Button'
import { Chapter, ChapterCardProps } from './interface'

export const ChapterCard: React.FC<Chapter & ChapterCardProps> = ({
  title,
  pageFrom,
  pageTo,
  userChapter,
  withProgress = false,
  onButtonClick,
}) => {
  return (
    <div className="flex items-center bg-white/10 py-6 px-8 rounded-2xl justify-between">
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{title}</span>
        <span>
          Page {pageFrom}-{pageTo}
        </span>
      </div>
      {withProgress && (
        <div className="flex items-center gap-4">
          {userChapter && (
            <span>Last read: Page {userChapter.lastReadPage}</span>
          )}
          <Button onClick={onButtonClick}>
            {userChapter ? 'Edit Progress' : 'Add Progress'}
          </Button>
        </div>
      )}
    </div>
  )
}
