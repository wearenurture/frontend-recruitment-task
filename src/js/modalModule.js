const modal = ({ headerContent, paragraphContent }) => {
  const modal = document.createElement("section");
  const dialog = document.createElement("dialog");
  const button = document.createElement("button");

  const header = document.createElement("h2");
  const paragraph = document.createElement("p");

  const userCounter = sessionStorage.getItem("userCounter");

  if (Number(userCounter) > 5) {
    const resetCounter = document.createElement("button");
    resetCounter.textContent = "Resetuj licznik";

    resetCounter.setAttribute("class", "reset-user-counter-btn");

    resetCounter.addEventListener("click", (e) => {
      sessionStorage.setItem("userCounter", 0);
      location.reload(true);
    });

    dialog.appendChild(resetCounter);
  }

  button.textContent = "X";
  header.textContent = headerContent;
  paragraph.innerHTML = paragraphContent;

  modal.appendChild(dialog);

  button.setAttribute("data-variant", "close-modal");
  modal.setAttribute("class", "modal-background");
  modal.setAttribute("data-variant", "close-modal");

  dialog.setAttribute("class", "modal");

  dialog.appendChild(header);
  dialog.appendChild(paragraph);
  dialog.appendChild(button);

  modal.addEventListener("click", (e) => {
    const { variant } = e.target.dataset;

    if (variant == "close-modal") {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
};
