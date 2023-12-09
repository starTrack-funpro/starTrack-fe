import { ComponentPropsWithoutRef } from 'react'

export const Input: React.FC<ComponentPropsWithoutRef<'input'>> = ({
  onChange,
  value,
  type,
}) => {
  return (
    <input
      type={type}
      className="rounded-lg bg-platinum text-black px-2 outline-folly"
      onChange={onChange}
      value={value}
    />
  )
}
