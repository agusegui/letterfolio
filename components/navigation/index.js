import { useLayoutEffect } from '@studio-freight/hamo'
import { Link } from 'components/link'
import { useStore } from 'lib/store'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'
import s from './navigation.module.scss'
export const Navigation = () => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  const router = useRouter()

  useLayoutEffect(() => {
    const onRouteChange = () => {
      setNavIsOpen(false)
    }

    router.events.on('routeChangeStart', onRouteChange)

    return () => {
      router.events.off('routeChangeStart', onRouteChange)
    }
  }, [])

  return (
    <div
      className={s.navigation}
      // className={cn(s.navigation, !navIsOpen && s.closed)}
    >
      <Link href="#intro">Intro</Link>
      <Link href="#about-me">About me</Link>
      <Link href="#to-share">What to share</Link>
      <Link href="#why">Why Im Here</Link>
      <Link href="#colophon">Colophon</Link>
    </div>
  )
}
