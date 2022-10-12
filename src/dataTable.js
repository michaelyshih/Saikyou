import DataString from "./datastring";

export default class DataTable{
    constructor(){
        const datastring = new DataString();
        this.datastring = datastring.data;
        console.log(this.datastring)
    }
    addData(data_id){
        console.log(this.datastring)
        // console.log(this.datastring[data_id])
        // const zoomedContent = document.getElementsByClassName("zoomed-content")[0];
        // const content = document.createElement("iframe");
        // content.setAttribute("id",`${data_id}`);
        // content.setAttribute("width","800");
        // content.setAttribute("height","500");
        // content.setAttribute("src",`${this.datastring[data_id].mat_url}`);
        // content.setAttribute("frameborder","0");
        // content.setAttribute("allow","accelerometer; preload; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        // zoomedContent.appendChild(content);
    }
}
