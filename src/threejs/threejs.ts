import { RefObject } from "react";
import * as THREE from "three";
import data from '../data/data.json';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function randomColorHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const prepareMaterial = (data: any) => {
    const materialPool: { [key: string]: THREE.Material } = {};
    const groups: Set<string> = new Set(data.nodes.map((it: any) => it.group));
    groups.forEach((it) => {
        materialPool[it] = new THREE.MeshBasicMaterial({
            color: randomColorHex(),
        });
    })

    console.log(materialPool);
    return materialPool;
}

const main = (containerRef: RefObject<HTMLDivElement>) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f1f1f);
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    containerRef.current?.appendChild(renderer.domElement);
    const controls = new OrbitControls( camera, renderer.domElement );

    const materialPool = prepareMaterial(data);

    const geometry = new THREE.SphereGeometry(.5);

    const spherePool: { [key: string]: THREE.Mesh } = {};
    // const linePool: Array<THREE.Line> = [];
    // const linePoolReference: { [key: string]: Array<number> } = {};
    
    // drawNodes
    for (const node of data.nodes) {
        const sphere = new THREE.Mesh(geometry, materialPool[node.group]);
        sphere.position.x = Math.random() * 100 - 50;
        sphere.position.y = Math.random() * 100 - 50;
        sphere.position.z = Math.random() * 100 - 50;
        scene.add(sphere);
        sphere.userData = {
            'id': node.id,
        }
        spherePool[node.id] = sphere;
    }

    const dragControl = new DragControls(Object.values(spherePool), camera, renderer.domElement);

    const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );

    // drawLines
    for (const link of data.links) {
        const sphere1 = spherePool[link.source];
        const sphere2 = spherePool[link.target];
        const lineGeometry = new THREE.BufferGeometry();
        lineMaterial.opacity = link.value * 0.1;
        lineGeometry.setFromPoints([sphere1.position, sphere2.position]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    }

    camera.position.z = 5;

    dragControl.addEventListener('dragstart', (e) => {
        controls.enabled = false;
    });

    dragControl.addEventListener('dragend', (e) => {
        controls.enabled = true;
    });

    renderer.render(scene, camera);

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };

    animate();
}

export {
    main
};