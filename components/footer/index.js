import { Link } from 'components/link'
import s from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <p>agugalgui@gmail.com</p>
      {/* <Link href="/contact">contact</Link> */}
      <Link href="https://twitter.com/agusegui">Twitter</Link>
      <p>2022</p>
    </footer>
  )
}
