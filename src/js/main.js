import {createSection} from "./module.js";

const title = "Lorem ipsum";
const text = "Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required."

const module = createSection("module", title, text, "alternatywny tekst", "tytuł obrazka");

document.body.appendChild(module);
