import * as THREE from 'three';

export const currentlyPlaying = [];

export function pauseBackground(viewer) {
    currentlyPlaying[0][1].userData.playing = false;
    currentlyPlaying[0][0].pause();
    const background = document.getElementById("background-loop");
    viewer.scene.background = new THREE.VideoTexture(background);
    document.getElementById("pause").setAttribute("style", "display:none");
    document.getElementById("unpause").setAttribute("style", "display:revert");
}

export function unpauseBackground(viewer) {
    currentlyPlaying[0][1].userData.playing = true;
    currentlyPlaying[0][0].play();
    viewer.scene.background = new THREE.VideoTexture(currentlyPlaying[0][0]);
    document.getElementById("unpause").setAttribute("style", "display:none");
    document.getElementById("pause").setAttribute("style", "display:revert");
}
