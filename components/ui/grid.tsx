import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type GridProps = ComponentProps<"div"> & {
  container?: boolean
  item?: boolean
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  spacing?: number
}

export function Grid({
  className,
  container = false,
  item = false,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing = 2,
  ...props
}: GridProps) {
  const gridClasses = cn(
    container && [
      'grid',
      'w-full',
      `gap-${spacing}`,
      'grid-cols-1',
      sm && `sm:grid-cols-${Math.min(12, Math.max(1, sm))}`,
      md && `md:grid-cols-${Math.min(12, Math.max(1, md))}`,
      lg && `lg:grid-cols-${Math.min(12, Math.max(1, lg))}`,
      xl && `xl:grid-cols-${Math.min(12, Math.max(1, xl))}`,
      !sm && !md && !lg && !xl && 'sm:grid-cols-2 lg:grid-cols-12',
    ],
    item && [
      'col-span-1',
      xs && `col-span-${Math.min(12, Math.max(1, xs))}`,
      sm && `sm:col-span-${Math.min(12, Math.max(1, sm))}`,
      md && `md:col-span-${Math.min(12, Math.max(1, md))}`,
      lg && `lg:col-span-${Math.min(12, Math.max(1, lg))}`,
      xl && `xl:col-span-${Math.min(12, Math.max(1, xl))}`,
    ],
    className
  )

  return <div className={gridClasses} {...props} />
}
