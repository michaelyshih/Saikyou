import * as THREE from 'three';
import './index.scss';

import Viewer from "./Viewer3D";
import DataTable from './dataTable';
import SplashPage from './SplashPage';

import { renderer, camera, controls, raycaster, pointer, onPointerMove} from './renderer';
import { pauseBackground, unpauseBackground } from './videoManager';
import { initNavigation, changeButtons } from './navigation';
import { initEventListeners } from './eventListeners';


//scene
const viewer = new Viewer();
const datatable = new DataTable();
datatable.addPanelsData("m");
datatable.addPanelsData("a");
datatable.addPanelsData("s");
viewer.populate();


//resizing
//  TODO: MODIFY RESIZE FOR BANNER TOO
// function resizeCanvasToDisplaySize() {}
window.addEventListener("resize",()=>{
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})


//shifting camera according to position
const yearInput = document.getElementById("year");
let currentYear = viewer.currentTimeline.currentYear;
yearInput.addEventListener("input", function(e){
    e.preventDefault();
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

//play on hover
let currentlyPlaying = [];
const canvas = renderer.domElement;

// when clicked on nav bar, switch timelnie
initNavigation(viewer, updateCamera, () => currentYear);
initEventListeners({
    canvas: renderer.domElement,
    viewer,
    datatable,
    raycaster,
    pointer,
    onPointerMove,
    camera
});

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
const loadingManager = new THREE.LoadingManager();
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
    update();
}
