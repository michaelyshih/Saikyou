import * as THREE from 'three';

export default class Panel{

    constructor(panel_id,posX,posY,posZ){
        // have video as texture
        this.panel_display = panel_id + "-display"
        const media = document.getElementById( this.panel_display );
        let texture;

        const panelGeo = new THREE.BoxGeometry( 80, 50, 0 );// assigning geometry (width, length, height)
        const panelMat = new THREE.MeshBasicMaterial( { color: "white"} );// assigning material to geometry
        this.mesh = new THREE.Mesh( panelGeo, panelMat); // takes in geometry and material to make the item
        this.mesh.position.set(posX,posY,posZ);
        this.mesh.userData.clickable = true;
        this.mesh.userData.id = panel_id;
        let that = this;
        media.addEventListener("canplay", ()=>{
            if (media.tagName === "VIDEO"){
                texture = new THREE.VideoTexture(media);
                // media.play();
            } else {
                texture = new THREE.Texture(media);
            }
            const newMat = new THREE.MeshBasicMaterial( { color: "white", map: texture} );// assigning material to geometry
            that.mesh.material = newMat;
            media.play();
        })
        // normal panel

    }

    animate() {
        // this.mesh.rotation.x += 0.01; // rotation in speed per second
        this.mesh.rotation.y += 0.01;
    };

};
