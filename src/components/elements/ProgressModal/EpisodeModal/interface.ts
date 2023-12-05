import { Episode } from '../../EpisodeCard/interface'
import { ProgressModalProps } from '../interface'

export interface EpisodeModalProps extends ProgressModalProps {
  episode: Episode
}
