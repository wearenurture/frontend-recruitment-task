import { BaseComponent } from "./BaseComponent.js";
import { ModalWindow } from "./modal.js";

export const title = "Lorem ipsum";
export const content =
  "Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.";

export class StartPage {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.container = new BaseComponent(this.parentElement, "section", ["start"]);
    this.heroElement = new BaseComponent(this.container.element, "img", ["start_left"]);
    this.heroElement.element.src = "dist/images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg";
    this.contentElement = new BaseComponent(this.container.element, "div", ["start_content"]);
    this.contentTitle = new BaseComponent(this.contentElement.element, "h2", ["start_content-title"], "", `${title}`);
    this.contentText = new BaseComponent(this.contentElement.element, "p", ["start_content-text"], "", `${content}`);
    this.contentButton = new BaseComponent(
      this.contentElement.element,
      "button",
      ["start_content-button"],
      "",
      "Button"
    );
    this.contentButton.element.addEventListener("click", () => {
      this.count = Number(localStorage.getItem("counter")) + 1;
      this.onSetValueCounter(this.count);
      new ModalWindow(this.parentElement, this.count, this.onSetValueCounter);
    });
  }
  onSetValueCounter(value) {
    localStorage.setItem("counter", String(value));
  }
}
export default StartPage;
