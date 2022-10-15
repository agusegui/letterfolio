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

      // const string = `${Math.round(scroll / 100 + 15)}%`
      // rectRef.current.innerHTML = string
    }
    // [rect]
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
            Hey Lettermatic team! Greetings from Europe! I’ts really a boost to
            being in contact with you on such an amazing oportunity!
          </p>
          <br />
          <p>Welcome to my Letterfolio. My name is Agu.</p>
          <br />
        </div>

        <div id="intro" className={s.content}>
          <p className="firstletter">
            Reading such a job post was already valuable to me, because it
            touched me deeply in a time where I’m struggling to find jobs that
            have room for share my values ​​and build something with love.
            <br />
            <br />I only apply to positions that makes me feel in home and
            valued as a person, not as an asset. I know. It’s hard to find jobs
            in this way, but I’m sure that every project I’ve participated came
            with real people and a kind of energy that opens a creative output
            without limits. <br />
            <br />
            A project to play with passion? Based in trust and room for
            creativity? I’m in. Here I feel the purpouse, the love and the
            long-term spirit. Even if the job were just for a day, I would love
            to work with such people. <br />
            <br />
            So. Thank you very much! I’m feeling better now, just reading that
            kindful way to call other people to join a project you have created
            close together from the very scratch. I feel I’ll have the same
            spirit if my projects go well enough to hire other people. <br />
            <br />
            Now, let me introduce you about myself with the same transparency
            and authenticity that brought me here. I don’t know how long it will
            be, but I’m sory in advance if it turns out a long reading.
            <br />
            <br />
          </p>
        </div>

        <div id="about-me" className={s.content}>
          <h3 className={s.title}>About me</h3>
          <h4 className={s.subtitle}>From a type-graphic point of view</h4>
          <p>
            I’m not comfortable with fancy titles or rigid skillsets. I’m a
            person who breath with arts, culture, music and everything that
            usually have a visual expression appended.
            <br />
            <br />
            Anyway, I wouldn't apply if I wasn't a kind of graphic/visual
            designer. It’s just that feels better when we can honor the
            generalist nature of the design practice, especially as a cultural
            expression, rather than a static job role.
            <br />
            <br />
            In that sense, as a creator, I’m a collage itself. Curiosity makes
            me feel human; the study of different things makes me grow as a
            person and as an artist. I love to collaborate and build value as
            passionly undesrtanding the view and sense of other people.
            <br />
            <br />
            As a designer I like so much the web as a space for creation,
            expression and interaction with people and experiences. I love
            websites, but I’ve discovered so much inspiration from the print and
            editorial sides of graphic design. I’ve fallen in love with the big
            and deep fascinating worlds behind typography. I also like to draw
            (I’m in love with your characters!) and make illustrations for many
            purpouses, but also having an interest on the marketing side of
            things; while coding my own projects (like this one); and playing
            with other fields like motion, 3D visuals, creative coding,
            photography, music.
            <br />
            <br />
            And that is why I’m here. I’ve worked in many different projects
            with different purposes and different problems to solve, but always
            with an identity to care, to enhance and to make it breath.
            <br />
            <br />
            The thing is that I feel that every tool is just a medium. The real
            thing is in the content. The emotional core.
            <br />
            <br />
            And that is why I’m here. I’ve worked in many different projects
            with different purposes and different problems to solve, but always
            with an identity to care, to enhance and to help it to grow and
            breath. Each project was so different that I couldn’t have the same
            model to go with all of them. And here is when I feel that
            typography is something that works similar, especially in that sense
            of having so diferent worlds and systems, but based on the same
            characters!
            <br />
            <br />
            I’ve worked in Music, Gastronomics, Youtube Content, Festivals,
            Artists, and Magazines. Now I’m working on the web. And I’ve
            realized that every project was touched for some typographic
            decition -sometimes really bad, sometimes better- but finally ending
            in a present moment where I find myself not being able to desing
            anything without apreciating the voices, the personalities and the
            structures that live inside a typeface. It blows my mind! I’m so
            grateful about how much typography taught me.
          </p>
        </div>
        <div id="to-share" className={s.content}>
          <h3 className={s.title}>What I wanna do.</h3>
          <br />
          <p>
            With this feeling I think I can share with you so many things. I
            learned to care a lot about identity because typography, and that
            maked me being closely looking for type related brands and projects
            that fits me. Actually, I’m building a portfolio for being around
            projects I like. And the projects I have on mind the most are type
            foundries! Not to design typefaces, but to play and build value with
            them; something like the brand side, the community side and the
            oportunities around...
            <br />
            <br />
            So, sooner or later I was going to appear somewhere in your inbox,
            because you are on top of my list! But now, especially with this job
            advertisment on line, I couldn’t wait to finish that entire
            porfolio. So, I will share some parts that speaks about my vision.
            <br />
            <br />
          </p>
          <h4 className={s.subtitle}>From a type-graphic point of view</h4>
          <p>
            Before all, I think that Lettermatic has a solid brand, and you are
            looking for someone that can expand and remix the concept. And that
            sounds very nice to me. I like to digest brands and then think on
            ways to distribute his voice in different ways, always working
            without breaking his core authenticity.
            <br />
            <br />
            So, first of all I’m eager to make my research about you -the
            people- and then about the brand. I think I’ll learn so many new
            things on a project like this, and I’m feeling already sure about
            it.
            <br />
            <br />
            Then I’ll take an account of the basic necessities that you are
            looking for. I’ve read closely on the kind of work you describe and
            I can say some things about it as follows:
          </p>
          <ul>
            <li>
              I love to think on case studies. I learned a LOT with yours.
            </li>
            <li>
              I’ve a lot of experience on social media, so I can share my vision
              about it and expand our mindset.
            </li>
            <li>
              I love to make posters and graphics, especially with type. Kind of
              a dream job for me.
            </li>
            <li>
              I enjoy to present and pitch things visually. My communication
              background loves it.
            </li>
            <li>
              I need to do research and undesrtand history to go deeper on a
              given process. My journalistic soul helps a lot.
            </li>
          </ul>
          <p>
            By my side, I can go further, always in line with objectives and
            scope.
          </p>
          <ul>
            <li>
              I like to put letters to dance. Motion, animation, kinetic things,
              variable possibilities, interpolations, svg, lottie, web fonts,
              distance field fonts and glsl, etc. (If you see this page on
              desktop you have examples on the left gallery).
            </li>
            <li>
              I know the basics of typography, and a little more. Here on the
              left you can see a glimpse of a personal sans serif typeface that
              I built for fun, research and practice: AS Noir.
            </li>
            <li>
              I like to make specimens. My little own font maked me realize
              that. Not only on print but also in web (interactive).
            </li>
            <li>
              I love to write things. I’m working to get better at english, but
              spanish is my native laguage and I think there are a big
              community. I’m writing a blog (eng) to release with my personal
              website. Hope it will be live soon!
            </li>
            <li>
              I’ve produced video content and podcasts. I’ve founded a Youtube
              Channel for a flamenco guitarist from scratch and we grow to +30K
              in one year and with such a difficult subjet. Now keeps growing at
              pace.
            </li>
          </ul>
          <p>
            Well. I know that maybe these are already so many things and I don’t
            pretend that we are going to make all of it at the same time. I’m
            just looking in to my potential and experiences to share the kind of
            things I think can help the most to distribute some concepts of the
            brand. <br />
            <br />I don’t have a cool rèsumè. I don’t have collabs with fancy
            brands. With so spreadly knowledge, sometimes I suffer a lot in my
            personal career because there are not many places with room for some
            generalist people as me, especially in this world of extreme
            specificity. So, I’m already glad of having the oportunity to think
            broadly here.
          </p>
        </div>
        <div id="why" className={s.content}>
          <h3 className={s.title}>Why I’m here. </h3>
          <h4 className={s.subtitle}>The threads of Rylei.</h4>
          <p>
            I know you worked with Studio Freight and Basement Studio. Great
            people, excelent profesionals. I’m eager to share some work with
            them because I share much of his vision.
            <br />
            <br />
            I’ve been introduced on Lettermatic trough Franco Arza, who
            retweeted one of the amazing threads that Rylei shares in Twitter.
            He said then that working with you was an amazing experience because
            the knowledge and passion that arises from your work. I get engaged
            with your content from that time and it helps me a lot to dive
            deeper in the subtle details of the field.
            <br />
            <br />
            Some threads like the recent one of fenders and typefaces spoke so
            strongly to me, not just because the type subject, but also because
            I’m a guitarist and a big lover of great-weird analogies. The world
            is so much related itself and I love when one realizes that and then
            just wanna speak and share thoughts about it.
            <br />
            <br />
            The thing is that I feel that peculiarity of human touch on those
            ways of sharing your work. And not speaking only about the visual
            side of the work, but also the thoughts, the relationships and the
            love behind it.
            <br />
            <br />
          </p>
          <h4 className={s.subtitle}>My journey with typography.</h4>
          <p>
            I have dangerous levels of curiosity and I love to work with enough
            research. I like the feeling of diving deeper on each process,
            always learning things and connecting the dots that draws the whole
            circle of the culture we live in.
            <br />
            <br />
            I’ve wondering so many years if I can find a place where I can
            integrate all the things that makes a sense around interdisciplinary
            fields I live and breathe. I love everything about interpolation,
            textures, composition, systems, orchestation, rithm. don’t matters
            in what discipline. But I’m thinking that typography is getting
            around so many places I love and I have so much fun.
            <br />
            <br />I think that visual design is nothing if we can’t appreciate
            the different parts that makes it valuable. And now I recognize that
            I can’t design anything without think properly about typography.
            From that point in my life I just can’t stop feeling things while
            letters are in my field of view.
            <br />
            <br />
            While I’m falling in love with type related possibilities -both in
            print and web canvases- I was wondering if there could be an
            oportunity to work with typography without being a formal
            typographer. I love to draw letters, I have some personal -and very
            noob- projects that changed completly my view on everything related
            to design and communication. I don’t know if I can have a foundry
            some day. Today I can’t afford a mac (for glyphs app), so I tried to
            make something with a mix of Illustrator, Figma and Font Forge. Kind
            of a hell but it was worthy.
            <br />
            <br />
            The Lettermatic website and the twitter threads helped me a lot on
            this project. It’s difficult to find type related content that
            explains so subtle things that we can encounter throug a complex
            system like Parclo, to put an example.
            <br />
            <br />
            Although it’s -yes- another all caps geometric sans serif, I’ve
            imprinted some personal details that I was looking for in that
            genre. One thing I enjoyed a LOT is playing with the typeface and
            making some specimens. I’m thinkin on type specimens not just as
            static print catalogue, I also see a lot of great oportunities in
            the motion and interactive languages of the web.
          </p>
        </div>
        <div
          style={{
            height: '150vh',
          }}
        >
          hey
        </div>
        {/* <div id="rect">
          <div
            ref={(node) => {
              setRef(node)
              rectRef.current = node
            }}
            style={{
              position: 'fixed',
              right: '0',
              padding: '12px',
              bottom: '96px',
              width: '192px',
              height: '48px',
              fontSize: '16px',
              textAlign: 'center',
              backgroundColor: '#fefbf5',
              color: 'black',
            }}
          ></div>
        </div> */}
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
