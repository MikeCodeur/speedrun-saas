import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-black border-white/20 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm',
  ghost:
    'bg-transparent text-white/80 border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const baseStyles =
  'inline-flex items-center justify-center rounded-lg border font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {label}
    </button>
  )
}
