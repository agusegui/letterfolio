import { Link } from 'components/link'
import s from './navigation.module.scss'

export const Navigation = () => {
  return (
    <div className={s.navigation}>
      <Link href="#intro">Intro</Link>
      <Link href="#about-me">About me</Link>
      <Link href="#to-share">Working together</Link>
      <Link href="#why">The Why</Link>
      <Link href="#colophon">Colophon</Link>
    </div>
  )
}
