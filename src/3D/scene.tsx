import * as THREE from 'three';
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function Box() {
    const mesh = useRef<THREE.Mesh>();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default Box;