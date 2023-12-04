import { Chapter } from './interface'

export const ChapterCard: React.FC<Chapter> = ({ title, pageFrom, pageTo }) => {
  return (
    <div className="flex flex-col bg-white/10 py-6 px-8 rounded-2xl gap-2">
      <span className="font-semibold">{title}</span>
      <span>
        Page {pageFrom}-{pageTo}
      </span>
    </div>
  )
}
