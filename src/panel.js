import * as THREE from 'three';

export default class Panel{

    constructor(color,posX,posY,posZ){
        this.panelGeo = new THREE.BoxGeometry( 80, 50, 0 );// assigning geometry (width, length, height)
        this.panelMat = new THREE.MeshBasicMaterial( { color: color, side:THREE.DoubleSide} );// assigning material to geometry
        this.mesh = new THREE.Mesh( this.panelGeo, this.panelMat); // takes in geometry and material to make the item
        this.mesh.position.set(posX,posY,posZ);
        this.mesh.userData.clickable = true;
    }

    animate() {
        // this.mesh.rotation.x += 0.01; // rotation in speed per second
        this.mesh.rotation.y += 0.01;
    };

};
