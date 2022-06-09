const modal = ({ headerContent, paragraphContent }) => {
  const modal = document.createElement("section");
  const dialog = document.createElement("dialog");
  const button = document.createElement("button");

  const header = document.createElement("h2");
  const paragraph = document.createElement("p");

  const userCounter = sessionStorage.getItem("userCounter");

  dialog.appendChild(header);
  dialog.appendChild(paragraph);
  dialog.appendChild(button);

  if (Number(userCounter) > 5) {
    const resetCounter = document.createElement("button");

    resetCounter.setAttribute("class", "reset-user-counter-btn");
    resetCounter.textContent = "Resetuj licznik";

    resetCounter.addEventListener("click", () => {
      sessionStorage.setItem("userCounter", 0);
      location.reload(true);
    });

    dialog.appendChild(resetCounter);
  }

  button.textContent = "X";
  header.textContent = headerContent;
  paragraph.innerHTML = paragraphContent;

  button.setAttribute("class", "close-modal-button");
  button.setAttribute("data-variant", "close-modal");

  modal.setAttribute("class", "modal-background");
  modal.setAttribute("data-variant", "close-modal");

  dialog.setAttribute("class", "modal");

  modal.addEventListener("click", (e) => {
    const { variant } = e.target.dataset;

    if (variant == "close-modal") {
      modal.remove();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "Escape") {
      modal.remove();
    }
  });

  modal.appendChild(dialog);

  document.body.appendChild(modal);
};
