const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

const openModal = (modal) => {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

const closeModal = (modal) => {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
const refreshPage = () => {
    window.location.reload();
    localStorage.clear()
}

const clickCounter = () => {
    if (parseInt(localStorage.getItem("clickcount")) >= 1 && localStorage.getItem("clickcount") < 5) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
        console.log("pik")
    } else if (parseInt(localStorage.getItem("clickcount")) >= 5) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
        document.querySelector(".reset").classList.add("reset__acive");
        console.log("pik1");
    } else {
        localStorage.clickcount = 1;
    }
    document.querySelector(".display").innerHTML = localStorage.clickcount;
}
document.querySelector(".reset").addEventListener('click', refreshPage);
document.querySelector(".clicker").addEventListener("click", clickCounter)