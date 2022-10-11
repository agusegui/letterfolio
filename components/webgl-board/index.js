import { useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useFrame, useLayoutEffect } from '@studio-freight/hamo'
import { Demo } from 'components/webgl'
import gsap from 'gsap'
import { useScroll } from 'hooks/use-scroll'
import { mapRange } from 'lib/maths'
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

  vec4 finalState = mix(defaultState, fullScreenState, fourCornerProgress + waves) * 0.4;

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

  useFrame((time) => {
    matRef.current.uniforms.uTime.value = time / 1000
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

  useScroll(({ scroll, velocity, limit }) => {
    // const progress = clamp(0, mapRange(0, limit, scroll, 0, 100), 2)
    const progress = mapRange(0, limit, scroll, 0, 10)

    refe.current.parent.position.y = progress
    refe.current.children.map((e) => {
      e.rotation.x = (Math.PI * -progress * 0.001 * velocity) / 2
    })
  })
  return (
    <>
      <group ref={refe} position={[0, 0, -1]}>
        <Poster url="/1.png" position={[-1.15, -2, -0.01]} scale={0.6} />
        <Poster url="/2.png" position={[-1.15, -4, -0.01]} scale={0.6} />
        <Poster url="/3.png" position={[-1.15, -6, -0.01]} scale={0.6} />
        <Poster url="/4.png" position={[-1.15, -8, -0.01]} scale={0.6} />
        <Poster url="/5.png" position={[-1.15, -10, -0.01]} scale={0.6} />
        <Poster url="/6.png" position={[-1.15, -14, -0.01]} scale={0.6} />
      </group>
    </>
  )
}

export function WebGLBoard() {
  const tl = gsap.timeline()
  useLayoutEffect(() => {
    tl.to(
      '.cha',
      {
        yPercent: -100,
        duration: 1,
        stagger: 0.03,
        ease: 'Expo.easeOut',
      },
      2
    ).to(
      '.cha',
      {
        yPercent: -200,
        duration: 1,
        stagger: 0.04,
        ease: 'Expo.easeIn',
      },
      3
    )
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 35 }}>
      {/* <Raf /> */}

      <Demo tl={tl} />
      <Board />
    </Canvas>
  )
}
