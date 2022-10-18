import { Text, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useFrame, useLayoutEffect } from '@studio-freight/hamo'
import { Demo } from 'components/webgl'
import gsap from 'gsap'
import { useScroll } from 'hooks/use-scroll'
import { mapRange } from 'lib/maths'
import { useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { DoubleSide, Vector2, Vector4 } from 'three'
const url = '/fonts/psr.woff'
const text = 'click to expand'
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



void main() {
    vec2 viewportUv = gl_FragCoord.xy / uResolution.xy;
    vec4 pic = texture(uTexture, vUv);

    gl_FragColor = vec4(pic);
    
  }
`

function Poster({ args, url, ...props }) {
  const { width, height } = useWindowSize()
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
        onPointerMissed={(e) => (e.stopPropagation(), click(null))}
        {...props}
      >
        <planeGeometry args={args} />
        <shaderMaterial
          ref={matRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          side={DoubleSide}
          transparent={true}
        />
      </mesh>
    </>
  )
}

function Board() {
  const refe = useRef()

  useScroll(({ scroll, velocity, limit }) => {
    const progress = mapRange(0, limit, scroll, 0, 25)

    refe.current.parent.position.y = progress
    refe.current.children.map((e) => {
      e.rotation.x = Math.PI * -progress * 0.1 * velocity * 0.002
      e.rotation.y = Math.PI * -progress * 0.1 * -velocity * 0.002
    })
  })
  return (
    <>
      <group ref={refe} position={[0, -1, -1]}>
        <Text
          position={[-1.15, -1.7, 0]}
          fontSize={0.03}
          font={url}
          glyphGeometryDetail={12}
          sdfGlyphSize={32}
          letterSpacing={0}
          characters={text}
        >
          {text}
          <meshBasicMaterial color={'gray'} />
        </Text>

        <Poster
          args={[1, 1.33, 64, 64]}
          url="/kinematics/2.png"
          position={[-1.15, -2.1, -0.3]}
          scale={0.6}
        />
        <Poster
          args={[0.6, 1, 64, 64]}
          url="/kinematics/3.png"
          position={[-1.2, -2.3, -0.05]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/kinematics/4.png"
          position={[-1, -2.8, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/kinematics/5.png"
          position={[-1.5, -3.1, -0.6]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/kinematics/6.png"
          position={[-1, -3.6, -0.1]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/kinematics/7.png"
          position={[-1.3, -3.8, -0.3]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/kinematics/8.png"
          position={[-1.15, -4.4, -0.01]}
          scale={0.6}
        />
        {/* 
        SEPARATOR
         */}
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/noir1.png"
          position={[-1.15, -6, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/noir2.png"
          position={[-1.15, -6.6, -0.2]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/noir3.png"
          position={[-1.33, -7, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/noir4.png"
          position={[-1.05, -7.2, -0.4]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/noir5.png"
          position={[-1.3, -7.5, -0.2]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/noir6.png"
          position={[-1.2, -8, -0.4]}
          scale={0.6}
        />

        <Poster
          args={[1.33, 1, 64, 64]}
          url="/noir/gallery/g7.png"
          position={[-1.5, -8.5, -0.7]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/gallery/g8.png"
          position={[-1.1, -8.8, -0.5]}
          scale={0.6}
        />
        <Poster
          args={[0.8, 0.8, 64, 64]}
          url="/noir/gallery/g2.png"
          position={[-1, -9.3, -0.3]}
          scale={0.4}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/noir/gallery/g6.png"
          position={[-1.15, -9.6, -0.2]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/gallery/g4.png"
          position={[-1.6, -9.2, -0.7]}
          scale={0.6}
        />
        <Poster
          args={[1.33, 1, 64, 64]}
          url="/noir/gallery/g1.png"
          position={[-1.5, -9.9, -0.7]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/noir/gallery/g5.png"
          position={[-1.3, -10.4, -0.4]}
          scale={0.6}
        />

        {/* 
        SEPARATOR
         */}
        <Poster
          args={[1, 1.1, 64, 64]}
          url="/guitar/guitar1.png"
          position={[-1.15, -11.6, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/guitar/guitar2.png"
          position={[-1, -11.9, -0.5]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/guitar/guitar3.png"
          position={[-1.15, -12.6, -0.2]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/guitar/guitar4.png"
          position={[-1.4, -12.2, -0.3]}
          scale={0.6}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/guitar/guitar5.png"
          position={[-1.15, -13.2, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/guitar/guitar6.png"
          position={[-1.15, -13.9, -0.01]}
          scale={0.6}
        />
        {/* 
        SEPARATOR
         */}
        <Poster
          args={[1, 0.56, 64, 64]}
          url="/web/web1.png"
          position={[-1.15, -15.5, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1, 0.56, 64, 64]}
          url="/web/web2.png"
          position={[-1.15, -16, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[0.56, 1.1, 64, 64]}
          url="/web/web3.png"
          position={[-1.3, -16.5, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[0.56, 1.1, 64, 64]}
          url="/web/web4.png"
          position={[-1, -16.7, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 0.56, 64, 64]}
          url="/web/web5.png"
          position={[-1.15, -17.2, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[0.56, 1.1, 64, 64]}
          url="/web/web6.png"
          position={[-1.3, -17.9, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[0.56, 1.1, 64, 64]}
          url="/web/web7.png"
          position={[-1, -17.7, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 0.56, 64, 64]}
          url="/web/web8.png"
          position={[-1.15, -18.4, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1, 0.56, 64, 64]}
          url="/web/web9.png"
          position={[-1.15, -18.9, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1, 0.56, 64, 64]}
          url="/web/web10.png"
          position={[-1.15, -19.4, -0.01]}
          scale={0.6}
        />
        {/* 
        SEPARATOR
         */}
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/bent/bent1.png"
          position={[-1.1, -20, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/bent/bent2.png"
          position={[-1.1, -20.5, -0.5]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/bent/bent3.png"
          position={[-1.3, -20.7, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/bent/bent4.png"
          position={[-1.3, -21.3, -0.3]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/bent/bent5.png"
          position={[-1.2, -21, -0.6]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/bent/bent6.png"
          position={[-1.1, -21.8, -0.01]}
          scale={0.5}
        />
        {/* 
        SEPARATOR
         */}
        {/* <Poster
          args={[1, 1.33, 64, 64]}
          url="/poli/po1.png"
          position={[-1.1, -24, -0.4]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/poli/po2.png"
          position={[-1.3, -24.3, -0.2]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/poli/po3.png"
          position={[-1, -24.2, -0.01]}
          scale={0.3}
        /> */}
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/1.png"
          position={[-1.4, -24, -0.5]}
          scale={0.5}
        />
        <Poster
          args={[1, 1.33, 64, 64]}
          url="/illus/2.png"
          position={[-1, -23.8, -0.3]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/3.png"
          position={[-0.5, -23.3, -0.3]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/4.png"
          position={[-0.5, -23.8, -0.2]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/5.png"
          position={[-0.7, -24.1, -0.1]}
          scale={0.4}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/6.png"
          position={[-0.7, -24.5, -0.4]}
          scale={0.4}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/7.png"
          position={[-0.2, -24.6, -0.3]}
          scale={0.6}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/8.png"
          position={[-0.3, -24.1, -0.1]}
          scale={0.4}
        />
        <Poster
          args={[1, 0.6, 64, 64]}
          url="/illus/9.png"
          position={[-0.1, -23.6, -0.01]}
          scale={0.6}
        />
        <Poster
          args={[1.3, 1, 64, 64]}
          url="/illus/10.png"
          position={[0.1, -23.3, -0.5]}
          scale={0.6}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/11.png"
          position={[0.6, -23.3, -0.4]}
          scale={0.4}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/12.png"
          position={[0.2, -24, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/13.png"
          position={[0.5, -23.6, -0.3]}
          scale={0.4}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/14.png"
          position={[0.7, -24, -0.01]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/15.png"
          position={[0.3, -24.5, -0.4]}
          scale={0.5}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/16.png"
          position={[0.8, -24.5, -0.6]}
          scale={0.4}
        />
        <Poster
          args={[1, 1, 64, 64]}
          url="/illus/17.png"
          position={[1.2, -23.5, -0.7]}
          scale={0.5}
        />
      </group>
    </>
  )
}

export function WebGLBoard() {
  const tl = gsap.timeline()

  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 35 }}>
      <Demo tl={tl} />
      <Board />
    </Canvas>
  )
}
