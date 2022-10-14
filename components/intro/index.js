import { useMediaQuery } from '@studio-freight/hamo'
import cn from 'clsx'
import { useStore } from 'lib/store'
import { useEffect, useState } from 'react'
import s from './intro.module.scss'

export const Intro = () => {
  const isMobile = useMediaQuery('(max-width: 800px)')
  const [isLoaded, setIsLoaded] = useState(false)
  const [scroll, setScroll] = useState(false)
  const introOut = useStore(({ introOut }) => introOut)
  const setIntroOut = useStore(({ setIntroOut }) => setIntroOut)
  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.toggle('intro', false)
      return
    }

    if (!scroll) {
      document.documentElement.classList.add('intro', true)
    }

    if (lenis) {
      console.log(scroll)
      if (scroll) {
        lenis.start()
        document.documentElement.classList.toggle('intro', false)
      } else {
        setTimeout(() => {
          lenis.stop()
        }, 0)

        document.documentElement.classList.toggle('intro', true)
      }
    }
  }, [scroll, lenis, isMobile])

  return (
    <div
      className={cn(s.wrapper, isLoaded && s.out)}
      onTransitionEnd={(e) => {
        e.target.classList.forEach((value) => {
          if (value.includes('out')) {
            setScroll(true)
          }
          if (value.includes('show')) {
            setIntroOut(true)
          }
        })
      }}
    >
      <div className={isLoaded && s.relative}>
        <LTTR isLoaded={isLoaded} fill={'var(--black)'} />
      </div>
    </div>
  )
}

const LTTR = ({ isLoaded, className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 48"
      className={cn(s.lns, className)}
    >
      <g fill={fill}>
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 2 }}
          d="M32.1379 8.14014H25.4599L27.1294 21.1832H30.3641L32.1379 8.14014Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 2 }}
          d="M25.2512 28.8003H32.1379L28.6946 22.957L25.2512 28.8003Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 1 }}
          d="M21.495 23.7917L23.1645 4.17505H16.5908L18.2603 23.7917H21.495Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 1 }}
          d="M22.5384 31.4089V26.5047H17.3212V31.4089H22.5384Z"
        />

        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 3 }}
          d="M12.5214 21.1832L14.2952 8.14014H7.61719L9.28669 21.1832H12.5214Z"
        />
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 3 }}
          d="M13.7735 25.7743C13.7735 24.1048 12.5214 23.0613 11.0605 23.0613C9.49538 23.0613 8.3476 24.1048 8.3476 25.7743C8.3476 27.3395 9.59973 28.4872 11.0605 28.4872C12.5214 28.4872 13.7735 27.4438 13.7735 25.7743Z"
        />
      </g>
    </svg>
  )
}
