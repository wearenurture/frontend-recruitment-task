let countResult =0;
const button = document.getElementById("sectionButton");
button.addEventListener('click', Render)
function Render(){
countResult+=1;
let html = `<div class="popupBackground"><div class="popupBackground__popup"><div class="popupBackground__popup--exit" id="exit"></div><h2 class="popupBackground__popup--title">Alert!</h2><p class="popupBackground__popup--text">You have clicked <span class="popupBackground__popup--boldText">${countResult} times</span> to related button.</p></div></div>`;
document.getElementById("popup").innerHTML = html;
const exit = document.getElementById("exit");
exit.addEventListener('click',()=>{document.getElementById("popup").innerHTML ='';})
}