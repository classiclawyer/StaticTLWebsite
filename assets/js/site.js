import { uiText } from "./content/ui.js";
import { locationRoute, validRoute } from "./core/urls.js";
import { setLanguage } from "./core/language.js";
import { render } from "./core/router.js";

document.getElementById("menu").onclick = () => {
  const n = document.getElementById("nav");
  n.classList.toggle("open");
  document.getElementById("menu").setAttribute("aria-expanded", n.classList.contains("open"));
};
window.addEventListener("hashchange", () => {
  if (location.hash === "#app") return;
  render();
  window.scrollTo(0, 0);
  document.getElementById("app").focus({ preventScroll: true });
});
window.addEventListener("popstate", () => {
  setLanguage(locationRoute(location).language || "en");
  render();
  window.scrollTo(0, 0);
  document.getElementById("app").focus({ preventScroll: true });
});
document.addEventListener("click", event => {
  const anchor = event.target.closest("a[href]");
  if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target || anchor.hasAttribute("download")) return;
  const url = new URL(anchor.href, location.href);
  if (url.origin !== location.origin || !/^\/(en|ko)\//.test(url.pathname)) return;
  const route = locationRoute(url);
  if (!validRoute(url.pathname.split("/")[2] || "home")) return;
  event.preventDefault();
  window.history.pushState(null, "", url.pathname + url.search);
  setLanguage(route.language);
  render();
  window.scrollTo(0, 0);
  document.getElementById("app").focus({ preventScroll: true });
});
document.querySelector(".skip-link").addEventListener("click", event => {
  event.preventDefault();
  document.getElementById("app").focus();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.getElementById("nav").classList.contains("open")) {
    document.getElementById("nav").classList.remove("open");
    document.getElementById("menu").setAttribute("aria-expanded", "false");
    document.getElementById("menu").focus();
  }
});
render();

// Persistent control shared by every route.
const backToTop = document.createElement("button");
backToTop.type = "button";
backToTop.className = "back-to-top";
backToTop.hidden = true;
backToTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4m-6 6 6-6 6 6"/></svg>';
document.body.append(backToTop);
function updateBackToTop() {
  backToTop.hidden = window.scrollY < 400;
  const label = uiText[document.documentElement.lang === "ko" ? "ko" : "en"].backToTop;
  backToTop.setAttribute("aria-label", label);
  backToTop.title = label;
}
backToTop.onclick = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
};
window.addEventListener("scroll", updateBackToTop, { passive: true });
new MutationObserver(updateBackToTop).observe(document.documentElement, {
  attributes: true, attributeFilter: ["lang"],
});
updateBackToTop();
