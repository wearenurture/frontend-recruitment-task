import { BaseComponent } from "./BaseComponent.js";
//import {imgHero} from "../../images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg"

class StartPage {
    constructor(parentElement){
        console.log(parentElement)
        this.parentElement = parentElement;
        this.container = new BaseComponent(this.parentElement, 'section',['start']);
        this.heroElement = new BaseComponent(this.container.element,'img');
        //this.heroElement.element.src = imgHero;
    }
}
export default StartPage;