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
