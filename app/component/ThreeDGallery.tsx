"use client"

import * as THREE from 'three'
import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, extend, ThreeElement } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Float } from '@react-three/drei'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { easing } from 'maath'

// Custom geometry for the bent look
class BentPlaneGeometry extends THREE.PlaneGeometry {
    constructor(radius: number, width: number, height: number, widthSegments: number, heightSegments: number) {
        super(width, height, widthSegments, heightSegments)
        const p = this.parameters
        const hw = p.width / 2
        const a = new THREE.Vector3()
        const pos = this.attributes.position
        for (let i = 0; i < pos.count; i++) {
            a.fromBufferAttribute(pos, i)
            const angle = (a.x / hw) * (hw / radius)
            a.set(Math.sin(angle) * radius, a.y, Math.cos(angle) * radius)
            pos.setXYZ(i, a.x, a.y, a.z)
        }
        this.computeVertexNormals()
    }
}

extend({ BentPlaneGeometry })

// Type definition for the custom element
declare module '@react-three/fiber' {
    interface ThreeElements {
        bentPlaneGeometry: ThreeElement<typeof BentPlaneGeometry>
    }
}

function Card({ url, ...props }: { url: string;[key: string]: any }) {
    const ref = useRef<any>(null)
    const [hovered, hover] = useState(false)
    const pointerOver = (e: any) => (e.stopPropagation(), hover(true))
    const pointerOut = () => hover(false)

    useFrame((state, delta) => {
        if (ref.current) {
            easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
            easing.damp(ref.current.material, 'grayscale', hovered ? 0 : 0.2, 0.15, delta)
            easing.damp(ref.current.material, 'zoom', hovered ? 1.2 : 1, 0.15, delta)
        }
    })

    return (
        <Image
            ref={ref}
            url={url}
            transparent
            side={THREE.DoubleSide}
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            alt=""
            {...props}
        >
            <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
        </Image>
    )
}

function Banner(props: any) {
    const ref = useRef<THREE.Group>(null)
    const data = useScroll()

    useFrame((state, delta) => {
        if (ref.current) {
            // Rotate based on scroll
            const scrollRotation = -data.offset * Math.PI * 2
            ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, scrollRotation, 4, delta)

            // Add mouse parallax
            ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, state.pointer.x * 0.5, 4, delta)
            ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, state.pointer.y * 0.5, 4, delta)
        }
    })

    return (
        <group ref={ref} {...props}>
            <Cards />
        </group>
    )
}

function Cards(props: any) {
    const urls = useMemo(() => [
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    ], [])

    const radius = 4.5
    const count = urls.length

    return (
        <group {...props}>
            {urls.map((url, i) => {
                const angle = (i / count) * Math.PI * 2
                return (
                    <Card
                        key={url}
                        url={url}
                        position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
                        rotation={[0, angle, 0]}
                    />
                )
            })}
        </group>
    )
}

export default function ThreeDGallery() {
    return (
        <section className="w-full h-screen bg-[#050505] relative cursor-grab active:cursor-grabbing">
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between py-20">
                <div className="text-center">
                    <h2 className="text-white text-5xl font-bold tracking-tighter mb-4 opacity-50">CURATED SHOWCASE</h2>
                    <p className="text-neutral-500 text-lg uppercase tracking-widest">Scroll to rotate • Hover to focus</p>
                </div>
                <div className="text-neutral-600 text-sm">DESIGNED BY ANTIGRAVITY</div>
            </div>

            <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
                <fog attach="fog" args={['#050505', 8, 15]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <ScrollControls pages={4} damping={0.2} infinite>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Banner position={[0, 0, 0]} />
                    </Float>
                </ScrollControls>
            </Canvas>
        </section>
    )
}
