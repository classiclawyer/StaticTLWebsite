import { render } from "./core/router.js";

document.getElementById("menu").onclick = () => {
  const n = document.getElementById("nav");
  n.classList.toggle("open");
  document.getElementById("menu").setAttribute("aria-expanded", n.classList.contains("open"));
};
window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
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
  const label = document.documentElement.lang === "ko" ? "맨 위로" : "Back to top";
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
