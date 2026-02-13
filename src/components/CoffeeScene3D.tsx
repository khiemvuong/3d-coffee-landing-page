import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store/useAppStore'

// Smooth lerp helper
function damp(current: number, target: number, speed: number, delta: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta))
}

/* ─── Coffee Cup ─── */
function CoffeeCup({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const cupMatRef = useRef<THREE.MeshStandardMaterial>(null!)
  const liquidRef = useRef<THREE.Mesh>(null!)
  const targetRotation = useRef({ x: 0, y: 0, z: 0 })
  const targetPosition = useRef({ x: 0, y: 0, z: 0 })
  const targetScale = useRef(1)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Chapter-based transforms
    if (scrollProgress < 0.17) {
      // Chapter 0: Hero - cup centered, gentle spin
      targetPosition.current = { x: 0.8, y: -0.3, z: 0 }
      targetRotation.current = { x: 0, y: t * 0.2, z: 0 }
      targetScale.current = 1.0
    } else if (scrollProgress < 0.33) {
      // Chapter 1: Origin - cup moves left, tilts
      targetPosition.current = { x: -2, y: 0, z: 0 }
      targetRotation.current = { x: 0.1, y: t * 0.1, z: -0.15 }
      targetScale.current = 0.85
    } else if (scrollProgress < 0.50) {
      // Chapter 2: Process - cup rises, dramatic angle
      targetPosition.current = { x: 0, y: 1.2, z: -1 }
      targetRotation.current = { x: -0.3, y: t * 0.3, z: 0 }
      targetScale.current = 0.9
    } else if (scrollProgress < 0.67) {
      // Chapter 3: Roast - cup zooms in, warm
      targetPosition.current = { x: 1.5, y: 0, z: 1.5 }
      targetRotation.current = { x: 0, y: t * 0.15 + Math.PI * 0.3, z: 0.1 }
      targetScale.current = 1.3
    } else if (scrollProgress < 0.83) {
      // Chapter 4: Experience - cup floating high
      targetPosition.current = { x: -0.5, y: 0.5, z: 0 }
      targetRotation.current = { x: Math.sin(t * 0.5) * 0.1, y: t * 0.25, z: Math.cos(t * 0.3) * 0.05 }
      targetScale.current = 1.1
    } else {
      // Chapter 5: Menu - cup back to center
      targetPosition.current = { x: 1.2, y: -0.5, z: 0.5 }
      targetRotation.current = { x: 0, y: t * 0.2 + Math.PI, z: 0 }
      targetScale.current = 0.95
    }

    const g = groupRef.current
    const spd = 3
    g.position.x = damp(g.position.x, targetPosition.current.x, spd, delta)
    g.position.y = damp(g.position.y, targetPosition.current.y + Math.sin(t * 0.6) * 0.08, spd, delta)
    g.position.z = damp(g.position.z, targetPosition.current.z, spd, delta)
    g.rotation.x = damp(g.rotation.x, targetRotation.current.x, spd, delta)
    g.rotation.y = damp(g.rotation.y, targetRotation.current.y, 1.5, delta)
    g.rotation.z = damp(g.rotation.z, targetRotation.current.z, spd, delta)
    const s = damp(g.scale.x, targetScale.current, spd, delta)
    g.scale.set(s, s, s)

    // Liquid shimmer
    if (liquidRef.current) {
      (liquidRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.2 + Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Cup body - porcelain */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 0.85, 1.6, 64]} />
        <meshPhysicalMaterial
          ref={cupMatRef}
          color="#f8f3eb"
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Cup rim highlight */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[1.1, 0.025, 16, 64]} />
        <meshStandardMaterial color="#e8ddd0" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Coffee liquid */}
      <mesh ref={liquidRef} position={[0, 0.65, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.12, 64]} />
        <meshPhysicalMaterial
          color="#1a0a03"
          roughness={0.05}
          metalness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive="#3a1500"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Crema - latte art */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.75, 0.85, 0.03, 64]} />
        <meshPhysicalMaterial
          color="#c87830"
          roughness={0.3}
          metalness={0.15}
          clearcoat={0.5}
        />
      </mesh>

      {/* Inner crema heart shape (simplified as small sphere) */}
      <mesh position={[0, 0.74, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#f0d8b0"
          roughness={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.38, 0.07, 16, 32, Math.PI]} />
        <meshPhysicalMaterial
          color="#f8f3eb"
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.8}
        />
      </mesh>

      {/* Saucer */}
      <mesh position={[0, -0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.7, 1.55, 0.1, 64]} />
        <meshPhysicalMaterial
          color="#f8f3eb"
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.8}
        />
      </mesh>

      {/* Saucer inner ring */}
      <mesh position={[0, -0.89, 0]}>
        <torusGeometry args={[0.9, 0.02, 8, 64]} />
        <meshStandardMaterial color="#e8ddd0" metalness={0.2} roughness={0.3} />
      </mesh>
    </group>
  )
}

/* ─── Coffee Bean ─── */
function CoffeeBean({ position, scrollProgress, index }: {
  position: THREE.Vector3
  scrollProgress: number
  index: number
}) {
  const ref = useRef<THREE.Group>(null!)
  const basePos = useMemo(() => position.clone(), [position])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const offset = index * 1.7

    // Beans scatter differently per chapter
    let spread = 1
    let orbitSpeed = 0.3
    let yFloat = 0.3

    if (scrollProgress < 0.17) {
      spread = 1
      orbitSpeed = 0.3
    } else if (scrollProgress < 0.33) {
      // Origin: beans converge center
      spread = 0.5
      orbitSpeed = 0.15
      yFloat = 0.5
    } else if (scrollProgress < 0.50) {
      // Process: beans spiral
      spread = 1.5
      orbitSpeed = 0.6
      yFloat = 0.8
    } else if (scrollProgress < 0.67) {
      // Roast: beans pulse outward
      spread = 0.8 + Math.sin(t * 2) * 0.3
      orbitSpeed = 0.4
    } else if (scrollProgress < 0.83) {
      spread = 1.2
      orbitSpeed = 0.2
      yFloat = 0.6
    } else {
      spread = 1.8
      orbitSpeed = 0.1
    }

    const targetX = basePos.x * spread + Math.cos(t * orbitSpeed + offset) * 0.4
    const targetY = basePos.y + Math.sin(t * 0.5 + offset) * yFloat
    const targetZ = basePos.z * spread + Math.sin(t * orbitSpeed + offset) * 0.4

    ref.current.position.x = damp(ref.current.position.x, targetX, 2, delta)
    ref.current.position.y = damp(ref.current.position.y, targetY, 2, delta)
    ref.current.position.z = damp(ref.current.position.z, targetZ, 2, delta)
    ref.current.rotation.x += delta * (0.3 + index * 0.1)
    ref.current.rotation.z += delta * (0.2 + index * 0.05)
  })

  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <capsuleGeometry args={[0.12, 0.08, 8, 16]} />
        <meshPhysicalMaterial
          color="#4a2010"
          roughness={0.5}
          metalness={0.1}
          clearcoat={0.4}
        />
      </mesh>
      {/* Bean crease */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.015, 0.06, 0.2]} />
        <meshStandardMaterial color="#1a0800" roughness={0.9} />
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
function SteamParticles({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null!)
  const count = 80

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.2
      pos[i * 3 + 1] = Math.random() * 3 + 1
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2
      sz[i] = Math.random() * 0.03 + 0.01
    }
    return [pos, sz]
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime

    // Steam intensity based on chapter
    const intensity = scrollProgress < 0.67 ? 1 : 0.4

    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.012 * intensity
      if (posArr[i * 3 + 1] > 4.5) {
        posArr[i * 3 + 1] = 1
        posArr[i * 3] = (Math.random() - 0.5) * 1.2
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 1.2
      }
      posArr[i * 3] += Math.sin(t * 1.5 + i * 0.5) * 0.002
      posArr[i * 3 + 2] += Math.cos(t * 1.2 + i * 0.3) * 0.002
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#d4802e"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Ambient Coffee Dust / Particles ─── */
function CoffeeDust({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null!)
  const count = 200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.003
      posArr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.002
    }
    ref.current.geometry.attributes.position.needsUpdate = true

    // Rotate entire dust cloud slowly
    ref.current.rotation.y = t * 0.02 + scrollProgress * Math.PI
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c87830"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Ground Plane ─── */
function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
      <circleGeometry args={[12, 64]} />
      <MeshDistortMaterial
        color="#0d0704"
        roughness={0.9}
        metalness={0.1}
        distort={0.1}
        speed={0.5}
      />
    </mesh>
  )
}

/* ─── Animated Torus Ring (decorative) ─── */
function OrbitalRing({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.1 + scrollProgress * Math.PI * 2
    ref.current.rotation.z = t * 0.05

    // Scale based on chapter
    const targetScale = scrollProgress < 0.5 ? 1 : 0.6
    const s = damp(ref.current.scale.x, targetScale, 2, delta)
    ref.current.scale.set(s, s, s)
  })

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[3.5, 0.015, 16, 100]} />
      <meshStandardMaterial
        color="#d4802e"
        emissive="#d4802e"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

/* ─── Dynamic Lighting ─── */
function DynamicLights({ scrollProgress }: { scrollProgress: number }) {
  const mainRef = useRef<THREE.DirectionalLight>(null!)
  const accentRef = useRef<THREE.PointLight>(null!)
  const spotRef = useRef<THREE.SpotLight>(null!)

  useFrame((_, delta) => {
    // Main light moves with chapters
    let mainTarget = { x: 5, y: 8, z: 5 }
    let accentColor = new THREE.Color('#df9a4a')
    let accentIntensity = 1

    if (scrollProgress < 0.17) {
      mainTarget = { x: 5, y: 8, z: 5 }
      accentColor = new THREE.Color('#df9a4a')
    } else if (scrollProgress < 0.33) {
      mainTarget = { x: -5, y: 6, z: 3 }
      accentColor = new THREE.Color('#2d8a4e')
      accentIntensity = 1.5
    } else if (scrollProgress < 0.50) {
      mainTarget = { x: 0, y: 10, z: 0 }
      accentColor = new THREE.Color('#4a90d4')
      accentIntensity = 1.2
    } else if (scrollProgress < 0.67) {
      mainTarget = { x: 3, y: 5, z: -3 }
      accentColor = new THREE.Color('#e84820')
      accentIntensity = 2
    } else if (scrollProgress < 0.83) {
      mainTarget = { x: -3, y: 8, z: 5 }
      accentColor = new THREE.Color('#d4802e')
      accentIntensity = 1.5
    } else {
      mainTarget = { x: 5, y: 6, z: 5 }
      accentColor = new THREE.Color('#f4deb3')
      accentIntensity = 1
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
      <ambientLight intensity={0.15} color="#1a100c" />
      <directionalLight
        ref={mainRef}
        position={[5, 8, 5]}
        intensity={1.5}
        color="#fdf8f0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight
        ref={accentRef}
        position={[0, 2, 3]}
        intensity={1}
        color="#df9a4a"
        distance={12}
      />
      <spotLight
        ref={spotRef}
        position={[0, 8, 2]}
        angle={0.35}
        penumbra={1}
        intensity={0.8}
        color="#f4deb3"
        castShadow
      />
      <pointLight position={[-4, 1, -4]} intensity={0.3} color="#6c351e" distance={10} />
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

/* ─── Main Scene ─── */
export default function CoffeeScene3D() {
  const scrollProgress = useAppStore((s) => s.scrollProgress)

  return (
    <>
      <fog attach="fog" args={['#0a0605', 8, 25]} />
      <CameraController scrollProgress={scrollProgress} />
      <DynamicLights scrollProgress={scrollProgress} />
      <CoffeeCup scrollProgress={scrollProgress} />
      <FloatingBeans scrollProgress={scrollProgress} />
      <SteamParticles scrollProgress={scrollProgress} />
      <CoffeeDust scrollProgress={scrollProgress} />
      <OrbitalRing scrollProgress={scrollProgress} />
      <GroundPlane />
    </>
  )
}
