import * as THREE from 'three';


export default class Panel{

    constructor(type,panel_id,posX,posY,posZ){
        this.panel_display = panel_id + "-display"
        // have video as texture
        let setMedia = document.getElementById( this.panel_display );
        this.texture;
        this.type = type;
        // if (this.type === "s"){
        //     setMedia = document.getElementById("background-loop")
        // }
        if (setMedia.tagName === "VIDEO"){
            // setMedia.play();
            this.texture = new THREE.VideoTexture(setMedia);
        } else {
            this.texture = new THREE.Texture(setMedia);
        }
        this.texture.needsUpdate = true;
        if (this.type !== "m"){
            this.panelGeo = new THREE.BoxGeometry( 80, 50, 0 );// assigning geometry (width, length, height)
        }else {
            this.panelGeo = new THREE.BoxGeometry( 35, 50, 0 );// assigning geometry (width, length, height)
        }
        this.panelMat = new THREE.MeshBasicMaterial( { color: "white", map:this.texture} );// assigning material to geometry
        this.panelMat.needsUpdate = true;
        this.mesh = new THREE.Mesh( this.panelGeo, this.panelMat); // takes in geometry and material to make the item
        this.mesh.position.set(posX,posY,posZ);
        this.mesh.userData.clickable = true;
        this.mesh.userData.id = panel_id;
        this.mesh.userData.playing = false;
        if (setMedia.tagName === "VIDEO"){
            this.mesh.userData.playable = true;
        } else {
            this.mesh.userData.playable = false;
        }

    }

    animate() {
        // this.mesh.rotation.x += 0.01; // rotation in speed per second
        this.mesh.rotation.y += 0.01;
    };

};
