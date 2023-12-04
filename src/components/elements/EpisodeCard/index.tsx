import { Episode } from './interface'

export const EpisodeCard: React.FC<Episode> = ({ title, duration }) => {
  return (
    <div className="flex flex-col bg-white/10 py-6 px-8 rounded-2xl gap-2">
      <span className="font-semibold">{title}</span>
      <span>
        Duration {duration.hours}h{duration.minutes}m
      </span>
    </div>
  )
}
