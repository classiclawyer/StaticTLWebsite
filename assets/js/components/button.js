import { labels } from "../content/site.js";
import { lang } from "../core/language.js";

function button(route, key, filled = false) {
  return `<a class="button ${filled ? "fill" : ""}" href="#${route}"
    >${labels[lang][key]}</a
  >`;
}

export { button };
