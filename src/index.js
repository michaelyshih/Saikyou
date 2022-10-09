import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Viewer from "./Viewer3D";
import Papa from "papaparse";

//csv-parser
// let csvData = [];
// Papa.parse("",{
//     header:true,
//     step:function(result){
//         csvData.push(result.data)
//     },
//     complete: function(results,fele){
//         console.log("Complete", csvData.length,"records.")
//     }});


//renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // enabling anti-alias to soften corners
renderer.setSize( window.innerWidth, window.innerHeight ); // setting renderer size to be window
renderer.shadowMap.enabled = true; // allows for shadow when redering
document.body.appendChild( renderer.domElement ); // at the rendered canvas as a child of the body

//scene
const viewer = new Viewer();


//camera
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping range
    2000); // far clipping range
    camera.position.set(0,50,999);  // set z axis of camera so that it's further away

//orbital controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update(); // must be called anytime there's change to the camera's transform

// attempt at setting up TubeGeometry
// const timelineGeo = new THREE.TubeGeometry({ tubularSegments:1, radius:5, radialSegments:8, closed:true});
// const timelineMat= new THREE.MeshBasicMaterial({color:"red", wireframe:true});
// const timeline = new THREE.Mesh( timelineGeo, timelineMat );
// timeline.position.set(0,0,0)
// viewer.scene.add(timeline);

//lighting



viewer.populate();


// raycasting for object interaction
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); // setting a two dimensinal vector for the location of pointer relative to screen
var clicked;

function onPointermMove(event){
    //setting the pointer position relative to the scaling of width and height of screen
}

// listeneer for click to interact with object
window.addEventListener("click", event=>{
    // onPointermMove(event); // sets the pointe location as the mouse's event location
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera ); // setting the pointer x,y on the camera **might have to change when dealing with multiple camera

    const intersects = raycaster.intersectObjects( viewer.scene.children ); //returns all the objs in scene that intersect with the pointer
    const zoomedContent = document.getElementsByClassName("zoomed-content");
    const zoomedDesc = document.getElementsByClassName("zoomed-description");
    if(intersects.length > 0 && intersects[0].object.userData.clickable){
        clicked = intersects[0].object;
        console.log(`found clickable ${clicked.userData.id}`) // return the clickable obj name debugging

        // console.log(zoomedContent[0].style);
        // zoomedContent[0].style.display = "static";
        // console.log(zoomedContent[0].style);
    }

});


function update(){




    renderer.render(viewer.scene, camera);
    // viewer.animate();
    requestAnimationFrame(update); // loop every time the scene is refreshed => 60 fps
};

update();

// adding reflective plane

// adding panels
// const groundGeo = new THREE.PlaneGeometry(100,100)
// const groundMat = new THREE.MeshBasicMaterial({color: })

//csv parser
