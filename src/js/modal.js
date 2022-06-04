import { BaseComponent } from "./BaseComponent.js";
//import * as CloseIcon from './images/close.png';

export const str = 'You have clicked X times to related button.'
export class ModalWindow extends BaseComponent {
  constructor(parentElement, clickCount) {
    super(parentElement, "div", ["cover"], "");
    this.parentElement = parentElement;
    this.clickCount = clickCount?? 0;
    this.popup = new BaseComponent(this.element, 'div', ['popup','hidden'],'','<h2 class="popup_title">Alert<h2>');
    this.popupContent = new BaseComponent(this.popup.element, 'div',['popup_content'],'', `You have clicked ${this.clickCount} times to related button.`)
    this.buttonClose = new BaseComponent(this.popup.element, 'button',['popup_close'],'',`<img >`);
    this.buttonClose.element.onclick = ()=>{
      this.destroy()
    }
  }

  onClose() {}
}
