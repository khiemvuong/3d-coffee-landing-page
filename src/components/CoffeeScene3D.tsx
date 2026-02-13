import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { useAppStore } from '../store/useAppStore'

// Smooth lerp helper
function damp(current: number, target: number, speed: number, delta: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta))
}

/* ─── GLB Type ─── */
type CoffeeGLTF = GLTF & {
  nodes: { node_0: THREE.Mesh }
  materials: { 'Material.001': THREE.MeshStandardMaterial }
}

/* ─── Chapter layout configs ───
 * Each chapter's content alignment determines where the cup goes.
 *   Hero (0):       content LEFT        → cup RIGHT
 *   Origin (1):     content RIGHT       → cup LEFT
 *   Process (2):    content CENTER      → cup right-offset
 *   Roast (3):      content LEFT        → cup RIGHT
 *   Experience (4): content RIGHT       → cup LEFT
 *   Menu (5):       content CENTER-GRID → cup top-center, smaller
 */
const CHAPTER_COUNT = 6
interface ChapterPose {
  x: number; y: number; z: number
  scale: number
  rotSpeed: number
  tiltX: number; tiltZ: number
}

const CHAPTER_POSES: ChapterPose[] = [
  // Ch0 Hero — right of centre, large, slow majestic spin
  { x: 1.8, y: -0.1, z: 0.5, scale: 3.5, rotSpeed: 0.15, tiltX: 0, tiltZ: 0 },
  // Ch1 Origin — left side, gentle tilt
  { x: -2.0, y: 0.1, z: 0, scale: 3.2, rotSpeed: 0.10, tiltX: 0.08, tiltZ: -0.12 },
  // Ch2 Process — slight right, elevated, medium spin
  { x: 1.6, y: 0.8, z: -0.5, scale: 3.4, rotSpeed: 0.20, tiltX: -0.1, tiltZ: 0 },
  // Ch3 Roast — right side, big & dramatic close-up
  { x: 2.0, y: -0.2, z: 1.5, scale: 4.2, rotSpeed: 0.15, tiltX: 0, tiltZ: 0.08 },
  // Ch4 Experience — left side, floating feel
  { x: -1.8, y: 0.5, z: 0, scale: 3.6, rotSpeed: 0.18, tiltX: 0.05, tiltZ: -0.05 },
  // Ch5 Menu — top-center, pulled back, small
  { x: 0, y: 1.5, z: -1, scale: 2.8, rotSpeed: 0.12, tiltX: -0.15, tiltZ: 0 },
]

/* ─── Coffee Cup — GLB Model with DOM-based chapter detection ─── */
function CoffeeCup({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const rotGroupRef = useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF('/coffee-transformed.glb') as CoffeeGLTF

  // Store measured chapter DOM bounds { top, height } for each #chapter-N
  const chapterBounds = useRef<{ top: number; height: number }[]>([])
  const scrollRef = useRef(0)

  // Enhance material once
  useMemo(() => {
    const mat = materials['Material.001']
    if (mat) {
      mat.envMapIntensity = 1.2
      mat.needsUpdate = true
    }
  }, [materials])

  // ── Measure chapter section positions from the DOM ──
  useEffect(() => {
    const measure = () => {
      const bounds: { top: number; height: number }[] = []
      for (let i = 0; i < CHAPTER_COUNT; i++) {
        const el = document.getElementById(`chapter-${i}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          bounds.push({
            top: rect.top + window.scrollY,
            height: rect.height || window.innerHeight,
          })
        } else {
          bounds.push({ top: i * window.innerHeight, height: window.innerHeight })
        }
      }
      chapterBounds.current = bounds
    }

    const trackScroll = () => { scrollRef.current = window.scrollY }

    measure()
    trackScroll()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', trackScroll, { passive: true })
    window.addEventListener('scroll', measure, { passive: true })
    // Re-measure after fonts / images settle
    const t1 = setTimeout(measure, 300)
    const t2 = setTimeout(measure, 1000)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', trackScroll)
      window.removeEventListener('scroll', measure)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const g = groupRef.current
    const rg = rotGroupRef.current
    if (!g || !rg) return

    const sy = scrollRef.current
    const bounds = chapterBounds.current
    const vh = window.innerHeight

    // ── Determine active chapter & local progress (0-1 within chapter) ──
    let activeChapter = 0
    let localT = 0

    if (bounds.length === CHAPTER_COUNT) {
      for (let i = CHAPTER_COUNT - 1; i >= 0; i--) {
        const b = bounds[i]
        if (sy >= b.top - vh * 0.3) {
          activeChapter = i
          const range = Math.max(b.height, 1)
          localT = Math.min(Math.max((sy - (b.top - vh * 0.3)) / range, 0), 1)
          break
        }
      }
    } else {
      // Fallback to scrollProgress
      activeChapter = Math.min(Math.floor(scrollProgress * CHAPTER_COUNT), CHAPTER_COUNT - 1)
      localT = (scrollProgress * CHAPTER_COUNT) - activeChapter
    }

    // ── Interpolate between current and next chapter pose ──
    const curr = CHAPTER_POSES[activeChapter]
    const next = CHAPTER_POSES[Math.min(activeChapter + 1, CHAPTER_COUNT - 1)]
    // Use smoothstep for transitions
    const blend = localT * localT * (3 - 2 * localT)

    const targetX = curr.x + (next.x - curr.x) * blend
    const targetY = curr.y + (next.y - curr.y) * blend
    const targetZ = curr.z + (next.z - curr.z) * blend
    const targetScale = curr.scale + (next.scale - curr.scale) * blend
    const rotSpeed = curr.rotSpeed + (next.rotSpeed - curr.rotSpeed) * blend
    const tiltX = curr.tiltX + (next.tiltX - curr.tiltX) * blend
    const tiltZ = curr.tiltZ + (next.tiltZ - curr.tiltZ) * blend

    // Gentle floating bob
    const bob = Math.sin(t * 0.6) * 0.08

    // ── Damp position ──
    const spd = 4
    g.position.x = damp(g.position.x, targetX, spd, delta)
    g.position.y = damp(g.position.y, targetY + bob, spd, delta)
    g.position.z = damp(g.position.z, targetZ, spd, delta)
    const s = damp(g.scale.x, targetScale, spd, delta)
    g.scale.set(s, s, s)

    // ── Rotation on inner group (spins around own axis) ──
    rg.rotation.y = damp(rg.rotation.y, t * rotSpeed, 2, delta)
    rg.rotation.x = damp(rg.rotation.x, tiltX, 3, delta)
    rg.rotation.z = damp(rg.rotation.z, tiltZ, 3, delta)
  })

  return (
    <group ref={groupRef} dispose={null}>
      <group ref={rotGroupRef}>
        <mesh
          geometry={nodes.node_0.geometry}
          material={materials['Material.001']}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

// Preload model at module level for instant readiness
useGLTF.preload('/coffee-transformed.glb')

/* ─── Coffee Bean — Orbiting Planets ─── */
function CoffeeBean({ position, scrollProgress, index }: {
  position: THREE.Vector3
  scrollProgress: number
  index: number
}) {
  const ref = useRef<THREE.Group>(null!)
  const basePos = useMemo(() => position.clone(), [position])
  const orbitRadius = useMemo(() => 2.5 + index * 0.35, [index])
  const orbitAngle = useMemo(() => (index / 18) * Math.PI * 2, [index])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const offset = index * 1.7

    let spread = 1
    let orbitSpeed = 0.3
    let yFloat = 0.3

    if (scrollProgress < 0.17) {
      spread = 1
      orbitSpeed = 0.2 + index * 0.02
    } else if (scrollProgress < 0.33) {
      spread = 0.6
      orbitSpeed = 0.12
      yFloat = 0.5
    } else if (scrollProgress < 0.50) {
      spread = 1.3
      orbitSpeed = 0.5
      yFloat = 0.8
    } else if (scrollProgress < 0.67) {
      spread = 0.8 + Math.sin(t * 2) * 0.3
      orbitSpeed = 0.35
    } else if (scrollProgress < 0.83) {
      spread = 1.2
      orbitSpeed = 0.18
      yFloat = 0.6
    } else {
      spread = 1.6
      orbitSpeed = 0.08
    }

    // Elliptical orbit like a planet
    const angle = t * orbitSpeed + orbitAngle
    const targetX = Math.cos(angle) * orbitRadius * spread * 0.5
    const targetY = basePos.y * 0.3 + Math.sin(t * 0.5 + offset) * yFloat
    const targetZ = Math.sin(angle) * orbitRadius * spread * 0.4 - 2

    ref.current.position.x = damp(ref.current.position.x, targetX, 2, delta)
    ref.current.position.y = damp(ref.current.position.y, targetY, 2, delta)
    ref.current.position.z = damp(ref.current.position.z, targetZ, 2, delta)
    ref.current.rotation.x += delta * (0.4 + index * 0.12)
    ref.current.rotation.z += delta * (0.25 + index * 0.06)
  })

  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <capsuleGeometry args={[0.12, 0.08, 8, 16]} />
        <meshPhysicalMaterial
          color="#3a1808"
          roughness={0.4}
          metalness={0.15}
          clearcoat={0.6}
          emissive="#2a1005"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Bean crease */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.015, 0.06, 0.2]} />
        <meshStandardMaterial color="#0a0200" roughness={0.9} />
      </mesh>
    </group>
  )
}

/* ─── Floating Beans ─── */
function FloatingBeans({ scrollProgress }: { scrollProgress: number }) {
  const beans = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < 18; i++) {
      arr.push(new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 6 - 2
      ))
    }
    return arr
  }, [])

  return (
    <>
      {beans.map((pos, i) => (
        <CoffeeBean key={i} position={pos} scrollProgress={scrollProgress} index={i} />
      ))}
    </>
  )
}

/* ─── Steam Particles ─── */
/* ─── Solar Flare Steam ─── */
function SteamParticles({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null!)
  const count = 120

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.4
      pos[i * 3 + 1] = Math.random() * 3.5 + 0.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.4
    }
    return [pos]
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    const intensity = scrollProgress < 0.67 ? 1 : 0.4

    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.015 * intensity
      if (posArr[i * 3 + 1] > 5.5) {
        posArr[i * 3 + 1] = 0.8
        posArr[i * 3] = (Math.random() - 0.5) * 1.4
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 1.4
      }
      posArr[i * 3] += Math.sin(t * 2.0 + i * 0.5) * 0.003
      posArr[i * 3 + 2] += Math.cos(t * 1.5 + i * 0.3) * 0.003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c88040"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

/* ─── Cosmic Dust / Nebula Particles ─── */
function CoffeeDust({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null!)
  const count = 350

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 25
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.004
      posArr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = t * 0.015 + scrollProgress * Math.PI
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#b08050"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

/* ─── Ground Plane — Warm Surface ─── */
function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <circleGeometry args={[15, 64]} />
      <MeshDistortMaterial
        color="#e8dcd0"
        roughness={0.9}
        metalness={0.02}
        distort={0.05}
        speed={0.3}
      />
    </mesh>
  )
}

/* ─── Solar Orbital Rings ─── */
function OrbitalRings({ scrollProgress }: { scrollProgress: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)
  const ring3Ref = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.08 + scrollProgress * Math.PI * 2
      ring1Ref.current.rotation.z = t * 0.04
      const s1 = damp(ring1Ref.current.scale.x, scrollProgress < 0.5 ? 1 : 0.7, 2, delta)
      ring1Ref.current.scale.set(s1, s1, s1)
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI * 0.3 + t * 0.06
      ring2Ref.current.rotation.y = t * 0.05 + scrollProgress * Math.PI
      const s2 = damp(ring2Ref.current.scale.x, scrollProgress < 0.5 ? 1 : 0.8, 2, delta)
      ring2Ref.current.scale.set(s2, s2, s2)
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -Math.PI * 0.15 + t * 0.03
      ring3Ref.current.rotation.z = t * 0.07 + scrollProgress * Math.PI * 1.5
      const s3 = damp(ring3Ref.current.scale.x, scrollProgress < 0.5 ? 1 : 0.65, 2, delta)
      ring3Ref.current.scale.set(s3, s3, s3)
    }
  })

  return (
    <>
      {/* Inner ring */}
      <mesh ref={ring1Ref} position={[0, 0, -3]}>
        <torusGeometry args={[3.0, 0.012, 16, 120]} />
        <meshStandardMaterial
          color="#b07840"
          emissive="#b07840"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Middle ring */}
      <mesh ref={ring2Ref} position={[0, 0, -3]}>
        <torusGeometry args={[4.5, 0.008, 16, 150]} />
        <meshStandardMaterial
          color="#a06830"
          emissive="#a06830"
          emissiveIntensity={0.2}
          transparent
          opacity={0.18}
        />
      </mesh>
      {/* Outer ring */}
      <mesh ref={ring3Ref} position={[0, 0, -3]}>
        <torusGeometry args={[6.0, 0.006, 16, 180]} />
        <meshStandardMaterial
          color="#8a5820"
          emissive="#8a5820"
          emissiveIntensity={0.15}
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  )
}

/* ─── Starfield — Deep Space Background ─── */
function Starfield() {
  const ref = useRef<THREE.Points>(null!)
  const count = 500

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 15 + Math.random() * 25
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c8a070"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Realistic Lighting with Environment ─── */
function DynamicLights({ scrollProgress }: { scrollProgress: number }) {
  const mainRef = useRef<THREE.DirectionalLight>(null!)
  const accentRef = useRef<THREE.PointLight>(null!)

  useFrame((_, delta) => {
    let mainTarget = { x: 5, y: 10, z: 5 }
    let accentColor = new THREE.Color('#f0b860')
    let accentIntensity = 1.0

    if (scrollProgress < 0.17) {
      mainTarget = { x: 5, y: 10, z: 5 }
      accentColor = new THREE.Color('#f0b860')
      accentIntensity = 1.0
    } else if (scrollProgress < 0.33) {
      mainTarget = { x: -5, y: 8, z: 3 }
      accentColor = new THREE.Color('#3aad5e')
      accentIntensity = 1.2
    } else if (scrollProgress < 0.50) {
      mainTarget = { x: 0, y: 12, z: 0 }
      accentColor = new THREE.Color('#5aade8')
      accentIntensity = 1.1
    } else if (scrollProgress < 0.67) {
      mainTarget = { x: 3, y: 6, z: -3 }
      accentColor = new THREE.Color('#f05828')
      accentIntensity = 1.5
    } else if (scrollProgress < 0.83) {
      mainTarget = { x: -3, y: 9, z: 5 }
      accentColor = new THREE.Color('#e8a040')
      accentIntensity = 1.2
    } else {
      mainTarget = { x: 5, y: 8, z: 5 }
      accentColor = new THREE.Color('#f4deb3')
      accentIntensity = 0.9
    }

    if (mainRef.current) {
      mainRef.current.position.x = damp(mainRef.current.position.x, mainTarget.x, 2, delta)
      mainRef.current.position.y = damp(mainRef.current.position.y, mainTarget.y, 2, delta)
      mainRef.current.position.z = damp(mainRef.current.position.z, mainTarget.z, 2, delta)
    }

    if (accentRef.current) {
      accentRef.current.color.lerp(accentColor, delta * 2)
      accentRef.current.intensity = damp(accentRef.current.intensity, accentIntensity, 2, delta)
    }
  })

  return (
    <>
      {/* Environment map for realistic reflections — "lobby" preset gives warm indoor light */}
      <Environment preset="lobby" />
      <ambientLight intensity={0.35} color="#fdf6ed" />
      <directionalLight
        ref={mainRef}
        position={[5, 10, 5]}
        intensity={1.2}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <pointLight
        ref={accentRef}
        position={[0, 2, 3]}
        intensity={1.0}
        color="#f0b860"
        distance={15}
      />
      <pointLight position={[0, -2, 0]} intensity={0.3} color="#d4a060" distance={8} />
    </>
  )
}

/* ─── Camera Controller ─── */
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 1, 7))

  useFrame((_, delta) => {
    let camTarget = { x: 0, y: 1, z: 7 }
    let lookTarget = { x: 0, y: 0, z: 0 }

    if (scrollProgress < 0.17) {
      camTarget = { x: 0, y: 1, z: 7 }
      lookTarget = { x: 0, y: 0, z: 0 }
    } else if (scrollProgress < 0.33) {
      camTarget = { x: 2, y: 1.5, z: 6 }
      lookTarget = { x: -1, y: 0, z: 0 }
    } else if (scrollProgress < 0.50) {
      camTarget = { x: -1, y: 2.5, z: 5 }
      lookTarget = { x: 0, y: 1, z: 0 }
    } else if (scrollProgress < 0.67) {
      camTarget = { x: 0, y: 0.5, z: 4.5 }
      lookTarget = { x: 1, y: 0, z: 0 }
    } else if (scrollProgress < 0.83) {
      camTarget = { x: 1, y: 1.5, z: 6.5 }
      lookTarget = { x: -0.5, y: 0.5, z: 0 }
    } else {
      camTarget = { x: -0.5, y: 0.8, z: 7 }
      lookTarget = { x: 0.5, y: -0.3, z: 0 }
    }

    camera.position.x = damp(camera.position.x, camTarget.x, 1.5, delta)
    camera.position.y = damp(camera.position.y, camTarget.y, 1.5, delta)
    camera.position.z = damp(camera.position.z, camTarget.z, 1.5, delta)

    targetPos.current.x = damp(targetPos.current.x, lookTarget.x, 1.5, delta)
    targetPos.current.y = damp(targetPos.current.y, lookTarget.y, 1.5, delta)
    targetPos.current.z = damp(targetPos.current.z, lookTarget.z, 1.5, delta)
    camera.lookAt(targetPos.current)
  })

  return null
}

/* ─── Main Scene — The Coffee Cosmos ─── */
export default function CoffeeScene3D() {
  const scrollProgress = useAppStore((s) => s.scrollProgress)

  return (
    <>
      <fog attach="fog" args={['#f0e6d8', 10, 35]} />
      <color attach="background" args={['#f5ebe0']} />
      <CameraController scrollProgress={scrollProgress} />
      <DynamicLights scrollProgress={scrollProgress} />
      <CoffeeCup scrollProgress={scrollProgress} />
      <FloatingBeans scrollProgress={scrollProgress} />
      <SteamParticles scrollProgress={scrollProgress} />
      <CoffeeDust scrollProgress={scrollProgress} />
      <OrbitalRings scrollProgress={scrollProgress} />
      <Starfield />
      <GroundPlane />
    </>
  )
}
