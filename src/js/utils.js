const refreshPage = () => {
    window.location.reload();
    localStorage.clear()
}
document.querySelector(".reset").addEventListener('click', refreshPage);