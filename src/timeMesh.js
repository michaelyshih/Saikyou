import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const loader = new FontLoader(); // uess typeface.json generated fonts

export class TimeMesh{

    constructor (year,pos){
        loader.load( 'three/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
            const textGeo = new TextGeometry( year, {
                font: font,
                size: 50,
                height: 10,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });

            const textMat = new THREE.MeshBasicMaterial({color:"white"});

            console.log("textMat:",textMat)
            console.log("textGeo:",textGeo)
            that.mesh = new THREE.Mesh(textGeo,textMat);
            console.log(that.mesh)
        });

        // console.log(that.mesh, that)
    }
}
