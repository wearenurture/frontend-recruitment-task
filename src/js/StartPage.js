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
      this.count = Number(localStorage.getItem("counter"))+1;
      this.onSetValueCounter(this.count);
      new ModalWindow(this.parentElement, this.count, this.onSetValueCounter);
    });
  }
  onSetValueCounter(value) {
      console.log(value)
    value === 5 ? (value = 0) : value;
    localStorage.setItem("counter", String(value));
  }
}
export default StartPage;
