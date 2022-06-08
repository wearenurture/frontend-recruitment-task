const createSectionModule = (root, content) => {
  const component = document.createElement("section");
  const contentContainer = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");
  const header = document.createElement("h3");
  const paragraph = document.createElement("paragraph");

  let counter;

  if (sessionStorage.getItem("userCounter")) {
    counter = sessionStorage.getItem("userCounter");
  } else {
    counter = 0;
  }

  component.setAttribute("class", "component");
  contentContainer.setAttribute("class", "component-content");

  image.setAttribute("class", "component-image");
  image.setAttribute("src", content.image.src);
  image.setAttribute("alt", content.image.alt);

  header.setAttribute("class", "component-header");
  paragraph.setAttribute("class", "component-paragraph");
  button.setAttribute("class", "component-button");

  button.textContent = content.buttonContent;
  header.textContent = content.header;
  paragraph.textContent = content.paragraph;

  contentContainer.appendChild(header);
  contentContainer.appendChild(paragraph);
  contentContainer.appendChild(button);

  component.appendChild(image);
  component.appendChild(contentContainer);

  button.addEventListener("click", () => {
    sessionStorage.setItem("userCounter", ++counter);

    modal({
      headerContent: "Alert!",
      paragraphContent: `You have clicked <strong>${sessionStorage.getItem(
        "userCounter"
      )} times </strong>  to related button.`,
    });
  });

  root.appendChild(component);
};
