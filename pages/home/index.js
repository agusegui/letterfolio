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
          <p className="firstletter">
            Rem. I only apply to positions that makes me feel in home and valued
            as a person, not as an asset. It’s so hard to find jobs in this way
            -I lack a lot of work because that- but I’m sure that every project
            I’ve participated came with real people and a kind of energy that
            produces creative outputs without limits. <br />
            <br />
            Reading such a job post was already valuable to me, because it
            touched me deeply in a time where I’m struggling to find jobs that
            have room for share my values ​​and build something with love..{' '}
            <br />
            <br />
            A project to play with passion? Based in trust and room for
            creativity? I’m in. Here I feel the purpouse, the love and the
            long-term spirit. Even if the job were just for a day, I would love
            to work with people. <br />
            <br />
            So. Thank you very much. I’m feeling better now, just reading that
            kindful way to call other people to join a project you have created
            together and closely from the very scratch. I feel I wanna have the
            same spirit if my projects go well enough to hire other people.{' '}
            <br />
            <br />
            Now, let me introduce you about myself with the same transparency
            and authenticity that brought me here. I don’t know how long it will
            be, but I’m sory in advance if it turns out a long reading.
            <br />
            <br />
          </p>
        </div>

        <div className={s.content}>
          <h3 className={s.title}>About me</h3>
          <h4 className={s.subtitle}>From a type-graphic point of view</h4>
          <p>
            I’m not comfortable with fancy titles or rigid skillsets. I’m a
            person who breath with arts, culture, music and everything that
            usually have a visual expression appended.
            <br />
            <br />
            Anyway, I wouldn't apply if I wasn't a kind of graphic/visual
            designer.
            <br />
            <br />
            But feels better when we can honor the generalist nature of the
            design practice, especially as a cultural expression, rather than a
            static job role.
            <br />
            <br />
            In that sense, as a creator, I’m a collage itself. I like to draw
            (I’m in love with your characters!); I enjoy shoting and editing
            photos and films; I like the marketing side of things; I code my own
            projects (like this one); I play with animation and 3D, I’m writing
            for my blog and I’m building some side projects to enhance my career
            and find new oportunities.
            <br />
            <br />
            The thing is that I feel that every tool is just a medium. The real
            thing is in the content. The emotional core.
            <br />
            <br />
            And that is why I’m here. I’ve worked in many different projects
            with different purposes and different problems to solve, but always
            with an identity to care, to enhance and to make it breath.
            <br />
            <br />
            Each project was so different that I couldn’t have the same model to
            go with all of them. And here is when I feel that typography is
            something that works similar, especially in that sense of having so
            diferent worlds and systems, but based on the same characters!
            <br />
            <br />
            I’ve worked in Music, Gastronomics, Youtube Content, Festivals,
            Artists, and Magazines. Now I’m working on the web. And I’ve
            realized that every project was touched for some typographic
            decitions -sometimes really bad, sometimes better- but ending in a
            present moment where I find myself not being able to desing anything
            without apreciating the voices, personalities and structures that
            live in a typeface. It blows my mind! I’m so grateful about how much
            typography taught me.
          </p>
        </div>

        <div id="rect">
          <div
            ref={(node) => {
              setRef(node)
              rectRef.current = node
            }}
            style={{
              position: 'fixed',
              right: '0',
              bottom: '0',
              width: '192px',
              height: '96px',
              fontSize: '16px',
              textAlign: 'center',
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
