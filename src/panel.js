import * as THREE from 'three';

export default class Panel{

    constructor(panel_id,posX,posY,posZ){
        // have video as texture
        this.panel_display = panel_id + "-display"

        // let media;
        // if (panel_id != "a191"){
        //     media = document.createElement("VIDEO");
        //     media.setAttribute("id",`${this.panel_display}`);
        //     media.setAttribute("style","display: none;");
        //     media.setAttribute("type","video/mp4");
        //     media.setAttribute("loop", "");
        //     media.setAttribute("autoplay", "");
        //     media.setAttribute("muted", "");
        //     media.setAttribute("crossorigin", "anonymous");
        //     media.setAttribute("src", `./src/data/${panel_id}.mp4`);
        //     document.body.appendChild(media);
        // } else{
        //     media = document.createElement("IMG");
        //     media.setAttribute("id",`${this.panel_display}`);
        //     media.setAttribute("style","display: none;");
        //     media.setAttribute("src", `./src/data/${panel_id}.jpg`);
        //     document.body.appendChild(media);
        // }
        const setMedia = document.getElementById( this.panel_display );
        let texture;
        // console.log(setMedia)
        if (setMedia.tagName === "VIDEO"){
            texture = new THREE.VideoTexture(setMedia);
        } else {
            texture = new THREE.Texture(setMedia);
        }
        const panelGeo = new THREE.BoxGeometry( 80, 50, 0 );// assigning geometry (width, length, height)
        const panelMat = new THREE.MeshBasicMaterial( { color: "white", map:texture} );// assigning material to geometry
        this.mesh = new THREE.Mesh( panelGeo, panelMat); // takes in geometry and material to make the item
        this.mesh.position.set(posX,posY,posZ);
        this.mesh.userData.clickable = true;
        this.mesh.userData.id = panel_id;

        setMedia.addEventListener("canplay", ()=>{
            // setMedia.play();
        })
    }

    animate() {
        // this.mesh.rotation.x += 0.01; // rotation in speed per second
        this.mesh.rotation.y += 0.01;
    };

};
