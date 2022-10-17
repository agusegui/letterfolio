import { ClientOnly } from 'components/isomorphic'
import { Layout } from 'layouts/default'
import dynamic from 'next/dynamic'
import s from './home.module.scss'

const WebGLBoard = dynamic(
  () => import('components/webgl-board').then(({ WebGLBoard }) => WebGLBoard),
  { ssr: false }
)

export default function Home() {
  return (
    <Layout theme={'light'}>
      <section className={s.home}>
        <div className={s.gl}>
          <ClientOnly>
            <WebGLBoard />
          </ClientOnly>
        </div>
        <h2 className={s.hero}>Hi!</h2>
        <p className={s.disc}>
          Please! Take a visit on desktop <br />
          to see the gallery.
          <br />
          <br />
        </p>
        <div id="hom" className={s.intro}>
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
            Reading such a job post was already valuable to me, because it made
            me feel at home and valued as a person, not as an asset. I was
            wondering if there will be a place to work with people that have
            room for values ​​and eager to build something with love.
            <br />
            <br />
            A project to play with passion? A project based in trust and room
            for creativity? A project full of typefaces? I’m in! Here I feel the
            purpose and the long-term spirit. Your warmness made me feel
            something like artisan vibes that gives me hope about the industry.
            Even if the job were just for a day, I would love to team up and
            build beautiful things with such people!
            <br />
            <br />
            Now, let me introduce myself with the same transparency and
            authenticity that brought me here. I hope this will help you to know
            me the best from the very first moment. <br />
            <br />I also made this for you!
          </p>
        </div>

        <div id="about-me" className={s.content}>
          <h3 className={s.title} id="about-me">
            About me.
          </h3>
          <br />
          <br />
          <p className="serifi">
            My vision is driven by strategy, meaning, emotion and simplicity. I
            stand for good work, long lasting relationships, deep culture and
            sustainability. My dream work is driven by research, strategy,
            curiosity and meaningful content.
            <br />
            <br />
            I love building value thru the process of art direction, branding,
            visual design and creative development. My approach is adaptive to
            every project, with deep care on vision and identity.
            <br />
            <br />
            I need to work in close partnership with people and teams along the
            process. Always standing for clear communication, trust and
            transparency. I work from my home-studio to manage a
            versatile-focused workflow, in balance with a healthy life close to
            my family.
            <br />
            <br />
          </p>
          <h4 className={s.subtitle}>From a type-graphic point of view.</h4>
          <p>
            I’m a person who breathes arts, culture, music and everything that
            has a visual expression appended to. I’m a visual designer and to be
            honest I’m not comfortable with fancy titles and rigid skillsets. It
            feels better to me when we can honor the generalist nature of the
            design practice, especially as a cultural expression rather than as
            a static job role.
            <br />
            <br />
            In this sense, as a creator, I’m a collage myself. Curiosity makes
            me feel human; the study of different things makes me grow as a
            person the same as an artist. I love collaborating and building real
            value with other people, especially understanding their view and
            inner worlds.
            <br />
            <br />
            As a designer I picture the web as a space for interactive creation.
            There are so many new tools and possibilities on the browser right
            now; and while we are living a kind of a revival of the flash era, I
            think Typography is having a serious role in this scene. I feel that
            golden times are coming in the near future, if we are’t already
            living them!
            <br />
            <br />
            I love websites but I’ve discovered so much inspiration from the
            print and editorial sides of graphic design too. While going through
            this process I’ve fallen in love with the fascinating worlds behind
            typography. Because we can play with letters on the web, just like
            we can put it on the street, or use it for advertisement, for art...
            for many purposes! Typography is solving so many problems on each
            milisecond of human interaction activity. And I wanna know more
            about it!
            <br />
            <br />
            I also like drawing and making illustrations for many purposes—I’m
            in love with your characters!—It’ll be a real pleasure to have space
            and time to play more often on the fun mix of illustration and
            typography.
            <br />
            <br />
            I’ts natural to me being constantly curious about how to make things
            like coding my own projects (like this one) and playing with other
            fields like motion, 3D visuals, photography, music. With my involved
            purpose of building things I also like being involved in the
            marketing side of the projects too. The thing is that I feel that
            every tool is just a medium.
            <br />
            <br />
            The real thing is in the content:
            <br /> The value and the emotional core.
            <br />
            <br />
            And that is why I’m here. I’ve worked in many different projects
            with different purposes and problems to solve. All different by
            nature but with something in common: an identity to care, to enhance
            and to help it breath and grow. Each project was so different that I
            couldn’t have the same model to go with all of them. And here is
            when I feel that typography is something that works similar,
            especially in this sense of having so many different worlds and
            systems based on the same characters!
            <br />
            <br />
            I’ve worked in Music, Gastronomics, Youtube Content, Festivals,
            Artists and Magazines. Now I’m working on the web and I’ve realized
            that every project has been crossed by some typographic
            decision—sometimes worse, sometimes better—but finally ending on the
            present moment where I find myself not being able to desing anything
            without apreciating the voices, the personalities and the structures
            that live inside a typeface. It blows my mind! I’m so grateful about
            how much typography taught me.
          </p>
        </div>
        {/* <div style={{ minHeight: '100vh' }}></div> */}
        <div id="to-share" className={s.content}>
          <h3 className={s.title}>What I wanna share.</h3>
          <br />

          <p>
            With this feeling I think I can share with you so many things.
            Typography taught me to care a lot about identity and lately that
            made me look more closely for type related brands and typography
            projects that fit my vision. Actually, I’m building a portfolio to
            be more engaged in projects I like. And turns out that the projects
            I have first in my mind are type foundries! Not to design typefaces
            but to play and build value with them; something like working on the
            brand side, the community enviroments and other oportunities around
            too...
            <br />
            <br />
            Sooner or later I was going to appear somewhere in your inbox you
            are up on my list! So I can't wait to finish my entire porfolio and
            here I will share some parts that speak about how I can help you and
            why I wanna join you.
            <br />
            <br />
          </p>
          <h4 className={s.subtitle}>
            What I would love to do. Where is value.
          </h4>
          <p>
            I think that Lettermatic has a solid brand and that you are looking
            for someone who can expand and remix the concept. And that starting
            point sounds very nice to me. I feel good at digesting brands,
            thinking how to distribute its voice in different ways and always
            caring about his core authenticity.
            <br />
            <br />
            So, first of all I’m eager to make my research about you—the
            people—and then about the brand. I think I’ll learn so many new
            things with your projects and I’m already feeling sure about it.
            <br />
            <br />
            Then I’ll take an account of the basic needs that you are looking
            for. I’ve closely read the kind of work you described and I wanna
            share with you some things about it as follows:
          </p>
          <ul>
            <li>
              I love case studies. I learned a LOT with yours and I know I will
              learn a lot more if I’m fully involved.
            </li>
            <li>
              I’ve a lot of experience on social media so I can share my vision
              about it and expand our mindset.
            </li>
            <li>
              I love making posters and graphics, especially with type. Kind of
              a dream job for me!
            </li>
            <li>
              I enjoy to visually present and pitch things. My communication
              background loves it!
            </li>
            <li>
              I need to do research and understand history and context to go
              really deep on a given process. My journalistic soul helps a lot.
            </li>
          </ul>
          <p>
            By my side, I can go further, always aligned with objectives and
            scope. I like thinking broadly when we are speaking about a brand,
            especially on how it can be expressed around the spaces and cultures
            we are socially involved.
          </p>
          <ul>
            <li>
              I like to put letters to dance. Motion posters, animation, kinetic
              things, variable possibilities, interpolations, svg, lottie, web
              fonts, distance field fonts and glsl, etc. (If you see this page
              on desktop you have examples on the header and the left gallery).
            </li>
            <li>
              I know the basics of typography and a little bit more. I love
              studying and collecting references. Here on the left gallery you
              can find a glimpse of a personal sans serif typeface that I’ve
              built for fun and practice: Its called AS Noir. And although
              its—yes I know—another all caps geometric sans serif, I’ve
              imprinted some personal details that I was looking for in that
              genre.
            </li>
            <li>
              My little own fonts made me realize that I like making—and working
              with—specimens. And not only on print but also in the web
              (interactive). I’m a big fan of type-related websites, like
              typefoundries, blogs, catalogues, web-specimens, interactive
              experiences and on. I have so much fun there.
            </li>
            <li>
              I love writing things—maybe you already know it?— I’m writing a
              blog to release together with my personal website. Hope it will be
              live soon! Since I am a Spanish native speaker I’m working to get
              better at English.
            </li>
            <li>
              I’ve produced video content and podcasts. I’ve founded a Youtube
              Channel for a flamenco guitarist (from scratch and with such a
              difficult subject) and we grew to +30K in one year. Now keeps
              growing at a good pace.
            </li>
          </ul>
          <p>
            Well, I know that maybe these are already many things and I don’t
            pretend that we are going to make all of it at the same time. I’m
            just looking in to my potential and experiences to share the things
            I think can help the most to distribute some concepts of the brand.
            <br />
            <br />I don’t have a cool rèsumè. I don’t have collabs with fancy
            brands. And with so spreadly knowledge, sometimes I suffer a lot in
            my personal career because there are not many places with room for
            generalist people like me, especially in this world of extreme
            specificity. So, I’m already glad of having the oportunity to think
            broadly here and then going further step by step.
          </p>
        </div>
        <div id="why" className={s.content}>
          <h3 className={s.title}>Why I’m here. </h3>
          <h4 className={s.subtitle}>The threads of Rylei.</h4>
          <p>
            I know you worked with Studio Freight and Basement Studio. Great
            people, excelent profesionals. I would love to work with them one
            day.
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
            Those threads are so cool! I loved the recent one of fenders and
            typefaces, not just because the type subject, but also because I’m a
            guitarist and a big lover of great-weird analogies. The world is so
            much related itself and I love when one realizes that and then just
            wanna speak and share thoughts about it.
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
            I’ve been wondering if there would be a place where I could
            integrate all the things that makes a sense around interdisciplinary
            fields where I live and breathe.
            <br />
            <br />
            I love everything about interpolation, textures, composition,
            systems, orchestation, rhythm... it doesn’t matter in what
            discipline. But I’m thinking that typography is getting around so
            many places I love and where I find so much fun. I can’t stop
            feeling things when some wild letters appear in my field of view.
            And I wanna more of this thing!
            <br />
            <br />
            While I’m falling in love with type related possibilities—both, in
            print and web canvases—I was wondering if there could be an
            oportunity to work with typography without being a formal
            typographer. I love drawing letters, especially geometric styles
            that looks cool with transformations and distortion. I don’t know if
            I can have a foundry some day. Actually, right now I can’t afford a
            Mac (for Glyphs app), so I tried to make something with a mix of
            Illustrator, Figma and Font Forge. Kind of a hell but it was worthy.
            I’m very curious about your custom software by the way.
            <br />
            <br />
            The thing is that going through the rabbit hole of typography
            theory, history, evolution, all the tech behind it—and then also
            building some begginer-friendly typefaces myself— its changing
            completely my view on everything related to design and
            communication. The Lettermatic website and the twitter threads
            helped me a lot on this projects. It’s difficult to find type
            related content that explains so subtle things that we can find in a
            beautifuly complex system like SoDo Sans, to put an example.
            <br />
            <br />
            So I wanna be more involved on this amazing world of characters, and
            I think this is a great oportunity for me. Just having a feedback
            about my work and being in touch with you will be very valuable for
            me. I hope you liked it.
          </p>
          <div id="colophon" className={s.content}></div>
          <h3 className={s.title} id="colophon" style={{ opacity: '0.5' }}>
            Colophon.{' '}
          </h3>{' '}
          <br />
          <br />
          <p className="serif">
            If you have read this far I’m very-very-grateful. Even if there
            isn’t a fit for the job, I’m here to know people and I’ll be amazed
            if all of this just make us to share some thoughts.
            <br />
            <br />
            This microwebsite was especially handcrafted for Lettermatic in
            seven days, weekend included. The text is set in Parclo Sans v1.062
            and Serif 1.077 using the student trial just for this project (as a
            non-commercial work).
            <br />
            <br />
            This site wouldn’t be possible withouth Satus, the code architecture
            that Franco Arza and Studio Freight created as an OSS. The
            development stack compounds Next.js and Vercel; with React Three
            Fiber and Three.js (paper and visual effects).
            <br />
            <span className="serifi">
              (I don’t have time to test it on every device and making it
              accessible as a real project should be. I hope it works as
              intended and I apreciate if you visit it on desktop for the full
              experience).
            </span>
          </p>
        </div>

        <div className={s.outro}></div>
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
