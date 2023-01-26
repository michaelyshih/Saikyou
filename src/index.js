import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Viewer from "./Viewer3D";
import DataTable from './dataTable';
import { LoadingManager } from 'three';
import SplashPage from './SplashPage';
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
datatable.addPanelsData("m");
datatable.addPanelsData("a");
datatable.addPanelsData("s");
viewer.populate();

//amibent lighting
// const ambientLight = new THREE.AmbientLight(0xffffff,1.0);
// viewer.scene.add(ambientLightColor);

//camera
const aspect = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(
    75, // field of view
    aspect, // aspect ratio
    0.1, // near clipping range
    2000); // far clipping range
camera.position.set(0,40,2100);  // set z axis of camera so that it's further away
camera.lookAt(0,40,2000)

//resizing
// function resizeCanvasToDisplaySize() {
window.addEventListener("resize",()=>{
    // const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = window.innerWidth;
    const height = window.innerHeight;

    // adjust displayBuffer size to match
    // if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

      // update any render target sizes here
})
    // }
//   }

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
let currentYear = viewer.currentTimeline.currentYear;
yearInput.addEventListener("input", function(e){
    e.preventDefault();
    // let pos1 = camera.position;
    const year = "y" + e.target.value;
    currentYear = year;
    viewer.currentTimeline.currentYear = year;
    updateCamera(year);
})

//updating camera to new year location
function updateCamera(year){
    const newPos = viewer.currentTimeline.years[year];
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
const canvas = document.querySelector("canvas");
function onPointermMove(event){
    //setting the pointer position relative to the scaling of width and height of screen
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

//play on hover
let currentlyPlaying = [];

canvas.addEventListener("mousemove", throttle(function (event){
    onPointermMove(event); // sets the pointe location as the mouse's event location

    raycaster.setFromCamera( pointer, camera ); // setting the pointer x,y on the camera **might have to change when dealing with multiple camera

    const intersects = raycaster.intersectObjects( viewer.scene.children ); //returns all the objs in scene that intersect with the pointer

    if(intersects.length > 0 && intersects[0].object.userData.playable){

        const played = intersects[0].object;
        const display = played.userData.id + "-display"
        const panelPlayed = document.getElementById(display);

        if (!played.userData.playing){
            // panelPlayed.muted = true;
            panelPlayed.loop = true;
            panelPlayed.muted = true;
            if (panelPlayed.id[0] === "s"){
                panelPlayed.muted = false;
            }
            panelPlayed.play();
            played.userData.playing = true;
            if (display[0] !== "s"){
                setTimeout(function(){
                    played.userData.playing = false;
                    panelPlayed.pause();
                    }
                , 30000)
            } else {
                // once it media starts playing and it's a song
                // put song into currently playing and change the background to the song

                if (currentlyPlaying[0]) {
                    currentlyPlaying[0][1].userData.playing = false;
                    currentlyPlaying.shift()[0].pause()
                    currentlyPlaying.push([panelPlayed,played]);
                }else {
                    currentlyPlaying.push([panelPlayed,played]);
                };
                viewer.scene.background = new THREE.VideoTexture(panelPlayed)
                const pause = document.getElementById("pause");
                pause.setAttribute("style","display:revert");

            }
        }
    }
},250));

// listeneer for click to interact with object
let clicked;
const zoomedIn = document.getElementsByClassName("zoomed-in");
let panelClicked;
let inZoom;

canvas.addEventListener("mousedown", event=>{
    onPointermMove(event); // sets the points location as the mouse's event location
    raycaster.setFromCamera( pointer, camera ); // setting the pointer x,y on the camera **might have to change when dealing with multiple camera
    const intersects = raycaster.intersectObjects( viewer.scene.children ); //returns all the objs in scene that intersect with the pointer

    if (inZoom){
        // remove foreground by clicking background
        zoomedIn[0].firstElementChild.removeChild(panelClicked);
        zoomedIn[0].setAttribute("style","display:none");
        const zoomedDescChildren = zoomedIn[0].lastElementChild.children;

        while (zoomedDescChildren[0]){
            zoomedDescChildren[0].parentNode.removeChild(zoomedDescChildren[0]);
        }
        inZoom = false;
    }

    if(intersects.length > 0 && intersects[0].object.userData.clickable){
        clicked = intersects[0].object;
        datatable.addData(clicked.userData.id);
        panelClicked = document.getElementById(clicked.userData.id);
        changeButtons();

        zoomedIn[0].setAttribute("style","display: flex;");
        inZoom = true;
        //pause currently playing
        // if (currentlyPlaying[0]) pauseBackground();
        // remove listener for hover

    }

});

//throttle function to limit hover event
function throttle(cb, interval){
    let enableCall = true;
    return function(...args){
        if (!enableCall) return;
        enableCall = false;
        cb.apply(this, args);
        setTimeout(()=>enableCall=true, interval);
    }
}

// pause and unpause button to pause and unpause on click
const pause = document.getElementById("pause")
const unpause = document.getElementById("unpause")

pause.addEventListener("click",(e)=>{
    e.stopPropagation();
    pauseBackground();
})

unpause.addEventListener("click",(e)=>{
    e.stopPropagation();
    unpauseBackground();
})

//pause/ unpause video
function pauseBackground(){
    currentlyPlaying[0][1].userData.playing = false;
    currentlyPlaying[0][0].pause();

    const background = document.getElementById("background-loop");
    viewer.scene.background = new THREE.VideoTexture(background);
    pause.setAttribute("style","display:none");
    unpause.setAttribute("style","display:revert");
}

function unpauseBackground(){
    currentlyPlaying[0][1].userData.playing = true;
    currentlyPlaying[0][0].play();

    viewer.scene.background = new THREE.VideoTexture(currentlyPlaying[0][0]);
    unpause.setAttribute("style","display:none");
    pause.setAttribute("style","display:revert");
}



// return to canvas when click on home
const home = document.getElementById("home")
home.addEventListener("click",(e)=>{
    e.stopPropagation();
    const zoomedImgChildren = zoomedIn[0].firstElementChild.children;
    while (zoomedImgChildren[0]){
        zoomedImgChildren[0].parentNode.removeChild(zoomedImgChildren[0]);
    }
    const zoomedDescChildren = zoomedIn[0].lastElementChild.children;
    zoomedIn[0].setAttribute("style","display:none");
    changeButtons();
    while (zoomedDescChildren[0]){
        zoomedDescChildren[0].parentNode.removeChild(zoomedDescChildren[0]);
    }
    if (currentlyPlaying[0]) unpauseBackground();
    inZoom = false;
})

//reverse nav buttons
function changeButtons(){
    const homeButton = document.getElementById("home");
    const animeButton = document.getElementById("anime")
    const mangaButton = document.getElementById("manga")
    const songsButton = document.getElementById("songs")

    if (inZoom){
        animeButton.setAttribute("style","display: revert;")
        mangaButton.setAttribute("style","display: revert;")
        songsButton.setAttribute("style","display: revert;")
        homeButton.setAttribute("style","display: none;")
    } else {
        animeButton.setAttribute("style","display: none;")
        mangaButton.setAttribute("style","display: none;")
        songsButton.setAttribute("style","display: none;")
        homeButton.setAttribute("style","display: revert;")
    }
}

// when clicked on nav bar, switch timelnie
const navLink = document.getElementsByClassName("camera nav")
for (let li of navLink){
    li.addEventListener("click",(e)=>{
        e.stopPropagation();
        const heading = document.getElementsByClassName("heading")[0];

        const timelineType =li.childNodes[0].id;
        heading.innerHTML = `Every Top 3 ${timelineType[0].toUpperCase() + timelineType.slice(1)} from 2018-2022`;
        viewer.switchTimeline(timelineType);
        const year = currentYear;
        updateCamera(year)
    })
}

// animate
function update(){

    // resizeCanvasToDisplaySize();
    controls.update();// must be called anytime there's change to the camera's transform
    renderer.render(viewer.scene, camera);

    viewer.animate();
    requestAnimationFrame(update); // loop every time the scene is refreshed => 60 fps
};



// adding reflective plane

//video loading manager
const loadingManager = new LoadingManager();
const videos = document.getElementsByTagName("video")
for (let video of videos){
    loadingManager.itemStart(video.src);
    video.addEventListener("canplaythrough", function videoCanPlay(){
        video.removeEventListener("canplaythrough", videoCanPlay,false);
        loadingManager.itemEnd(video.src);
    },false)
}
// waiting on canplaythrough
const splash = new SplashPage();
loadingManager.onLoad = function(){

    splash.addFinishedPage();
    // loadingpage.setAttribute("style","display:none;");
    // debugger
    update();
}
