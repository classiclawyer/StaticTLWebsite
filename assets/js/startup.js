// Keep the static navigation usable if an enhancement cannot load.
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
menu.onclick = () => {
  nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(nav.classList.contains("open")));
};
try {
  await import("./site.js");
  document.documentElement.dataset.enhanced = "true";
} catch (error) {
  const notice = document.createElement("p");
  notice.className = "container enhancement-error";
  notice.setAttribute("role", "status");
  notice.textContent = document.documentElement.lang === "ko"
    ? "일부 기능을 불러오지 못했습니다. 페이지를 새로고침해 주세요. 페이지 링크는 계속 이용할 수 있습니다."
    : "Some interactive features could not load. Please reload the page. Page links remain available.";
  document.getElementById("app").prepend(notice);
  console.error("Website enhancements could not load", error);
}
