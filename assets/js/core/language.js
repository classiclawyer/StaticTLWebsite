import { readLocal, writeLocal } from "./storage.js";

const pathLanguage = globalThis.location?.pathname.split("/")[1];
let lang = ["en", "ko"].includes(pathLanguage) ? pathLanguage : readLocal("atelier-language") || "en";
if (!["en", "ko"].includes(lang)) lang = "en";
function setLanguage(value) {
  lang = value;
  writeLocal("atelier-language", lang);
}

export { lang, setLanguage };
