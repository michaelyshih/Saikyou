export default class SplashPage{

    constructor(){
        const loadingPage = document.getElementById("loading-page");
        this.loadingPage= loadingPage;
    }

    addFinishedPage(){
        // this.loadingPage.appendChild();
        this.loadingPage.parentNode.removeChild(this.loadingPage);
    }

    addImages(){
        
    }
}
