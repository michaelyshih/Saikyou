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
                let panelID = this.type + i + j;
                // let prevKey = panelID + i + (j-1);
                const spread = 75
                // console.log(panelID)
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
