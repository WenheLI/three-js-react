import * as THREE from 'three';
import React, { useRef, useState } from 'react';

function Sphere(props: JSX.IntrinsicElements['mesh']) {
    const mesh = useRef<THREE.Mesh>();

    return (
        <mesh
            {...props}
            ref={mesh}
        >
            <sphereGeometry
                
            >
                
            </sphereGeometry>
        </mesh>
    );
}