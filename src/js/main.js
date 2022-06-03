import StartPage from "./StartPage.js";

window.onload = () => {
  const appElement = document.getElementById("app");
  if (!appElement) throw Error("App root element");
  new StartPage(appElement);
};