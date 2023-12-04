export const Chips: React.FC<React.HTMLProps<HTMLDivElement>> = ({ value }) => {
  return (
    <span className="flex justify-center items-center bg-folly rounded-full px-4 py-1 w-fit">
      {value}
    </span>
  )
}
