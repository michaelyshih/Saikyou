import * as THREE from 'three';
import SplashPage from '../ui/SplashPage';

export function initLoadingManager(updateFn) {
    const loadingManager = new THREE.LoadingManager();
    const videos = document.getElementsByTagName("video");

    for (let video of videos) {
        loadingManager.itemStart(video.src);
        video.addEventListener("canplaythrough", function videoCanPlay() {
            video.removeEventListener("canplaythrough", videoCanPlay, false);
            loadingManager.itemEnd(video.src);
        }, false);
    }

    const splash = new SplashPage();
    loadingManager.onLoad = function() {
        splash.addFinishedPage();
        updateFn();
    }
}
