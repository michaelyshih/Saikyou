import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping range
    1000); // far clipping range

const geometry = new THREE.BoxGeometry( 2, 2, 0 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material ); // takes in geometry and material to make the item
scene.add( cube );

camera.position.z = 5; // set z axis of camera

const renderer = new THREE.WebGLRenderer({antialias: true}); // enabling anti-alias to soften corners
renderer.setSize( window.innerWidth, window.innerHeight );
// console.log(renderer)
// console.log(document)
// console.log(document.body)
document.body.appendChild( renderer.domElement );



function animate(){
    requestAnimationFrame(animate); // loop every time the scene is refreshed => 60 fps

    // cube.rotation.x += 0.01; // rotation in speed per second
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera)
}

animate();
