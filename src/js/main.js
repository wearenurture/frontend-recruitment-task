if(document.readyState !== 'loading') {
    TrackingClickOpenButton();
}
else {
    document.addEventListener('DOMContentLoaded', function () {
        TrackingClickOpenButton();
    });
}

function TrackingClickOpenButton(){
    const button = document.getElementById("sectionButton");
    button.addEventListener('click', Render);
}


function Render(){
    Count();

    let template = `<div class="backgroundPopup" id="backgroundPopup"></div><div class="popupModal"><div class="popupModal__popup"><button class="popupModal__popup--exit" id="exit"></button><h2 class="popupModal__popup--title">Alert!</h2><p class="popupModal__popup--text">You have clicked <span class="popupModal__popup--boldText">${sessionStorage.clickcount} times</span> to related button.</p>`;
    if (sessionStorage.clickcount>=5) {
        template+= '<button class="popupModal__popup--reset" id="reset">Reset</button>';
    }
    template+='</div></div>';
    document.getElementById("popup").innerHTML = template;

    const reset = document.getElementById("reset");
    if (reset!=null) {
        reset.addEventListener('click', Reset);
    }

    Exit();
}

function Exit(){
    const exit = document.getElementById("exit");
    const background = document.getElementById("backgroundPopup");
    if (exit!=null && background!=null) {
        exit.addEventListener('click', CloseTemplate);
        background.addEventListener('click', CloseTemplate);
    }
}

function CloseTemplate() {
        document.getElementById("popup").innerHTML ='';
}

function Count() {
    if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
    } else {
        sessionStorage.clickcount = 0;
    }
}
function Reset(){
    sessionStorage.clickcount = 0;
    CloseTemplate();
}






