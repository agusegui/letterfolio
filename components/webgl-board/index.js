import { useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useFrame, useLayoutEffect } from '@studio-freight/hamo'
import gsap from 'gsap'
import { useScroll } from 'hooks/use-scroll'
import { clamp, mapRange } from 'lib/maths'
import { useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { DoubleSide, Vector2, Vector4 } from 'three'

const vertexShader = `
uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uPlane;
uniform vec4 uCorner;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  float PI = 3.1415926;
  float sine = sin(PI * uProgress);
  float waves = sine * 0.1 * sin(5.* length(uv) + 3. * uProgress);

  vec3 newPos = position;
  // newPos.x = -uProgress;

  vec4 defaultState = modelMatrix * vec4(newPos, 1.0);
  vec4 fullScreenState = vec4(newPos, 1.0);
  // fullScreenState.x *= uResolution.x / uPlane.x; 
  fullScreenState.y *= uResolution.y / uPlane.y; 

  float cornerProgress = mix(uCorner.x, uCorner.y, uv.x);
  
  float fourCornerProgress = mix(
    mix(uCorner.x, uCorner.y, uv.x),
    mix(uCorner.z, uCorner.w, uv.x),
    uv.y
  );

  vec4 finalState = mix(defaultState, fullScreenState, fourCornerProgress + waves);

  gl_Position = projectionMatrix * viewMatrix * finalState;
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
uniform float uSpeed;
uniform vec2 uResolution;
varying vec2 vUv;
varying vec3 vNormal;

float random(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 viewportUv = gl_FragCoord.xy / uResolution.xy;
    vec2 newUV = (vUv - vec2(0.5)) * uResolution.xy + vec2(0.5);
    vec4 pic = texture(uTexture, vUv);
    pic += random(vUv + uTime * 0.03 ) * 0.2; // NOISE

    gl_FragColor = vec4(pic);
  }
`

function Poster({ url, ...props }) {
  // const state = useThree()
  const { width, height } = useWindowSize()
  // const { advance, viewport } = useThree()
  // const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const texture = useTexture(url)

  const ref = useRef()
  const matRef = useRef()

  useLayoutEffect(() => {
    if (!clicked) {
      click(null)
    }

    gsap.to(matRef.current.uniforms.uProgress, {
      value: clicked ? 1 : 0,
      duration: 0.8,
      ease: 'Expo.easeInOut',
    })

    const tl = gsap
      .timeline()
      .to(matRef.current.uniforms.uCorner.value, {
        x: clicked ? 1 : -0.1,
        duration: 0.4,
        ease: 'Expo.easeInOut',
      })
      .to(
        matRef.current.uniforms.uCorner.value,
        {
          y: clicked ? 1 : -0.1,
          duration: 0.4,
          ease: 'Expo.easeInOut',
        },
        0.1
      )
      .to(
        matRef.current.uniforms.uCorner.value,
        {
          z: clicked ? 1 : -0.1,
          duration: 0.4,
          ease: 'Expo.easeInOut',
        },
        0.2
      )
      .to(
        matRef.current.uniforms.uCorner.value,
        {
          w: clicked ? 1 : -0.1,
          duration: 0.4,
          ease: 'Expo.easeInOut',
        },
        0.3
      )
    return () => {
      tl.kill()
    }
  }, [clicked])

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uTexture: {
        value: texture,
      },
      uResolution: {
        value: new Vector2(width, height),
      },
      uPlane: {
        value: new Vector2(1000, 1000),
      },
      uProgress: {
        value: 0,
      },
      uCorner: {
        value: new Vector4(0, 0),
      },
    }),
    []
  )

  useScroll(({}) => {
    // const progress = clamp(0, mapRange(480, 960, scroll, 0, 1), 1)
    // const center = 0.6
    // const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    // const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    // ref.current.position.x += progress
  })

  useFrame((time) => {
    matRef.current.uniforms.uTime.value = time / 1000

    // ref.current.position.y += 0.01
    // if (ref.current.position.y > viewport.height / 1.02) {
    //   ref.current.position.y = -viewport.height / 1.02
    // }
    // ref.current.rotation.z = ref.current.rotation.y += 0.01
  })

  return (
    <>
      <mesh
        ref={ref}
        onClick={(e) => (e.stopPropagation(), click(!clicked))}
        // onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        // onPointerOut={(e) => (e.stopPropagation(), hover(false))}
        onPointerMissed={(e) => (e.stopPropagation(), click(null))}
        {...props}
      >
        <planeGeometry args={[1, 1.33, 64, 64]} />
        <shaderMaterial
          ref={matRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          side={DoubleSide}
        />
      </mesh>
    </>
  )
}

function Board() {
  const refe = useRef()

  useScroll(({ scroll, velocity }) => {
    const progress = clamp(0, mapRange(360, 2920, scroll, 0, 2), 2)
    // const center = 0.6
    // const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    // const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)

    refe.current.parent.position.z = progress
    refe.current.children.map((e) => {
      e.rotation.x = (Math.PI * -progress * 0.01 * velocity) / 2
    })
  })
  return (
    <>
      <group ref={refe} position={[0, 0, -1]}>
        <Poster url="/1.png" position={[-1, -0.4, -0.01]} scale={0.3} />
        <Poster url="/2.png" position={[-0.5, 0, -0.01]} scale={0.4} />
        <Poster url="/3.png" position={[0, 0.1, -0.01]} scale={0.5} />
        <Poster url="/4.png" position={[0.5, 0.5, -0.01]} scale={0.6} />
        <Poster url="/5.png" position={[1, 0.3, -0.01]} scale={0.5} />
        <Poster url="/6.png" position={[1.5, -0.2, -0.01]} scale={0.4} />
      </group>
    </>
  )
}

export function WebGLBoard() {
  // const { progress } = useProgress()

  // useEffect(() => {
  //   console.log(progress)
  //   if (progress === 100) {
  //     onLoad()
  //   }
  // }, [progress])
  // const [ref, compute] = useRect()

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      {/* <Raf /> */}
      <Board />
    </Canvas>
  )
}
