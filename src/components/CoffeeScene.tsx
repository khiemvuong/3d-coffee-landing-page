import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CoffeeCup() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Cup body */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.1, 0.85, 1.6, 32]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Cup inner */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 0.05, 32]} />
        <meshStandardMaterial color="#3a1a0e" roughness={0.8} />
      </mesh>
      {/* Coffee liquid */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.1, 32]} />
        <meshStandardMaterial color="#1a0a05" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Crema layer */}
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.04, 32]} />
        <meshStandardMaterial color="#c06624" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[-1.35, 0.6, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.08, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[1.6, 1.5, 0.12, 32]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  )
}

function CoffeeBean({ position, speed }: { position: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Group>(null!)
  const initialPos = useMemo(() => position, [position])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.position.y = initialPos[1] + Math.sin(t) * 0.5
    ref.current.position.x = initialPos[0] + Math.cos(t * 0.7) * 0.2
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.z = t * 0.3
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#3a1a0e" roughness={0.6} />
      </mesh>
      <mesh scale={[1, 1, 0.6]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#6c351e" roughness={0.7} />
      </mesh>
      {/* Bean crease */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0.12]}>
        <boxGeometry args={[0.02, 0.22, 0.02]} />
        <meshStandardMaterial color="#1a0a05" roughness={0.9} />
      </mesh>
    </group>
  )
}

function FloatingBeans() {
  const beans = useMemo(
    () => [
      { pos: [-2.5, 1.5, -1] as [number, number, number], speed: 0.6 },
      { pos: [2.8, 2, -0.5] as [number, number, number], speed: 0.8 },
      { pos: [-1.8, -0.5, 0.5] as [number, number, number], speed: 0.5 },
      { pos: [1.5, 0.8, 1] as [number, number, number], speed: 0.7 },
      { pos: [-3, 0, 0] as [number, number, number], speed: 0.55 },
      { pos: [3, -0.5, -1.5] as [number, number, number], speed: 0.65 },
      { pos: [0.5, 2.5, -2] as [number, number, number], speed: 0.45 },
      { pos: [-1, 2, 1.5] as [number, number, number], speed: 0.75 },
    ],
    []
  )

  return (
    <>
      {beans.map((bean, i) => (
        <CoffeeBean key={i} position={bean.pos} speed={bean.speed} />
      ))}
    </>
  )
}

function SteamParticles() {
  const ref = useRef<THREE.Points>(null!)
  const count = 40

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.8
      arr[i * 3 + 1] = Math.random() * 2 + 1.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.8
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.008
      if (posArr[i * 3 + 1] > 3.5) {
        posArr[i * 3 + 1] = 1.5
        posArr[i * 3] = (Math.random() - 0.5) * 0.8
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.8
      }
      posArr[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#d4802e"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function CoffeeScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fdf8f0" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#d4802e" />
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#df9a4a" distance={8} />
      <spotLight
        position={[0, 6, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={1}
        color="#f4deb3"
        castShadow
      />
      <CoffeeCup />
      <FloatingBeans />
      <SteamParticles />
    </>
  )
}
