import * as THREE from 'three';
import Panel from "./panel.js";

export default class Timeline{

    constructor(type,pos){
        this.pos = pos;
        this.type =type
        this.panels = {};
    }

    addPanels(scene){
        const pos = this.pos;
        for (let i = 18; i < 23; i++){

            for (let j= 1; j <= 3; j++){
                let key = this.type + i + j;
                // let prevKey = key + i + (j-1);
                const spread = 75
                // console.log(key)
                if (j === 1){
                    this.panels[key] = new Panel("#3561F2", ...pos);
                    this.panels[key].mesh.position.x += spread ;
                    this.panels[key].mesh.userData.id = `${key}`;
                    scene.add( this.panels[key].mesh ); // adding item to a scene
                }
                if (j === 2){
                    this.panels[key] = new Panel("red", ...pos);
                    this.panels[key].mesh.position.x -= spread ;
                    this.panels[key].mesh.userData.id = `${key}`;
                    scene.add( this.panels[key].mesh ); // adding item to a scene
                }
                if (j === 3){
                    this.panels[key] = new Panel("purple", ...pos);
                    this.panels[key].mesh.position.y += spread ;
                    this.panels[key].mesh.userData.id = `${key}`;
                    scene.add( this.panels[key].mesh ); // adding item to a scene
                }

            }
            pos[2] += 500; // adding the distance between each year
        }
    }

    animate(){
        let that = this
        Object.keys(this.panels).forEach(panel=>{
            that.panels[panel].animate();
        })
    }
}
