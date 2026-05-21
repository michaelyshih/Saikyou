export function changeButtons(inZoom) {
    const homeButton = document.getElementById("home");
    const animeButton = document.getElementById("anime");
    const mangaButton = document.getElementById("manga");
    const songsButton = document.getElementById("songs");
    const footer = document.getElementById("footer");

    if (!inZoom) {
        animeButton.setAttribute("style", "display: revert;")
        mangaButton.setAttribute("style", "display: revert;")
        songsButton.setAttribute("style", "display: revert;")
        footer.setAttribute("style", "display: flex;")
        homeButton.setAttribute("style", "display: none;")
    } else {
        animeButton.setAttribute("style", "display: none;")
        mangaButton.setAttribute("style", "display: none;")
        songsButton.setAttribute("style", "display: none;")
        footer.setAttribute("style", "display: none;")
        homeButton.setAttribute("style", "display: revert;")
    }
}

export function initNavigation(viewer, updateCamera, getCurrentYear) {
    const navLink = document.getElementsByClassName("camera nav");
    for (let li of navLink) {
        li.addEventListener("click", (e) => {
            e.stopPropagation();
            const heading = document.getElementsByClassName("heading")[0];
            const timelineType = li.childNodes[0].id;
            heading.innerHTML = `Every Top 3 ${timelineType[0].toUpperCase() + timelineType.slice(1)} from 2018-2022`;
            viewer.switchTimeline(timelineType);
            updateCamera(getCurrentYear());
        });
    }
}
