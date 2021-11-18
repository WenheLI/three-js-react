import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Line, CubicBezierLine, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function randomColorHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomHWD(): [number, number, number] {
    return [Math.random() * 3, Math.random() * 4, Math.random() * 3];
}

function randomRaius(): [number] {
    return [Math.random() * 3];
}

function generataeRandomSphere(num: number) {
    const spheres = [];
    for (let i = 0; i < num; i++) {
        spheres.push(
            <Sphere
                onClick={() => {
                    console.log('clicked');
                }}
                key={i}
                args={randomRaius()}
                position={new THREE.Vector3(Math.random() * 30, Math.random() * 30, Math.random() * 30)}
            >
                <meshPhongMaterial attach="material" color={randomColorHex()} />
            </Sphere>
        );
    }
    return spheres;
}

function generateLinesFromSphere(sphere: JSX.Element[]) {
    const lines = [];
    const center = parseInt((Math.random() * sphere.length).toFixed(0));
    for (let i = 0; i < sphere.length; i++) {
        if (i !== center) {
            lines.push(
                <Line
                    key={i}
                    points={[
                        sphere[center].props.position,
                        sphere[i].props.position
                    ]}
                    lineWidth={0.5}
                    color={randomColorHex()}
                >
                </Line>
            );
        }
    }
    console.log(lines);
    return lines;
}

function App() {
    const spheres = generataeRandomSphere(10);
    const lines = generateLinesFromSphere(spheres);
    
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <PerspectiveCamera makeDefault position={new THREE.Vector3(0, 0, -10)}/>

            {spheres}
            {lines}

            <OrbitControls
                enablePan={(true)}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>     
    );
}

export default App