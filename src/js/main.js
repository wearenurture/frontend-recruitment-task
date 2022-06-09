const elems = getElems();
let isOpen = false;
let timeClicked

function addEventBtn(){
    window.addEventListener('click',clickAnywhere);
    elems.btnContent.addEventListener('click',handleClick);
    elems.closeIco.addEventListener('click', handleClose);
    elems.restBtn.addEventListener('click', handleRest)
}

function handleClick(){
    countClick();
    elems.container.classList.add('is-open');  
    isOpen=true;
}

function handleClose(){
    console.log('git');
    elems.container.classList.remove('is-open');
    isOpen = false;
}

function clickAnywhere(e){
    if(e.target.classList.contains('popup-container')){
        handleClose();
    }
}

function countClick(){   
    timeClicked = localStorage.getItem('timeClicked');
    if(timeClicked == null){
        timeClicked = 1;
        elems.textCount.innerHTML = `${timeClicked} times`;
    }else{
        timeClicked++;
        console.log(timeClicked);
        if(timeClicked >= 5){
            elems.restBtn.classList.add('is-open');
            elems.textCount.innerHTML = `${timeClicked} times`;  
        }else{
            elems.textCount.innerHTML = `${timeClicked} times`;
        }
    }
    window.localStorage.setItem('timeClicked',timeClicked); 
}

function handleRest(){
    elems.restBtn.classList.remove('is-open');
    localStorage.removeItem('timeClicked');
    handleClose();
}

function getElems(){
    return(
        {
            btnContent: document.querySelector('.btn-cont'),
            container: document.querySelector('.popup-container'),
            closeIco: document.querySelector('.popup-close-ico'),
            restBtn: document.querySelector('.btn-popup-rest'),
            textCount: document.querySelector('.clicked-count'),
            popup: document.querySelector('.popup')
        }
    )
}

addEventBtn()