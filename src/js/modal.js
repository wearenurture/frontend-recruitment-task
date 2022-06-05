import { BaseComponent } from "./BaseComponent.js";

export class ModalWindow extends BaseComponent {
  constructor(parentElement, clickCount, onSetValueCounter) {
    super(parentElement, "div", ["cover"], "");
    this.parentElement = parentElement;
    this.onSetValueCounter = onSetValueCounter;
    this.clickCount = clickCount ?? 0;
    this.init();

    this.element.onclick = () => {
      if (!this.element.classList.contains("popup")) {
        this.destroy();
        this.popup.destroy();
      }
    };
    this.buttonClose.element.onclick = () => {
      this.destroy();
      this.popup.destroy();
    };

    this.btnReset.element.onclick = () => {
      this.resetHandler();
    };

    if (this.clickCount > 4) {
      this.btnReset.element.classList.remove("disabled");
      this.btnReset.element.removeAttribute("disabled");
    }
  }

  init() {
    this.strContent = `You have clicked ${this.clickCount} times to related button.`;
    this.popup = new BaseComponent(this.parentElement, "div", ["popup", "hidden"]);
    this.buttonClose = new BaseComponent(this.popup.element, "span", ["popup_content-title"], "", "Alert!");
    this.popupContent = new BaseComponent(this.popup.element, "div", ["popup_content"], "", this.strContent);
    this.buttonClose = new BaseComponent(
      this.popup.element,
      "button",
      ["popup_content-close"],
      "",
      `<img src="dist/images/close.png">`
    );
    this.btnReset = new BaseComponent(this.popup.element, "button", ["popup_content-reset", "disabled"], "", "Reset");
    this.btnReset.element.setAttribute("disabled", false);
  }

  resetHandler() {
    this.onSetValueCounter(0);
    this.strContent = `You have clicked 0 times to related button.`;
    this.popupContent.element.innerHTML = this.strContent;
    this.btnReset.element.setAttribute("disabled", false);
    this.btnReset.element.classList.add("disabled");
  }
}
