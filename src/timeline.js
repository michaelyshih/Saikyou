import * as THREE from 'three';
import Panel from "./panel.js";
import  TimeMesh  from './timeMesh.js';

export default class Timeline{

    constructor(type,pos){
        this.pos = pos;
        this.type =type
        this.panels = {};
        this.years = {};
        this.currentYear = "y2020";
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
                this.addPanels(panelID,j,pos,spread,scene);

            }
            this.addTime(scene,year,pos);
            // console.log(this.timeMesh.mesh.material)
            // scene.add(this.timeMesh.mesh);
            pos[2] += 500; // adding the distance between each year
            // console.log(scene)
        }
    }
    addTime(scene,year,pos){
        this.timeMesh = new TimeMesh(scene,year,...pos);
    }

    addPanels(panelID,j,pos,spread,scene){
        if (j === 1){
            this.panels[panelID] = new Panel( this.type,panelID, ...pos);
            this.panels[panelID].mesh.position.y += spread ;
            scene.add( this.panels[panelID].mesh ); // adding item to a scene
        }

        if (j === 2){
            this.panels[panelID] = new Panel(this.type,panelID, ...pos);
            this.panels[panelID].mesh.position.x -= spread ;
            scene.add( this.panels[panelID].mesh ); // adding item to a scene
        }

        if (j === 3){
            this.panels[panelID] = new Panel(this.type,panelID, ...pos);
            this.panels[panelID].mesh.position.x += spread ;
            scene.add( this.panels[panelID].mesh ); // adding item to a scene
        }
    }
    animate(){
        let that = this
        Object.keys(this.panels).forEach(panel=>{
            that.panels[panel].animate();
        })
    }
}
