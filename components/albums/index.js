import { useTexture } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useFrame } from '@studio-freight/hamo'
import { Suspense, useMemo, useRef, useState } from 'react'

import { useIsTouchDevice, useLayoutEffect } from '@studio-freight/hamo'
import gsap from 'gsap'
import { useWindowSize } from 'react-use'

// https://docs.pmnd.rs/

const vertexShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`
const fragmentShader = `
uniform float uTime;
uniform float uAlpha;
uniform sampler2D uTexture;
varying vec2 vUv;
vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

float PI = 3.141592653589793238;

void main() {
    vec3 color = texture2D(uTexture,vUv).rgb;

    gl_FragColor = vec4(color, uAlpha);
    }
`

function Demo({ id, textures, alpha, speed = 10 }) {
  const ref = useRef()
  const state = useThree()
  const { width, height } = useWindowSize()
  const isTouchDevice = useIsTouchDevice()
  // const [texture] = useTexture([album])
  const [alphax, setAlpha] = useState(alpha)
  const [...images] = useTexture([...textures])

  useLayoutEffect(() => {
    images.map((art, i) => {
      if (i === id) {
        console.log('match')
        ref.current.material.uniforms.uTexture.value = art
      }
    })
  })

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uTexture: {
        value: null,
      },
      uAlpha: {
        value: alphax,
      },
    }),
    []
  )

  useLayoutEffect(() => {
    const onMouseMove = (e) => {
      if (isTouchDevice) return
      const x = (e.clientX / width - 0.5) * speed
      const y = -(e.clientY / height - 0.5) * speed

      gsap.to(ref.current.position, {
        x,
        y,
        duration: 1,
        ease: 'expo.out',
      })
    }
    window.addEventListener('mousemove', onMouseMove, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false)
    }
  }, [speed])

  useFrame(() => {
    // texture.needsUpdate = true
    // ref.current.material.uniforms.uAlpha.value = alpha
    // ref.current.position.x = ref.current.position.x += 0.04
  })

  return (
    <>
      <mesh ref={ref}>
        <planeBufferGeometry attach="geometry" args={[2, 2, 2]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  )
}

function Raf() {
  const { advance } = useThree()

  useFrame((time) => {
    advance(time / 1000)
  })
}

export function WebGLDemo({ id, textures, alpha }) {
  // console.log('here', id)
  // const { progress } = useProgress()

  // useEffect(() => {
  //   console.log(progress)
  //   if (progress === 100) {
  //     onLoad()
  //   }
  // }, [progress])

  return (
    <Canvas>
      <Raf />
      <Suspense fallback={null}>
        <Demo textures={textures} alpha={alpha} id={id} />
        {/* <Preload all /> */}
      </Suspense>
    </Canvas>
  )
}
