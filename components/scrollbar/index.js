import { useScroll } from 'hooks/use-scroll'
import { clamp, mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import useMeasure from 'react-use-measure'
import s from './scrollbar.module.scss'

export function Scrollbar({}) {
  const thumb = useRef()
  const rectRef = useRef()
  // const [setRef, rect] = useRect()
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const lenis = useStore(({ lenis }) => lenis)
  const [innerMeasureRef, { height: innerHeight }] = useMeasure()
  const [thumbMeasureRef, { height: thumbHeight }] = useMeasure()

  useScroll(({ scroll, limit }) => {
    const progress = scroll / limit

    thumb.current.style.transform = `translate3d(0,${
      progress * (innerHeight - thumbHeight)
    }px,0)`

    const string = `${Math.round(progress * 100)}%`
    rectRef.current.innerHTML = string
  }, [])

  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (!clicked) return

    function onPointerMove(e) {
      e.preventDefault()

      const offset = (windowHeight - innerHeight) / 2
      const y = mapRange(
        0,
        windowHeight,
        e.clientY,
        -offset,
        innerHeight + offset
      )

      const progress = clamp(0, y / innerHeight, 1)
      const newPos = lenis.limit * progress

      lenis.direction === 'vertical'
        ? window.scrollTo(0, newPos)
        : window.scrollTo(newPos, 0)
    }

    function onPointerUp() {
      setClicked(false)
    }

    window.addEventListener('pointermove', onPointerMove, false)
    window.addEventListener('pointerup', onPointerUp, false)

    return () => {
      window.removeEventListener('pointermove', onPointerMove, false)
      window.removeEventListener('pointerup', onPointerUp, false)
    }
  }, [clicked, windowHeight, windowWidth, lenis])

  return (
    <>
      <div id="rect">
        <div
          ref={rectRef}
          className="hide-on-mobile"
          style={{
            position: 'fixed',
            right: '0',
            padding: '14px',
            bottom: '84px',
            width: '192px',
            height: '48px',
            fontSize: '16px',
            textAlign: 'center',
            backgroundColor: '#fefbf5',
            color: 'black',
            zIndex: 2,
          }}
        ></div>
      </div>
      <div className={s.scrollbar}>
        <div ref={innerMeasureRef} className={s.inner}>
          <div
            className={s.thumb}
            ref={(node) => {
              thumb.current = node
              thumbMeasureRef(node)
            }}
            onPointerDown={() => {
              setClicked(true)
            }}
          >
            I
          </div>
        </div>
      </div>
    </>
  )
}
