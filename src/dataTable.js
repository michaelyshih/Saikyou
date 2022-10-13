import DataString from "./datastring";

export default class DataTable{
    constructor(){
        const datastring = new DataString();
        this.datastring = datastring.data;
    }
    addData(data_id){
        const currData = this.datastring[data_id]
        const zoomedContent = document.getElementsByClassName("zoomed-content")[0];
        if (currData.mat_type === "vid"){
            const content = document.createElement("IFRAME");
            content.setAttribute("id",`${data_id}`);
            content.setAttribute("width","800");
            content.setAttribute("height","500");
            content.setAttribute("src",`${currData.mat_url}`);
            content.setAttribute("frameborder","0");
            content.setAttribute("allow","accelerometer; preload; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
            zoomedContent.appendChild(content);
        } else if (data_id[0] === "a" || data_id[0] === "s"){
            const largelink = document.createElement("A");
            largelink.setAttribute("href",`${currData.url}`);
            largelink.setAttribute("target", "_blank");
            zoomedContent.appendChild(largelink);
            const content = document.createElement("IMG");
            content.setAttribute("id",`${data_id}`);
            content.setAttribute("width","800");
            content.setAttribute("height","500");
            content.setAttribute("src",`${currData.mat_url}`);
            largelink.appendChild(content);
        } else {
            const largelink = document.createElement("A");
            largelink.setAttribute("href",`${currData.url}`);
            largelink.setAttribute("target", "_blank");
            zoomedContent.appendChild(largelink);
            const content = document.createElement("IMG");
            content.setAttribute("id",`${data_id}`);
            content.setAttribute("width","350");
            content.setAttribute("height","500");
            content.setAttribute("src",`${currData.mat_url}`);
            largelink.appendChild(content);
        }

        const zoomedDesc = document.getElementsByClassName("zoomed-description")[0];
        const title = document.createElement("H2");
        title.innerHTML = `Title: ${currData.title}`
        zoomedDesc.appendChild(title);
        const link = document.createElement("A");
        link.setAttribute("href",`${currData.url}`);
        link.setAttribute("target", "_blank");
        zoomedDesc.appendChild(link);
        const linkImg = document.createElement("IMG");
        linkImg.setAttribute("width","50");
        linkImg.setAttribute("height","50");
        if (data_id[0] === "a") linkImg.setAttribute("src","https://image.myanimelist.net/ui/OK6W_koKDTOqqqLDbIoPAiC8a86sHufn_jOI-JGtoCQ");
        if (data_id[0] === "m") linkImg.setAttribute("src","https://mangadex.org/_nuxt/ddb5721c5458b5edc9d6782a5f107119.svg");
        if (data_id[0] === "s") linkImg.setAttribute("src","data/youtube.png");
        link.appendChild(linkImg)
        const description = document.createElement("H2");
        description.innerHTML = "Description:"
        const descP = document.createElement("p");
        descP.innerHTML = `${currData.details}`
        zoomedDesc.appendChild(description);
        zoomedDesc.appendChild(descP);
    }

    addPanelsData(type){
        for (let i = 18; i <= 22;i++){
            for (let j = 1; j <= 3; j++){
                const panel_ID = type + i + j;
                const currData = this.datastring[panel_ID];
                if (currData.mat_type === "img"){
                    const imagePanel = document.createElement("IMG")
                    imagePanel.setAttribute("id",`${panel_ID}-display`)
                    imagePanel.setAttribute("style","display: none;")
                    imagePanel.setAttribute("src",`data/${panel_ID}.jpg`)
                    document.body.appendChild(imagePanel)
                } else {
                    const imagePanel = document.createElement("VIDEO")
                    imagePanel.setAttribute("id",`${panel_ID}-display`)
                    imagePanel.setAttribute("style","display: none;")
                    imagePanel.setAttribute("type","video/mp4")
                    imagePanel.setAttribute("loop","")
                    imagePanel.setAttribute("preload","")
                    imagePanel.setAttribute("muted","")
                    imagePanel.setAttribute("src",`data/${panel_ID}.mp4`)
                    document.body.appendChild(imagePanel)
                }
            }
        }
    }
}
