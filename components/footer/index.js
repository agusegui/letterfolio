import { Link } from 'components/link'
import s from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.left}>
        <p>agugalgui@gmail.com</p>
        <Link href="https://twitter.com/agusegui">Twitter</Link>
      </div>
      <p>2022</p>
    </footer>
  )
}
