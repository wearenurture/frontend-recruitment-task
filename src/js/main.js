const button = document.querySelector('button')
const popup = document.querySelector('.hide_popup')
const textCnt = document.querySelector('.counter_text')
const addButtonCounter = document.querySelector('.counter_hide')
let counter =  0


button.addEventListener("click", buttonRemove)
button.addEventListener("click", counterAdd)
popup.addEventListener("click", buttonAdd)
addButtonCounter.addEventListener("click", removeCounter)

function buttonRemove() {
    popup.classList.remove('hide_popup')
}

function buttonAdd() {
    popup.classList.add('hide_popup')
}
function removeCounter(){
    counter = ''
    addButtonCounter.classList.add('counter_hide')
}

function counterAdd() {
    counter++
    let text = textCnt.innerHTML = `You have clicked ${counter} times to related button.`
    if (counter >= 5){
        addButtonCounter.classList.remove('counter_hide')
    }
}



