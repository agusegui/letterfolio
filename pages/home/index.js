import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'
import { ClientOnly } from 'components/isomorphic'
import { MarqueeScroll } from 'components/marquee-scroll'
import * as Select from 'components/select'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import s from './home.module.scss'

const WebGLDemo = dynamic(
  () => import('components/webgl').then(({ WebGLDemo }) => WebGLDemo),
  { ssr: false }
)

const WebGLBoard = dynamic(
  () => import('components/webgl-board').then(({ WebGLBoard }) => WebGLBoard),
  { ssr: false }
)

const ElementIn = ({ children, introOut }) => {
  return (
    <div className={cn(s['hide-text'], introOut && s['show-text'])}>
      {children}
    </div>
  )
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const rectRef = useRef()
  const [setRef, rect] = useRect()
  const introOut = useStore(({ introOut }) => introOut)

  useScroll(
    ({ scroll }) => {
      setHasScrolled(scroll > 10)
      if (!rect.top) return
      const top = rect.top - scroll
      const left = rect.left
      const width = rect.width
      const height = rect.height

      const string = `left:${Math.round(left)}px<br>top:${Math.round(
        top
      )}px<br>width:${width}px<br>height:${height}px<br>right:${Math.round(
        left + width
      )}px<br>bottom:${Math.round(top + height)}px`
      rectRef.current.innerHTML = string
    },
    [rect]
  )

  return (
    <Layout theme={'dark'}>
      <section className={s.home}>
        <div className={s.desk}>
          <div className={s.hero}>
            <ClientOnly>
              <WebGLDemo />
            </ClientOnly>
          </div>

          <div className={s.intro}>
            <div className={s.one}>
              <ul>
                <ElementIn introOut={introOut}>
                  <li>ABOUT</li>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <li>WORK</li>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <li>PROCESS</li>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <li>EXTRAS</li>
                </ElementIn>
              </ul>
              <ul>
                <ElementIn introOut={introOut}>
                  <li>CONTACT</li>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <li>CREDITS</li>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <li>BLOG</li>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <li>BKMRKS</li>
                </ElementIn>
              </ul>

              <div className={s.what}>
                <ElementIn introOut={introOut}>
                  <p>building identities</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>and websites thru</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>art direction</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>& visual design.</p>
                </ElementIn>
              </div>
              <div className={s.craft}>
                <ElementIn introOut={introOut}>
                  <p>++ craft</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>illustration</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>typography</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>creative dev</p>
                </ElementIn>
              </div>
              <div className={s.vision}>
                <ElementIn introOut={introOut}>
                  <p>++ vision</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>strategy</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>content</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>writing</p>
                </ElementIn>
              </div>
            </div>
            <div className={s.two}>
              <div className={s.desc}>
                <ElementIn introOut={introOut}>
                  <p>my dream work is in real partnership and</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>driven by deep focus, fun and curiosity.</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>based on research, value and strategy.</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>caring about authenticity & performance.</p>
                </ElementIn>
              </div>
              {/* <p></p> */}
              <ul>
                <ElementIn introOut={introOut}>
                  <p>FROM ARG</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>REMOTELY</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>IN SPAIN</p>
                </ElementIn>
                <ElementIn introOut={introOut}>
                  <p>
                    {new Date().toLocaleString('es-ES', {
                      timeZone: 'Europe/Madrid',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short',
                    })}
                  </p>
                </ElementIn>
              </ul>
            </div>
          </div>
          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            {' '}
            <div className={s.sq}></div>
          </div>
        </div>

        {/* <Marquee className={s.marquee} repeat={4}>
          <span className={s.item}>
            <span>Available from october ·</span>
          </span>
        </Marquee> */}
        <div className={s.gapm}></div>
        <div className={s.board}>
          <ClientOnly>
            <WebGLBoard />
          </ClientOnly>
        </div>
        <div>
          <ul>
            <li>WHO</li>
            <li>WHAT</li>
            <li>HOW</li>
            <li>WHY</li>
            <li>WHERE</li>
            <li>WHEN</li>
          </ul>
          <MarqueeScroll className={s.bigmarquee} repeat={3}>
            <span className={s.item}>🏶 it.s all about the vision </span>
          </MarqueeScroll>
          <MarqueeScroll className={s.bigmarquee} inverted repeat={3}>
            <span className={s.item}>🏶 transparency & values</span>
          </MarqueeScroll>
        </div>

        <div style={{ height: '100vh', padding: '50vw 0' }}>
          <Select.Root defaultValue="2">
            <Select.Item value="1">Item 1</Select.Item>
            <Select.Item value="2">Item 2</Select.Item>
            <Select.Item value="3">Item 3</Select.Item>
          </Select.Root>
        </div>

        <div style={{ height: '100vh' }} id="rect">
          <div
            ref={(node) => {
              setRef(node)
              rectRef.current = node
            }}
            style={{
              width: '350px',
              padding: '24px',
              height: '250px',
              backgroundColor: 'cyan',
              margin: '0 auto',
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
