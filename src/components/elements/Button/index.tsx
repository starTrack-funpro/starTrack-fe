import { ButtonProps } from './interface'

export const Button: React.FC<
  React.HTMLProps<HTMLButtonElement> & ButtonProps
> = ({ variant = 'folly', disabled, onClick, children, className }) => {
  return (
    <button
      className={`rounded-xl px-4 py-2 font-semibold ${
        variant === 'folly' ? 'bg-folly' : ''
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
