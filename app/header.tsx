"use client"

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeaderProps {
  title: string
  description: string
  imageUrl: string
  className?: string
}

export function Header({
  title,
  description,
  imageUrl,
  className
}: HeaderProps) {
  const [lineBoxWidth, setLineBoxWidth] = useState(65)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (!headerRef.current) return

      const scrollTop = window.scrollY
      const headerHeight = headerRef.current.offsetHeight
      const startScroll = headerHeight / 2

      if (scrollTop > startScroll) {
        const newWidth = Math.max(30, 65 - (scrollTop - startScroll) / 15)
        setLineBoxWidth(newWidth)
      } else {
        setLineBoxWidth(65)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMounted) {
    return (
      <div
        className={cn(
          'relative h-[60vh] w-full bg-gray-100',
          className
        )}
      />
    )
  }

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="Header background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={headerRef}
        className={cn(
          'relative z-10 mx-auto flex min-h-[60vh] flex-col justify-center py-16 text-white',
          className
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                as="h1"
                className={cn(
                  'mb-6 font-oswald text-4xl font-extrabold uppercase leading-tight tracking-tight',
                  'md:text-5xl lg:text-6xl xl:text-7xl',
                  'text-white',
                  'transition-all duration-300 ease-in-out',
                  'hover:tracking-wider'
                )}
              >
                {title}
              </Typography>

              <motion.div
                className="relative mb-8 h-1.5 w-full overflow-hidden bg-muted/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.div
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                  initial={{ width: 0 }}
                  animate={{ width: `${lineBoxWidth}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </motion.div>

              <Typography
                as={motion.p}
                variant="lead"
                className="text-lg text-white/90 md:text-xl max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {description}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}