import { labels, copy } from "../content/site.js";
import { routePath } from "../core/urls.js";

const menuRoutes = ["story", "collection", "bespoke", "stones", "contact"];
function renderNavigation(route, lang, { query: sharedQuery = "", bagCount = 0, wishlistCount = 0 } = {}) {
  const l = labels[lang];
  const nav = menuRoutes
    .map(
      (r) =>
        `<a href="#${r}" class="${r === route ? "active" : ""}" ${r === route ? 'aria-current="page"' : ""}
          >${l[r]}</a
        >`,
    )
    .join("");
  let langs = Object.keys(copy)
    .map(
      (x) =>
        `<a href="${routePath(route, x)}${sharedQuery ? `?${sharedQuery}` : ""}"
          class="lang ${lang === x ? "active" : ""}"
          data-lang="${x}" lang="${x}" ${lang === x ? 'aria-current="true"' : ""}
          aria-label="${{ en: "English", ko: "한국어" }[x]}"
        >
          ${x.toUpperCase()}
        </a>`,
    )
    .join("");
  
  
  
  const actions = `
    <a class="header-icon" href="#wishlist" aria-label="${l.wishlist}" title="${l.wishlist}"${route === "wishlist" ? ' aria-current="page"' : ""}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>
      </svg>
      <span class="bag-count" id="wishlist-count" aria-live="polite" aria-atomic="true">${wishlistCount || ""}</span>
    </a>
    <a class="header-icon" href="#cart" aria-label="${l.cart}" title="${l.cart}"${route === "cart" ? ' aria-current="page"' : ""}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 7h14l1 14H4L5 7Z"/>
        <path d="M9 9V6a3 3 0 0 1 6 0v3"/>
      </svg>
      <span class="bag-count" id="cart-count" aria-live="polite" aria-atomic="true">${bagCount || ""}</span>
    </a>`;



  const footlinks = `<a
      class="footer-instagram"
      aria-label="Instagram"
      title="Instagram"
      href="https://www.instagram.com/tamara_de_launay/"
      target="_blank"
      rel="noopener noreferrer"
      ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>
      </svg></a
    ><a href="#legal">${l.legal}</a>
    <div class="languages">${langs}</div>`;


  return { nav, langs, actions, footlinks, menuLabel: lang === "ko" ? "메뉴 열기" : "Open menu", navLabel: lang === "ko" ? "주 메뉴" : "Main navigation" };
}
export { renderNavigation };

