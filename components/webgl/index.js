import { Text } from '@react-three/drei'
import {
  useFrame,
  useIsTouchDevice,
  useLayoutEffect,
} from '@studio-freight/hamo'
import gsap from 'gsap'
import { useScroll } from 'hooks/use-scroll'
import { mapRange } from 'lib/maths'
import { useMemo, useRef } from 'react'
import { useWindowSize } from 'react-use'
import { Color, DoubleSide, Vector2 } from 'three'
const url = '/fonts/pscu.woff'
const text = 'HI!'

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
 
  vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`
const vertex2 = `
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec3 vNormal;

//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

void main() {
  vUv = uv;
  vNormal = normal;

  vec3 newPos = position;
  // uProgress = 1.;
  newPos.y += uProgress * 0.1;
  float elv = 0.9;
  elv *= uProgress * 0.5;
 float elevation = sin(newPos.y * newPos.x  ) * elv;

 for(float i = 1.; i <= 4.; i++) {
  elevation -= abs(cnoise(vec3(sin(newPos.x * 8. * i), newPos.y * 3. * i, uProgress * 2.)) * 0.04 / i);
}

newPos.y += elevation;
 

              

  vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
uniform float uProg;
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

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 ); // Rotation proportionals ( 6 - 8 right triangle 36ª)

float hash( float n )
{
    return fract(sin(n)*43758.5453);
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0;

    return mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
               mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
}

//fractional brawnian motion
float fbm( vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); // 1 Octave += amplitude * freq
    // Nesxt time I call p i have twice the freq
                            p *= m * 2.02; 
    f += 0.2500 * noise(p); p *= m * 2.03; // 2 Octave
    f += 0.1250 * noise(p); p *= m * 2.01; // 3 Octave
    f += 0.0625 * noise(p); p *= m * 2.04; // 4 Octave
    f /= 0.9375;
    return f;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = -uProg + 2.0 * uv - uMouse.y * 0.5 - uMouse.x * 0.2 + 2. + uProgress; 
    p.x *= uResolution.x/uResolution.y;
    p *= m * -m;

    vec3 col = vec3(0.);
    float ang = atan( p.y, p.x );
    float f = fbm(8. * p + uMouse * 5.);
    float c = length(p);
    

    float form = 0.6 + 0.5 * (sin(p.x * f + uProgress * 1. + uProg) * 0.5);
    col += vec3(1.) * smoothstep(form, form + 0.01, 0.2 - p.x * c * .5);

    form += 0.3 * sin(p.x * f - uProgress * 4.);
    col *= vec3(1.) * smoothstep(form, form + 0.01, 2. + p.x * c * .3);


    gl_FragColor = vec4(col, 1.);
  }
`

const fragment2 = `
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


void main() {
    
    gl_FragColor = vec4(0.,0., 0., 1.);
  }
`

export function Demo({ tl, speed = 1 }) {
  const { width, height } = useWindowSize()
  const isTouchDevice = useIsTouchDevice()

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
      uStartColor: { value: new Color('#CA1AC5') },
      uEndColor: { value: new Color('#D08FD3') },
      uSat: { value: 1.0 },
      uLig: { value: 0.5 },
      uProgress: {
        value: 0,
      },
      uProg: {
        value: 0,
      },
    }),
    []
  )

  useLayoutEffect(() => {
    tl.to(
      matRef.current.uniforms.uProg,
      {
        value: 4,
        duration: 2,
        ease: 'Power3.easeOut',
      },
      1.5
    )
  })

  useLayoutEffect(() => {
    const onMouseMove = (e) => {
      if (isTouchDevice) return

      const x = (e.clientX / width - 0.5) * 2 * speed
      const y = -(e.clientY / height - 0.5) * 2 * speed

      gsap.to(matRef.current.uniforms.uMouse.value, {
        x,
        y,
        duration: 2,
        ease: 'expo.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false)
    }
  }, [speed])
  useScroll(({ scroll, velocity, limit }) => {
    // const progress = clamp(0, mapRange(0, limit, scroll, 0, 100), 2)
    const progress = mapRange(0, limit, scroll, 0, 15)

    matRef.current.uniforms.uProgress.value = progress
  })

  useFrame((time) => {
    matRef.current.uniforms.uTime.value = time / 1000
  })

  return (
    <>
      <mesh
        scale={0.83}
        position={[0.09, 0.2, 0]}
        // onClick={(e) => console.log('click')}
        // onPointerOver={(e) => console.log('hover')}
        // onPointerOut={(e) => console.log('unhover')}
      >
        <Text
          fontSize={1}
          font={url}
          glyphGeometryDetail={64}
          sdfGlyphSize={256}
          letterSpacing={0}
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
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI * 0.02]}>
        <planeGeometry args={[3, 2.2, 256]} />
        <shaderMaterial
          ref={matRef}
          fragmentShader={fragment2}
          vertexShader={vertex2}
          uniforms={uniforms}
          side={DoubleSide}
        />
      </mesh>
    </>
  )
}
