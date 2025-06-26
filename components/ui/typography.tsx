import * as React from "react";
import { cn } from "@/lib/utils"
import { ComponentProps, ElementType } from "react"

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted'

type TypographyProps<T extends ElementType> = {
  variant?: TypographyVariant
  as?: T
  gradient?: boolean
} & Omit<ComponentProps<T>, "as">

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
}

export function Typography<T extends ElementType = 'p'>({
  className,
  variant = 'p',
  as,
  gradient = false,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p'
  const baseClasses = variantClasses[variant] || ''
  
  return (
    <Component
      className={cn(
        baseClasses,
        gradient && 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
        className
      )}
      {...(props as ComponentProps<T>)}
    />
  )
}