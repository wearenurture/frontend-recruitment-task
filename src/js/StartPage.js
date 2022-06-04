import { BaseComponent } from "./BaseComponent.js";
import { ModalWindow } from "./modal.js";
//import {imgHero} from "../../images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg"
export const title = "Lorem ipsum";

class StartPage {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.container = new BaseComponent(this.parentElement, "section", ["start"]);
    this.heroElement = new BaseComponent(this.container.element, "img");
    //this.heroElement.element.src = imgHero;
    this.contentElement = new BaseComponent(this.container.element, "div", ["start_content"]);
    this.contentTitle = new BaseComponent(this.contentElement.element, "h2", ["start_content-title"], "", `${title}`);
    this.contentText = new BaseComponent(this.contentElement.element, "p", ["start_content-text"], "", `${title}`);
    this.contentButton = new BaseComponent(
      this.contentElement.element,
      "button",
      ["start_content-button"],
      "",
      "button"
    );
    this.contentButton.element.addEventListener("click", () => {

      new ModalWindow(this.parentElement,this.getCurrentCount());
    });
  }
  getCurrentCount(){
      this.count = Number(localStorage.getItem('counter'));
      console.log(this.count)
      return 
  }
}
export default StartPage;
