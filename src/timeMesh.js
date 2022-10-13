import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const loader = new FontLoader(); // uess typeface.json generated fonts

export default class TimeMesh{

    constructor (scene,year,x,y,z){
        let textGeo, textMat ,textMesh;
        loader.load( './node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
            textGeo = new TextGeometry( year, {
                font: font,
                size: 10,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                // bevelOffset: 0,
                // bevelSegments: 5
            });

            textMat = new THREE.MeshPhongMaterial({color:"blue"});
            console.log(textGeo, textMat)
            textMesh = new THREE.Mesh(textGeo,textMat);
            // console.log(pos)
            textMesh.position.set(x-15,y,z-1);
            scene.add(textMesh);
        });


    }
}
