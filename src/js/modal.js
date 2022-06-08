const modal = ({ headerContent, paragraphContent }) => {
  const modal = document.createElement("section");
  const dialog = document.createElement("dialog");
  const button = document.createElement("button");

  const header = document.createElement("h2");
  const paragraph = document.createElement("p");

  button.textContent = "X";
  header.textContent = headerContent;
  paragraph.textContent = paragraphContent;

  modal.appendChild(dialog);

  button.setAttribute("data-variant", "close-modal");
  modal.setAttribute("class", "modal-background");
  modal.setAttribute("data-variant", "close-modal");

  dialog.setAttribute("class", "modal");

  dialog.appendChild(header);
  dialog.appendChild(paragraph);
  dialog.appendChild(button);

  modal.addEventListener("click", function (e) {
    const { variant } = e.target.dataset;

    if (variant == "close-modal") {
      this.remove();
    }
  });

  document.body.appendChild(modal);
};
