import { RadioInterface } from './interface'

export const Radio: React.FC<
  React.HTMLProps<HTMLInputElement> & RadioInterface
> = ({ onChange, label, value, currentValue, name }) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        onChange={onChange}
        checked={value === currentValue}
        className="accent-folly"
      />
      <span className="px-2">{label}</span>
    </label>
  )
}
