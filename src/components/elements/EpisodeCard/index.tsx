import { Button } from '../Button'
import { Episode, EpisodeCardProps } from './interface'

export const EpisodeCard: React.FC<Episode & EpisodeCardProps> = ({
  title,
  duration,
  userEpisode,
  withProgress = false,
  onButtonClick,
}) => {
  return (
    <div className="flex items-center justify-between bg-white/10 py-6 px-8 rounded-2xl">
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{title}</span>
        <span>
          Duration {duration.hours}h{duration.minutes}m
        </span>
      </div>
      {withProgress && (
        <div className="flex items-center gap-4">
          {userEpisode && (
            <span>
              Last watched: {userEpisode.lastWatchTime.hours}:
              {userEpisode.lastWatchTime.minutes}:
              {userEpisode.lastWatchTime.seconds}
            </span>
          )}
          <Button onClick={onButtonClick}>
            {userEpisode ? 'Edit Progress' : 'Add Progress'}
          </Button>
        </div>
      )}
    </div>
  )
}
