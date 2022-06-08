const modal = (children) => {
  const dialog = document.createElement("dialog");
};

const sectionModule = (root, content) => {
  const component = document.createElement("section");
  const contentContainer = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");
  const header = document.createElement("h1");
  const paragraph = document.createElement("paragraph");

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

  root.appendChild(component);
};

sectionModule(document.body, {
  buttonContent: "Button",
  header: "Lorem Ipsum",
  paragraph:
    "Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.",
  image: {
    src: "%PUBLIC_URL%/../images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_c_scale,w_1400.jpg",
    alt: "sectionImage",
  },
});
