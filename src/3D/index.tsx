import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

function randomColorHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomRaius(): [number] {
    return [Math.random() * 3];
}

function generataeRandomSphere(num: number, control: any) {
    const spheres = [];
    const refs = new Array(num);
    for (let i = 0; i < num; i++) {
        const currentRadius = randomRaius();
        const currentPosition = new THREE.Vector3(Math.random() * 30, Math.random() * 30, Math.random() * 30);
        spheres.push(
            <Sphere
                onDoubleClick={(e) => {
                    control.current.target = currentPosition;
                    control.current.update();
                }}
                
                key={i}
                ref={(r) => refs[i] = r}
                args={currentRadius}
                position={currentPosition}
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
    return lines;
}

function App() {
    const camera = useRef<THREE.Camera>();
    
    const control = useRef<OrbitControlsImpl>();

    const spheres = generataeRandomSphere(10, control);
    const lines = generateLinesFromSphere(spheres);

    const initPos = new THREE.Vector3(spheres[0].props.position.x, spheres[0].props.position.y, spheres[0].props.position.z + 20);


    useEffect(() => {
        document.addEventListener('keypress', (e) => {
            if (camera.current) {
                switch(e.key) {
                    case 'a':
                        camera.current.position.x -= 1;
                        break;
                    case 'd':
                        camera.current.position.x += 1;
                        break;
                    case 'w':
                        camera.current.position.y += 1;
                        break;
                    case 's':
                        camera.current.position.y -= 1;
                        break;   
                }
            }
            
                
        })
    }, []);

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <PerspectiveCamera makeDefault ref={camera} position={initPos} />
            {spheres}
            {lines}

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                target={spheres[0].props.position}
                // @ts-ignore
                ref={control}
                camera={camera.current}
            />
        </Canvas>     
    );
}

export default App