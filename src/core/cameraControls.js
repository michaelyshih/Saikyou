export function initCameraControls(viewer, camera, controls) {
    let currentYear = viewer.currentTimeline.currentYear;

    function updateCamera(year) {
        const newPos = viewer.currentTimeline.years[year];
        camera.position.set(...newPos);
        const lookingPos = newPos.slice();
        lookingPos[2] -= 100;
        camera.lookAt(...lookingPos);
        controls.target.set(...lookingPos);
        controls.zoomSpeed = 2;
        controls.update();
    }

    document.getElementById("year").addEventListener("input", function(e) {
        e.preventDefault();
        const year = "y" + e.target.value;
        currentYear = year;
        viewer.currentTimeline.currentYear = year;
        updateCamera(year);
    });

    return { updateCamera, getCurrentYear: () => currentYear };
}
