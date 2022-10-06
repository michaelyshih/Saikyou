import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth/ window.innerHeight, // aspect ratio
    0.1, // near clipping range
    1000) // far clipping range 

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
