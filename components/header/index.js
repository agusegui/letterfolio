import cn from 'clsx'
import { Link } from 'components/link'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import { forwardRef } from 'react'
import shallow from 'zustand/shallow'
import s from './header.module.scss'

// const LTTR = dynamic(() => import('../../svg/letterlogo.svg'), { ssr: false })

export const Header = forwardRef((_, ref) => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  return (
    <header className={s.header} ref={ref}>
      <Navigation />
      <div className={cn('lb', s.head)}>
        {/* <LTTR /> */}
        <Link href="/">Agustín Seguí</Link>

        {/* <button
          onClick={() => {
            setNavIsOpen(!navIsOpen)
          }}
        >
          menu
        </button> */}
        <div>
          {/* <Link href="/gsap">gsap</Link>
          <Link href="/contact">contact</Link> */}
          <Link href="/fm">Contact Me</Link>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'
