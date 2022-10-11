import * as THREE from 'three';
import Panel from "./panel.js";
import { TimeMesh } from './timeMesh.js';

export default class Timeline{

    constructor(type,pos){
        this.pos = pos;
        this.type =type
        this.panels = {};
        this.years = {};
        this.times=[];
    }

    addObjects(scene){
        const pos = this.pos;

        for (let i = 18; i < 23; i++){
            const year = "20" + i;
            const yearPos = pos.slice(0);
            yearPos[1] = 50;
            yearPos[2] += 100;
            const yrCameraPosKey = "y" + year;
            this.years[yrCameraPosKey] = yearPos;

            for (let j= 1; j <= 3; j++){
                let panelID = this.type + i + j;
                const spread = 75;

                if (j === 1){
                    this.panels[panelID] = new Panel( panelID, ...pos);
                    this.panels[panelID].mesh.position.y += spread ;
                    scene.add( this.panels[panelID].mesh ); // adding item to a scene
                }

                if (j === 2){
                    this.panels[panelID] = new Panel(panelID, ...pos);
                    this.panels[panelID].mesh.position.x -= spread ;
                    scene.add( this.panels[panelID].mesh ); // adding item to a scene
                }

                if (j === 3){
                    this.panels[panelID] = new Panel(panelID, ...pos);
                    this.panels[panelID].mesh.position.x += spread ;
                    scene.add( this.panels[panelID].mesh ); // adding item to a scene
                }

            }
            // this.addTime(year,pos);
            // // console.log(this.timeMesh.mesh)
            // // scene.add(this.timeMesh.mesh);
            pos[2] += 500; // adding the distance between each year
        }
    }
    // addTime(year,pos){
    //     this.timeMesh = new TimeMesh(year,pos);
    // }

    animate(){
        let that = this
        Object.keys(this.panels).forEach(panel=>{
            that.panels[panel].animate();
        })
    }
}
