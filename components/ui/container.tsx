import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type ContainerProps = ComponentProps<"div"> & {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centerContent?: boolean
}

export function Container({
  className,
  maxWidth = '2xl',
  centerContent = false,
  ...props
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'w-full px-4 mx-auto',
        maxWidthClasses[maxWidth],
        centerContent && 'flex flex-col items-center justify-center',
        className
      )}
      {...props}
    />
  )
}
