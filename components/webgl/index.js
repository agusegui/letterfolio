import { Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  useFrame,
  useIsTouchDevice,
  useLayoutEffect,
} from '@studio-freight/hamo'
import clsx from 'clsx'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { Color, DoubleSide, Vector2 } from 'three'
import s from './webgl.module.scss'

const url = '/fonts/asblack57.woff2'
const text = 'HIS FIRST FOLIO'
const DISPLAY = 'AGU·PRESENTS'

const vertexShader = `
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;

  vec3 newPos = position;
  // newPos.x -= uTime;
  newPos.y += -3. + uProgress;
  // newPos.z += 3. - uProgress;
  newPos.x += sin(uTime + newPos.y + uProgress) * 0.2;
  // newPos.z += sin(-uProgress * newPos.y + uProgress) * 0.2;
  // newPos.x += sin((uMouse.x - 0.5) * newPos.y ) * 0.2 ;

  vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);

  // modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
uniform float uSpeed;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;

uniform vec3 uEndColor;
uniform vec3 uStartColor;

uniform float uSat;
uniform float uLig;

varying vec3 vNormal;

vec3 hsvToRgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float random(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float normSpeed = clamp(uSpeed * 10., 0., 1.) * 0.3;
    vec2 viewportUv = gl_FragCoord.xy / uResolution.xy;
    
    // Normalizing and multimpliing by resolution, and then back to the center
    // vec2 newUV = (vUv - vec2(0.5)) * uResolution.xy + vec2(0.5);
    // vec2 newUV = (vUv - vec2(uMouse)) * .5 ;
    vec2 newUV = vUv - vec2(-0.5) * 0.3;



    vec3 startColor = hsvToRgb(vec3(sin(uMouse.x / 2.) * 0.2, uSat, uLig)); // updating time
    // vec3 startColor = hsvToRgb(vec3(0.9, uSat, uLig)); // not time
    vec3 endColor = uEndColor;

    float form = sin(atan((newUV.y - 0.3) * (newUV.y - 0.7 )) * 50. + uTime); // 01
    form -= cos(-atan((newUV.x - 0.3) * (newUV.x - 0.7 )) * 50. + uTime); // 01.1
    // form -= cos(-atan((newUV.x - 0.5) * (newUV.x - 0.5 )) * 50. + uTime); // 01.1
    form += sin(-atan((newUV.x - 0.3) * (newUV.y - 0.7 )) * 50. + uTime); // 01.2
    form += sin(-atan((newUV.x - 0.5) * (newUV.y - 0.5 )) * 50. + uTime); // 01.2
    form += cos(atan((newUV.y - 0.3) * (newUV.x - 0.7 )) * 50. + uTime); // 01.3

    form += cos(atan(newUV.y, newUV.x) * 20. + uTime); // SIGNAL

    // vec2 mousePoint = vec2(uMouse.x + 0.5, uMouse.y + 1.5);

    vec2 mousePoint = vec2(uMouse.x + 1., uMouse.y + 0.5);
    // vec2 mousePoint = vec2(uMouse.x, uMouse.y);
    

    // float dist = distance(viewportUv / vec2(1., 2.), mousePoint / vec2(1., 2.) );
    
    // float dist = distance(viewportUv / vec2(1., 2.), mousePoint / vec2(1., 2.) );
    float dist = distance(viewportUv, mousePoint );

    // dist *= cos(sin(atan(viewportUv.y, viewportUv.x) * 4. + uTime));
    dist += cos(sin(atan(viewportUv.x , viewportUv.y) * 6. + uTime)) * 0.1;
    dist += smoothstep(0.2 , .8, dist - 0.5 - uMouse.x);

    float centerDist = smoothstep(-0.3,0.38, length((0.5 - uMouse.x * 0.5 - dist)));

    // CENTER
    form += sin(pow(centerDist, 2.) * 5. + uTime);
    form += cos(centerDist * 20. + uTime);
    form -= sin(centerDist * -10. + uTime);
    form -= cos(pow(-centerDist * 5.,10.) + uTime);

    form += exp(-smoothstep(0.1,0.6,form) * 4.);

    vec3 finalColor = mix(startColor, endColor, form); // MIX
    finalColor += random(newUV + uTime * 0.03 ) * 0.5; // NOISE
    gl_FragColor = vec4(finalColor, 1.);
  }
`

function Demo({ tl, speed = 1 }) {
  // const state = useThree()
  // const cursor = useRef()
  const { width, height } = useWindowSize()
  // const { advance, viewport } = useThree()
  const isTouchDevice = useIsTouchDevice()
  const [hasMoved, setHasMoved] = useState(false)

  // const childRef = useRef()

  const ref = useRef()
  const matRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uMouse: {
        value: new Vector2(0, 0),
      },
      uSpeed: {
        value: new Vector2(0, 0),
      },
      uResolution: {
        value: new Vector2(width, height),
      },
      uStartColor: { value: new Color('#9FBAF9') },
      uEndColor: { value: new Color('#FEB3D9') },
      uSat: { value: 1.0 },
      uLig: { value: 0.5 },
      uProgress: {
        value: 0,
      },
    }),
    []
  )

  useLayoutEffect(() => {
    tl.to(
      matRef.current.uniforms.uProgress,
      {
        value: 3,
        duration: 2,
        ease: 'expo.out',
      },
      4
    )

    // console.log(matRef.current.uniforms.uProgress.value)
  })

  useLayoutEffect(() => {
    const onMouseMove = (e) => {
      if (isTouchDevice) return
      // const x = (e.clientX / width - 0.5) * 2 * speed
      // const y = (e.clientY / height - 0.5) * 2 * speed

      const x = (e.clientX / width - 0.5) * 2 * speed
      const y = -(e.clientY / height - 0.5) * 2 * speed

      gsap.to(matRef.current.uniforms.uMouse.value, {
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

  useFrame((time) => {
    // inertia: the target speed is following the value but a little bit behind

    matRef.current.uniforms.uTime.value = time / 1000
    // matRef.current.uniforms.uSpeed.value = targetSpeed
    // console.log(targetSpeed)
    // matRef.current.uniforms.uMouse.value = prevMouse
  })

  return (
    <mesh
      ref={ref}
      scale={2.5}
      // onClick={(e) => console.log('click')}
      // onPointerOver={(e) => console.log('hover')}
      // onPointerOut={(e) => console.log('unhover')}
    >
      <Text
        fontSize={3.8}
        font={url}
        glyphGeometryDetail={16}
        sdfGlyphSize={128}
        letterSpacing={-0.03}
        characters={text}
      >
        {text}
        <shaderMaterial
          ref={matRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          side={DoubleSide}
        />
      </Text>
    </mesh>
  )
}

// function Raf() {
//   const { advance } = useThree()
//   useFrame((time) => {
//     advance(time / 1000)
//   })
// }

export function WebGLDemo() {
  // const { progress } = useProgress()

  // useEffect(() => {
  //   console.log(progress)
  //   if (progress === 100) {
  //     onLoad()
  //   }
  // }, [progress])
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
    <div className={s.hero}>
      <div
        role="heading"
        aria-level={1}
        aria-label={DISPLAY}
        // ref={title}
        className={clsx('title', s.title)}
      >
        {DISPLAY.split('').map((ch, i) => {
          return (
            <span
              // ref={cha}
              className={clsx('cha', s.cha)}
              aria-hidden="true"
              key={i}
            >
              {ch}
            </span>
          )
        })}
      </div>
      <Canvas>
        {/* <Raf /> */}
        <Demo tl={tl} />
      </Canvas>
    </div>
  )
}
