import cn from 'clsx'
import { Link } from 'components/link'
import { forwardRef, useState } from 'react'
import s from './header.module.scss'

export const Header = forwardRef((_, ref) => {
  const [copySuccess, setCopySuccess] = useState('')

  return (
    <header className={s.header} ref={ref}>
      <div className={cn('lb', s.head)}>
        <div className={s.left}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="48"
            viewBox="0 0 56 64"
            className={s.logo}
          >
            <g fill="white">
              <path
                d="M41.5,30.7c0,11.5-7.2,17.7-19.5,17.7S2.5,42.2,2.5,30.7S9.7,13.1,22,13.1C34.3,13,41.5,19.2,41.5,30.7z
              M14.8,33.8L16.5,21H10l1.6,12.8H14.8z M16,38.4c0-1.6-1.2-2.6-2.7-2.6s-2.7,1-2.7,2.6s1.2,2.6,2.7,2.6S16,40,16,38.4z M23.6,36.4
              l1.6-19.2h-6.5l1.6,19.2H23.6z M24.5,43.9V39h-5.1v4.9H24.5z M27.3,41.4h6.8l-3.3-5.8L27.3,41.4z M34,21.1h-6.5l1.7,12.7h3.2
              L34,21.1z"
              />
            </g>
          </svg>
          <Link href="/">Agustín Seguí</Link>
        </div>
        <div className={s.right}>
          <a>Contact Me</a>

          <button
            className={s.mail}
            onClick={() => {
              navigator.clipboard.writeText('agugalgui@gmail.com')
              setCopySuccess('Copied to clipboard!')
            }}
          >
            agugalgui@gmail.com
            <span className={s.click}>{copySuccess}</span>
          </button>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'
