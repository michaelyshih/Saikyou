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
const datatable = new DataTable();
datatable.addPanels("m");
datatable.addPanels("a");
viewer.populate();

//camera
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping range
    2000); // far clipping range
camera.position.set(0,40,2100);  // set z axis of camera so that it's further away
camera.lookAt(0,40,2000)

//resizing

// window.addEventListener("resize",()=>{
//     camera.aspect = window.innerWidth / innerHeight;
//     camera.updateProjectionMatrix;

//     renderer.setSize(window.innerWidth / innerHeight)
// },false)


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
    controls.zoomSpeed = 2;
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


// listeneer for click to interact with object
let clicked;
const zoomedIn = document.getElementsByClassName("zoomed-in");
let panelClicked;

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
        zoomedIn[0].style.display = "flex";

    }
});

//play on hover
let played;
let panelPlayed;
let playList = [];
let playing = false;

canvas.addEventListener("mousemove", throttle(function(event){
    onPointermMove(event); // sets the pointe location as the mouse's event location

    raycaster.setFromCamera( pointer, camera ); // setting the pointer x,y on the camera **might have to change when dealing with multiple camera

    const intersects = raycaster.intersectObjects( viewer.scene.children ); //returns all the objs in scene that intersect with the pointer

    if(intersects.length > 0 && intersects[0].object.userData.playable){
        played = intersects[0].object;
        const display = played.userData.id + "-display"
        panelPlayed = document.getElementById(display);
        panelPlayed.muted = true;
        panelPlayed.play();
        if (!playList.includes(panelPlayed)){
            playList.push(panelPlayed);
        }
        playing = true;
    }
},300));

setInterval(() => {
    if (playing){;
        playList.shift().pause();
        if (!playList[0]){
            playing = false;
        }
    }
}, 20000);

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
        const heading = document.getElementsByClassName("heading")[0];

        const timelineType =li.childNodes[0].id;
        heading.innerHTML = `Every Top 3 ${timelineType[0].toUpperCase() + timelineType.slice(1)} from 2018-2022`;
        viewer.switchTimeline(timelineType);
        const year = viewer.currentTimeline.currentYear;
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
