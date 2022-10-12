import * as THREE from 'three';
import Timeline from './timeline.js';

export default class Viewer3D{
    constructor(){
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0x404040)) // add soft white light to scene
        // let background = document.getElementsByClassName("background");
        let background = document.getElementById("background-loop");
        background.play();
        this.scene.background = new THREE.VideoTexture(background) // sets the scene's background color
        // this.scene.background = new THREE.Color("#95DFFC") // sets the scene's background color
        this.timelines = {
        "a": this.timelineA = new Timeline("a",[0,0,0]),
        "m": this.timelineM = new Timeline("m",[1000,0,0]),
        "s": this.timelineS = new Timeline("s",[-1000,0,0])
        };
        this.currentTimeline = this.timelines["a"];
        this.currentTimelineTag = document.getElementById("anime");
        this.currentTimelineTag.setAttribute("style","animation: glow .8s infinite alternate;");
    }

    switchTimeline(type){
        const typeInit = type[0];
        const prevKey = Object.keys(this.timelines).find(key=> this.timelines[key] === this.currentTimeline)
        this.prevTimeline = this.timelines[prevKey];
        this.currentTimelineTag.setAttribute("style","animation:none;")
        this.currentTimeline = this.timelines[typeInit];
        this.currentTimelineTag = document.getElementById( type );
        this.currentTimelineTag.setAttribute("style","animation: glow .8s infinite alternate;");

    }

    populate(){
        this.timelineA.addObjects(this.scene);
        this.timelineM.addObjects(this.scene);
        this.timelineS.addObjects(this.scene);
        this.addFloor();
    }
    animate(){
        Object.keys(this.timelines).forEach(timeline=>{
            this.timelines[timeline].animate();
        })
    }
    addFloor(){
        // floor copy!!!!!!!!!!!!!!!!!!!!!!
        const pos = {x:0, y:-100, z:1000}
        const scale = {x:3000,y:50,z:3000}
        const planeGeo = new THREE.BoxGeometry();
        const planeMat = new THREE.MeshBasicMaterial({color: "black", transparent:true, opacity:0.2 });
        this.plane = {};
        this.plane.mesh= new THREE.Mesh(planeGeo, planeMat);
        this.plane.mesh.position.set(pos.x, pos.y, pos.z);
        this.plane.mesh.scale.set(scale.x, scale.y,scale.z);
        // this.plane.mesh.castShadow = true;
        // this.plane.mesh.receiveShadow = true;
        this.scene.add(this.plane.mesh); // even though i'm adding the mesh into the obj, the actual object inside isn't a instance variable
        this.plane.mesh.userData.clickable = false;
        this.plane.mesh.userData.id = "floor";
    }
}
