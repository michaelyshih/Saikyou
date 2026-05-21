import * as THREE from 'three';
import { changeButtons } from './navigation';
import { currentlyPlaying, pauseBackground, unpauseBackground } from './videoManager';

let panelClicked, inZoom, clicked;
const zoomedIn = document.getElementsByClassName("zoomed-in");

function throttle(cb, interval) {
    let enableCall = true;
    return function(...args) {
        if (!enableCall) return;
        enableCall = false;
        cb.apply(this, args);
        setTimeout(() => enableCall = true, interval);
    }
}

export function initEventListeners({ canvas, viewer, datatable, raycaster, pointer, onPointerMove, camera }) {

    // mousemove
    canvas.addEventListener("mousemove", throttle(function(event) {
        onPointerMove(event);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(viewer.scene.children);

        if (intersects.length > 0 && intersects[0].object.userData.playable) {
            const played = intersects[0].object;
            const display = played.userData.id + "-display";
            const panelPlayed = document.getElementById(display);

            if (!played.userData.playing) {
                panelPlayed.loop = true;
                panelPlayed.muted = true;
                if (panelPlayed.id[0] === "s") panelPlayed.muted = false;
                panelPlayed.play();
                played.userData.playing = true;

                if (display[0] !== "s") {
                    setTimeout(() => {
                        played.userData.playing = false;
                        panelPlayed.pause();
                    }, 30000);
                } else {
                    if (currentlyPlaying[0]) {
                        currentlyPlaying[0][1].userData.playing = false;
                        currentlyPlaying.shift()[0].pause();
                        currentlyPlaying.push([panelPlayed, played]);
                        document.getElementById("unpause")?.setAttribute("style", "display:none");
                    } else {
                        currentlyPlaying.push([panelPlayed, played]);
                    }
                    viewer.scene.background = new THREE.VideoTexture(panelPlayed);
                    currentlyPlaying[0][1].userData.playing = true;
                    currentlyPlaying[0][0].play();
                    document.getElementById("pause").setAttribute("style", "display:revert");
                }
            }
        }
    }, 250));

    // mousedown
    canvas.addEventListener("mousedown", event => {
        onPointerMove(event);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(viewer.scene.children);

        if (inZoom) {
            zoomedIn[0].firstElementChild.removeChild(panelClicked);
            zoomedIn[0].setAttribute("style", "display:none");
            const zoomedDescChildren = zoomedIn[0].lastElementChild.children;
            while (zoomedDescChildren[0]) {
                zoomedDescChildren[0].parentNode.removeChild(zoomedDescChildren[0]);
            }
            inZoom = false;
            changeButtons(inZoom);
        }

        if (intersects.length > 0 && intersects[0].object.userData.clickable) {
            clicked = intersects[0].object;
            datatable.addData(clicked.userData.id);
            panelClicked = document.getElementById(clicked.userData.id);
            inZoom = true;
            changeButtons(inZoom);
            zoomedIn[0].setAttribute("style", "display: flex;");
        }
    });

    // pause/unpause
   document.getElementById("pause").addEventListener("click", (e) => {
      e.stopPropagation();
      pauseBackground(viewer);
   });

   document.getElementById("unpause").addEventListener("click", (e) => {
      e.stopPropagation();
      unpauseBackground(viewer);
   });

    // home button
    document.getElementById("home").addEventListener("click", (e) => {
        e.stopPropagation();
        const zoomedImgChildren = zoomedIn[0].firstElementChild.children;
        while (zoomedImgChildren[0]) {
            zoomedImgChildren[0].parentNode.removeChild(zoomedImgChildren[0]);
        }
        const zoomedDescChildren = zoomedIn[0].lastElementChild.children;
        zoomedIn[0].setAttribute("style", "display:none");
        inZoom = false;
        changeButtons(inZoom);
        while (zoomedDescChildren[0]) {
            zoomedDescChildren[0].parentNode.removeChild(zoomedDescChildren[0]);
        }
    });
}
