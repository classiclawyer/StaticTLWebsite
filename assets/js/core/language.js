import { readLocal, writeLocal } from "./storage.js";

let lang = readLocal("atelier-language") || "en";
if (!["en", "ko"].includes(lang)) lang = "en";
function setLanguage(value) {
  lang = value;
  writeLocal("atelier-language", lang);
}

export { lang, setLanguage };
