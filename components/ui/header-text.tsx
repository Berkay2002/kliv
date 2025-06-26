import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type HeaderTextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeaderTextProps = ComponentProps<"h1"> & {
  variant?: HeaderTextVariant
  gutterBottom?: boolean
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'secondary' | 'default'
}

const variantClasses: Record<HeaderTextVariant, string> = {
  h1: 'text-4xl md:text-5xl font-extrabold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
}

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  default: 'text-foreground',
}

export function HeaderText({
  className,
  variant = 'h1',
  gutterBottom = false,
  align = 'left',
  color = 'default',
  ...props
}: HeaderTextProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <h1
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        gutterBottom && 'mb-4',
        className
      )}
      {...props}
    />
  )
}
