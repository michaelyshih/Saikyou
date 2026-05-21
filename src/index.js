import './index.scss';
import { renderer, camera, controls, raycaster, pointer, onPointerMove } from './core/renderer';
import { initScene } from './core/sceneSetup';
import { initCameraControls } from './core/cameraControls';
import { initLoadingManager } from './core/loadingManager';
import { initNavigation } from './ui/navigation';
import { initEventListeners } from './ui/eventListeners';

//scene
const { viewer, datatable } = initScene();

window.addEventListener("resize",()=>{
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

//camera controls
const { updateCamera, getCurrentYear } = initCameraControls(viewer, camera, controls);
let currentYear = getCurrentYear();

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

initLoadingManager(update);
