import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type SwiperSlideProps = ComponentProps<"div"> & {
  /**
   * Slide width (in columns, 1-12)
   * @default 12
   */
  width?: number
  /**
   * Slide height (auto, full, or specific height)
   * @default 'auto'
   */
  height?: 'auto' | 'full' | string
}

export function SwiperSlide({
  className,
  width = 12,
  height = 'auto',
  style,
  ...props
}: SwiperSlideProps) {
  const heightClass = {
    auto: 'h-auto',
    full: 'h-full',
  }[height] || ''

  return (
    <div
      className={cn(
        'swiper-slide',
        `w-full md:w-${width}/12`,
        heightClass,
        'flex-shrink-0',
        className
      )}
      style={{
        ...style,
        ...(height && !['auto', 'full'].includes(height) ? { height } : {}),
      }}
      {...props}
    />
  )
}
