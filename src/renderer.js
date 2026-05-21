import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// renderer
const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    75,
    aspect,
    0.1,
    2000
);
camera.position.set(0, 40, 2100);
camera.lookAt(0, 40, 2000);

// orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
Object.assign(controls, {
    enableDamping: true,
    dampingFactor: 0.05,
    enablePan: false,
});

// raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export { renderer, camera, controls, raycaster, pointer, onPointerMove };
