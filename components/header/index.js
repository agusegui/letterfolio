import cn from 'clsx'
import { Link } from 'components/link'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import { forwardRef } from 'react'
import shallow from 'zustand/shallow'
import s from './header.module.scss'

export const Header = forwardRef((_, ref) => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  return (
    <header className={s.header} ref={ref}>
      <Navigation />
      <div className={cn('lb', s.head)}>
        <div>
          <Link href="/">home</Link>
        </div>
        <button
          onClick={() => {
            setNavIsOpen(!navIsOpen)
          }}
        >
          menu
        </button>
        <div>
          {/* <Link href="/gsap">gsap</Link>
          <Link href="/contact">contact</Link> */}
          <Link href="/fm">@2022</Link>
        </div>
      </div>
      <div className={s.foot}>
        <div>O</div>

        <div className={s.scale}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'
