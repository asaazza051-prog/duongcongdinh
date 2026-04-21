"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function CartoonCharacter({ theme }) {
    const group = useRef();
    const [isSmiling, setIsSmiling] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    // Simple Theme color map (Secure/Insecure)
    const colors = useMemo(() => {
        if (theme === "blood") {
            return { primary: "#ff0000", secondary: "#8b0000", eyes: "#ff4444" };
        }
        return { primary: "#7c3aed", secondary: "#4c1d95", eyes: "#06b6d4" };
    }, [theme]);

    useEffect(() => {
        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
            setTimeout(blink, Math.random() * 4000 + 2000);
        };
        const timeout = setTimeout(blink, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const handleClick = () => {
        setIsSmiling(true);
        setTimeout(() => setIsSmiling(false), 2000);
    };

    useFrame((state) => {
        if (!group.current) return;
        const mouseX = state.mouse.x;
        const mouseY = state.mouse.y;
        const time = state.clock.getElapsedTime();
        const target = new THREE.Vector3(mouseX * 3, mouseY * 2 + 1, 5);
        group.current.lookAt(target);
        group.current.position.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <group ref={group} scale={typeof window !== 'undefined' && window.innerWidth < 768 ? 1.4 : 1} onClick={handleClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.2, 1.8, 1.8]} />
                <meshStandardMaterial color={colors.primary} roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.91]}>
                <planeGeometry args={[1.9, 1.3]} />
                <meshStandardMaterial color="#050510" />
            </mesh>
            <mesh position={[-0.45, isSmiling ? 0.05 : 0.1, 0.92]}>
                {(isSmiling || isBlinking) ? <boxGeometry args={[0.35, 0.05, 0.05]} /> : <circleGeometry args={[0.22, 32]} />}
                <meshBasicMaterial color={isSmiling ? "#ec4899" : colors.eyes} />
            </mesh>
            <mesh position={[0.45, isSmiling ? 0.05 : 0.1, 0.92]}>
                {(isSmiling || isBlinking) ? <boxGeometry args={[0.35, 0.05, 0.05]} /> : <circleGeometry args={[0.22, 32]} />}
                <meshBasicMaterial color={isSmiling ? "#ec4899" : colors.eyes} />
            </mesh>
            <mesh position={[0, -0.4, 0.92]}>
                <planeGeometry args={[isSmiling ? 0.8 : 0.4, 0.04]} />
                <meshBasicMaterial color={isSmiling ? "#ec4899" : colors.eyes} transparent opacity={0.8} />
            </mesh>
            <mesh position={[0.5, 1.1, 0]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.03, 0.03, 0.8]} />
                <meshStandardMaterial color={colors.secondary} />
            </mesh>
            <mesh position={[0.65, 1.5, 0]}>
                <sphereGeometry args={[0.12]} />
                <meshStandardMaterial color={colors.eyes} emissive={colors.eyes} emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

export default function Model3D({ theme }) {
    return (
        <div className="w-full h-full relative z-20" style={{ minHeight: "400px" }}>
            <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }}>
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <Environment preset="night" />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                    <CartoonCharacter theme={theme} />
                </Float>
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={12} blur={2.5} far={4} color="#000000" />
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
            </Canvas>
        </div>
    );
}
