import { useRect } from '@studio-freight/hamo'
import { ClientOnly } from 'components/isomorphic'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import s from './home.module.scss'

const WebGLBoard = dynamic(
  () => import('components/webgl-board').then(({ WebGLBoard }) => WebGLBoard),
  { ssr: false }
)

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const rectRef = useRef()
  const [setRef, rect] = useRect()

  useScroll(
    ({ scroll }) => {
      setHasScrolled(scroll > 10)

      const string = `${Math.round(scroll)}`
      rectRef.current.innerHTML = string
    },
    [rect]
  )

  return (
    <Layout theme={'light'}>
      <section className={s.home}>
        <div className={s.gl}>
          <ClientOnly>
            <WebGLBoard />
          </ClientOnly>
        </div>
        <div className={s.intro}>
          <p>
            Hey Lettermatic team! I’ts a pleasure to being in contact with you
            with such an amazing oportunity!
          </p>
          <br />
          <p>Welcome to my Letterfolio. My name is Agu.</p>
          <br />
        </div>

        <div className={s.content}>
          <p>
            I only apply to positions that makes me feel in home and valued as a
            person, not as an asset. It’s so hard to find jobs in this way -I
            lack a lot of work because that- but I’m sure that every project
            I’ve participated came with real people and a kind of energy that
            produces creative outputs without limits.{' '}
          </p>
        </div>
        <div style={{ height: '100vh' }} id="rect">
          <div
            ref={(node) => {
              setRef(node)
              rectRef.current = node
            }}
            style={{
              position: 'fixed',
              right: '0',
              bottom: '0',
              width: '96px',
              height: '96px',
              fontSize: '16px',
              // backgroundColor: 'black',
              color: 'black',
            }}
          ></div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
