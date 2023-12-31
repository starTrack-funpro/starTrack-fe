import Image from 'next/image'
import { Series } from './interface'
import { Chips } from '../Chips'

export const SeriesCard: React.FC<Series> = ({
  title,
  year,
  imageUrl,
  rating,
  seriesType,
}) => {
  return (
    <div className="flex rounded-2xl py-6 px-8 bg-white/10 gap-8 hover:cursor-pointer hover:scale-105 transition-all">
      <Image
        className="rounded-lg"
        src={imageUrl}
        alt="image"
        width={92}
        height={200}
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-xl">{title}</span>
          <span className="">{year}</span>
          <span className="">Rated {rating}/5</span>
        </div>
        <Chips value={seriesType} />
      </div>
    </div>
  )
}
