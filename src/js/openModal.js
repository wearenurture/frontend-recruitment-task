const openModal = (modal) => {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}
const openModalButtons = document.querySelectorAll('[data-modal-target]')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})


