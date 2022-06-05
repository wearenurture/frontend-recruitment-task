class BaseComponent{constructor(t=null,e="div",n=[],o,s="",i=""){this.parentNode=t,this.element=document.createElement(e),this.element.classList.add(...n),this.element.innerHTML=""+s,this.element.id=i,t&&this.create()}create(){this.parentNode.appendChild(this.element)}setContent(t){this.element.innerHTMl=""+t}destroy(){this.element.remove()}}import{BaseComponent}from"./BaseComponent.js";import{ModalWindow}from"./modal.js";const title="Lorem ipsum";class StartPage{constructor(t){this.parentElement=t,this.container=new BaseComponent(this.parentElement,"section",["start"]),this.heroElement=new BaseComponent(this.container.element,"img"),this.contentElement=new BaseComponent(this.container.element,"div",["start_content"]),this.contentTitle=new BaseComponent(this.contentElement.element,"h2",["start_content-title"],"",""+title),this.contentText=new BaseComponent(this.contentElement.element,"p",["start_content-text"],"",""+title),this.contentButton=new BaseComponent(this.contentElement.element,"button",["start_content-button"],"","button"),this.contentButton.element.addEventListener("click",()=>{this.count=Number(localStorage.getItem("counter"))+1,this.onSetValueCounter(this.count),new ModalWindow(this.parentElement,this.count,this.onSetValueCounter)})}onSetValueCounter(t){console.log(t),5===t&&(t=0),localStorage.setItem("counter",String(t))}}export default StartPage;import StartPage from"./StartPage.js";window.onload=()=>{var t=document.getElementById("app");if(!t)throw Error("App root element");new StartPage(t)};import{BaseComponent}from"./BaseComponent.js";class ModalWindow extends BaseComponent{constructor(t,e,n){super(t,"div",["cover"],""),this.parentElement=t,this.onSetValueCounter=n,this.clickCount=e??0,this.init(),this.element.onclick=()=>{this.element.classList.contains("popup")||(this.destroy(),this.popup.destroy())},this.buttonClose.element.onclick=()=>{this.destroy(),this.popup.destroy()},this.btnReset.element.onclick=()=>{this.resetHandler()},4<this.clickCount&&(this.btnReset.element.classList.remove("disabled"),this.btnReset.element.removeAttribute("disabled"))}init(){this.strContent=`You have clicked ${this.clickCount} times to related button.`,this.popup=new BaseComponent(this.parentElement,"div",["popup","hidden"],"",'<h2 class="popup_title">Alert<h2>'),this.popupContent=new BaseComponent(this.popup.element,"div",["popup_content"],"",this.strContent),this.buttonClose=new BaseComponent(this.popup.element,"button",["popup_content-close"],"","<img >"),this.btnReset=new BaseComponent(this.popup.element,"button",["popup_content-reset","disabled"],"","Reset"),this.btnReset.element.setAttribute("disabled",!1)}resetHandler(){this.onSetValueCounter(0),this.strContent="You have clicked 0 times to related button.",this.popupContent.element.innerHTML=this.strContent,this.btnReset.element.setAttribute("disabled",!1),this.btnReset.element.classList.add("disabled")}}export{BaseComponent,title,ModalWindow};