import THREE from "three";

export const panelDisplay = async function(type){
    for (let i = 18; i < 23; i++){
        for (let j= 1; j <= 3; j++){
            let panelID = type + i + j;
            let panel_display = panel_id + "-display"
            let media;
            if (panelID != "a191"){
                media = document.createElement("VIDEO");
                media.setAttribute("id",`${panel_display}`);
                media.setAttribute("style","display: none;");
                media.setAttribute("type","video/mp4");
                media.setAttribute("loop", "");
                media.setAttribute("autoplay", "");
                media.setAttribute("muted", "");
                media.setAttribute("crossorigin", "anonymous");
                media.setAttribute("src", `./src/data/${panelID}.mp4`);
                document.body.appendChild(media);
            } else{
                media = document.createElement("IMG");
                media.setAttribute("id",`${panel_display}`);
                media.setAttribute("style","display: none;");
                media.setAttribute("src", `./src/data/${panelID}.jpg`);
                document.body.appendChild(media);
            }
        }
    }
};
