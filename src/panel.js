import * as THREE from 'three';

export default class Panel{

    constructor(color){
        this.planeGeo = new THREE.BoxGeometry( 2, 2, 0 );// assigning geometry (width, length, height)
        this.cubeMat = new THREE.MeshBasicMaterial( { color: color } );// assigning material to geometry
        this.mesh = new THREE.Mesh( this.planeGeo, this.cubeMat ); // takes in geometry and material to make the item
    }

    animate(renderer, scene, camera) {
        this.animate.bind(this);
        window.requestAnimationFrame(this.animate); // loop every time the scene is refreshed => 60 fps

        this.mesh.rotation.x += 0.01; // rotation in speed per second
        this.mesh.rotation.y += 0.01;

        renderer.render(scene, camera)
    };

};
