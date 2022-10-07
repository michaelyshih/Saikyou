import * as THREE from 'three';
import Panel from "./panel.js";
// import { threadId } from 'worker_threads';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping range
    1000); // far clipping range

// adding reflective plane

// adding panels
const panel1 = new Panel("#3561F2");
panel1.mesh.position.x += 2 ;
const panel2 = new Panel("red");
panel2.mesh.position.x -= 2;
scene.add( panel1.mesh ); // adding item to a scene
scene.add( panel2.mesh ); // adding item to a scene

const groundGeo = new THREE.PlaneGeometry(100,100)
// const groundMat = new THREE.MeshBasicMaterial({color: })

camera.position.z = 5; // set z axis of camera

//setting up renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // enabling anti-alias to soften corners
renderer.setSize( window.innerWidth, window.innerHeight ); // setting renderer size to be window

document.body.appendChild( renderer.domElement ); // at the rendered canvas as a child of the body

function animate(){
    requestAnimationFrame(animate); // loop every time the scene is refreshed => 60 fps

    panel1.mesh.rotation.x += 0.01; // rotation in speed per second
    panel1.mesh.rotation.y += 0.01;

    renderer.render(scene, camera)
}

animate();
panel2.animate(renderer,scene,camera);
