import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Viewer from "./Viewer3D";
import DataTable from './dataTable';
// import Papa from "papaparse";
// import fs from "fs";

//csv-parser
// let file = fs.createReadStream("./src/data/data.csv");
// let csvData = [];
// Papa.parse(file, {
//   header: true,
//   step: function(result) {
//     csvData.push(result.data)
//   },
//   complete: function(results, file) {
//     console.log('Complete', csvData.length, 'records.');
//   }
// });
// console.log(csvData);

//renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // enabling anti-alias to soften corners
renderer.setSize( window.innerWidth, window.innerHeight ); // setting renderer size to be window
renderer.shadowMap.enabled = true; // allows for shadow when redering
document.body.appendChild( renderer.domElement ); // at the rendered canvas as a child of the body

//scene
const viewer = new Viewer();
viewer.populate();

//camera
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping range
    2000); // far clipping range
camera.position.set(0,40,1100);  // set z axis of camera so that it's further away




//orbital controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // add weight to the orbital camera panning
controls.dampingFactor = 0.05; // damping factor
controls.enablePan = false;
// controls.enableRotate= false;

//shifting camera according to position
const yearInput = document.getElementById("year");
// let pos1 = camera.position;
// let pos2 = new THREE.Vector3(...viewer.currentTimeline.years["y2018"]);
// // camera.set(newPos)
yearInput.addEventListener("input", function(e){
    e.preventDefault();
    // let pos1 = camera.position;
    const year = "y" + e.target.value;
    viewer.currentTimeline.currentYear = year;
    updateCamera(year);
})

function updateCamera(year){
    const newPos = viewer.currentTimeline.years[year];
    // console.log(newPos)
    camera.position.set(...newPos);
    const lookingPos = newPos.slice();
    lookingPos[2] -= 100;
    camera.lookAt(...lookingPos);
    controls.target.set(...lookingPos);
    controls.update();
}

//lighting
// const pointLight = new THREE.PointLight(0xffffff,50); // setting a point light with intesity of 1, color of white
// camera.add(pointLight);

// raycasting for object interaction
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); // setting a two dimensinal vector for the location of pointer relative to screen

function onPointermMove(event){
    //setting the pointer position relative to the scaling of width and height of screen
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
// loop video if it's nolonger playing

// listeneer for click to interact with object
let clicked;
const zoomedIn = document.getElementsByClassName("zoomed-in");
let panelClicked;
// let panelsClicked = []
const datatable = new DataTable();

const canvas = document.querySelector("canvas");
canvas.addEventListener("click", event=>{
    onPointermMove(event); // sets the pointe location as the mouse's event location

    raycaster.setFromCamera( pointer, camera ); // setting the pointer x,y on the camera **might have to change when dealing with multiple camera

    const intersects = raycaster.intersectObjects( viewer.scene.children ); //returns all the objs in scene that intersect with the pointer

    if(intersects.length > 0 && intersects[0].object.userData.clickable){
        clicked = intersects[0].object;
        console.log(`found clickable ${clicked.userData.id}`) // return the clickable obj name debugging
        datatable.addData(clicked.userData.id);
        panelClicked = document.getElementById(clicked.userData.id);
        // panelsClicked.push(panelClicked)
        zoomedIn[0].style.display = "flex";
        // panelClicked.style.display = "revert";

    }
});

//play on hover
let played;
let panelPlayed;
let playing = false;

canvas.addEventListener("mousemove", throttle(function(event){
    onPointermMove(event); // sets the pointe location as the mouse's event location

    raycaster.setFromCamera( pointer, camera ); // setting the pointer x,y on the camera **might have to change when dealing with multiple camera

    const intersects = raycaster.intersectObjects( viewer.scene.children ); //returns all the objs in scene that intersect with the pointer

    if(intersects.length > 0 && intersects[0].object.userData.playable){
        played = intersects[0].object;
        const display = played.userData.id + "-display"
        panelPlayed = document.getElementById(display);
        console.log(`found playable ${played.userData.id}`) // return the playable obj name debugging
        panelPlayed.play();
        console.log(panelPlayed)
        playing = true;
    }
},300));

function throttle(cb, interval){
    let enableCall = true;
    return function(...args){
        if (!enableCall) return;
        enableCall = false;
        cb.apply(this, args);
        setTimeout(()=>enableCall=true, interval);
    }
}


// return to canvas when click on back
const back = document.getElementById("back")
back.addEventListener("click",(e)=>{
    e.stopPropagation();

    // panelClicked.style.display = "none";
    zoomedIn[0].firstElementChild.removeChild(panelClicked);
    const zoomedDescChildren = zoomedIn[0].lastElementChild.children;
    while (zoomedDescChildren[0]){
        zoomedDescChildren[0].parentNode.removeChild(zoomedDescChildren[0]);
    }
})

// when clicked on nav bar, switch timelnie
const navLink = document.getElementsByClassName("camera nav")
for (let li of navLink){
    li.addEventListener("click",(e)=>{
        e.stopPropagation();
        const timleineType =li.childNodes[0].id[0];
        viewer.switchTimeline(timleineType);
        const year = viewer.currentTimeline.currentYear;
        console.log(viewer.currentTimeline)
        updateCamera(year)
    })
}

// animate
function update(){

    // camera.lookAt(0,40,0)
    controls.update();// must be called anytime there's change to the camera's transform
    renderer.render(viewer.scene, camera);

    viewer.animate();
    requestAnimationFrame(update); // loop every time the scene is refreshed => 60 fps
};

update();

// adding reflective plane

// adding panels
// const groundGeo = new THREE.PlaneGeometry(100,100)
// const groundMat = new THREE.MeshBasicMaterial({color: })

//csv parser
