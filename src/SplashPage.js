export default class SplashPage{

    constructor(){
        const loadingPage = document.getElementById("loading-page");
        this.loadingPage= loadingPage;
    }

    addFinishedPage(){
        // this.loadingPage.innerHTML = "";
        // const newLoadinPage = document.createElement()
        const enterButton = document.getElementById("enter-button")
        const loadingPicture = document.getElementById("loading-picture")
        const loadingImages = document.getElementById("loading-images")
        const loadingText = document.getElementById("loading-text")
        loadingText.innerHTML = "Saikyou"
        loadingPicture.setAttribute("src","https://i.gifer.com/2iFa.gif")
        loadingImages.appendChild(loadingPicture)
        enterButton.innerHTML = "Welcome"
        // debugger
        enterButton.addEventListener("click", event=>{
            this.removeFinishedPage();
        })

    }

    removeFinishedPage(){
        //removing the finishing page from parent node
        this.loadingPage.parentNode.removeChild(this.loadingPage);
    }

    addImages(){

    }
}
