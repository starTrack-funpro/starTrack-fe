import { Episode } from '../../EpisodeCard/interface'
import { ModalProps } from '../interface'

export interface EpisodeModalProps extends ModalProps {
  episode: Episode
}
