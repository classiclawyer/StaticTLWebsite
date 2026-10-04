import { writeWishlist, readWishlist } from "../features/wishlist.js";
import { decodeShare } from "../features/sharing.js";
import { MAX_CART_ENTRIES, writeCart, readCart } from "../features/cart.js";
import { copy, labels } from "../content/site.js";
import { lang } from "./language.js";
import { productRecord } from "../components/products.js";
import { homePage } from "../pages/home.js";
import { storyPage } from "../pages/story.js";
import { collectionPage } from "../pages/collection.js";
import { wishlistPage } from "../pages/wishlist.js";
import { cartPage } from "../pages/cart.js";
import { productDetail } from "../pages/product.js";
import { stonePage } from "../pages/stones.js";
import { bespokePage } from "../pages/bespoke.js";
import { contactPage } from "../pages/contact.js";
import { legalPage } from "../pages/legal.js";
import { bindPageEvents } from "./events.js";

const routes = ["home", "story", "collection", "bespoke", "stones", "contact", "wishlist", "cart"];
const menuRoutes = ["story", "collection", "bespoke", "stones", "contact"];
function render() {
  let [route, sharedQuery = ""] = (location.hash.slice(1) || "home").split("?");
  const sharedParams = new URLSearchParams(sharedQuery);
  if (
    route === "wishlist" &&
    sharedParams.has("items") &&
    window.__importedShareLink !== location.hash
  ) {
    window.__importedShareLink = location.hash;
    const imported = sharedParams
      .get("items")
      .split(",")
      .map(Number)
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= 9);
    writeWishlist([...new Set([...readWishlist(), ...imported])]);
    window.history?.replaceState(null, "", "#wishlist");
  }
  if (
    route === "cart" &&
    sharedParams.has("items") &&
    window.__importedShareLink !== location.hash
  ) {
    window.__importedShareLink = location.hash;
    const tuples = decodeShare(sharedParams.get("items"));
    if (Array.isArray(tuples)) {
      const imported = tuples
        .slice(0, MAX_CART_ENTRIES)
        .filter(Array.isArray)
        .map(([n, origin, color, gold, size, qty]) => ({ n, origin, color, gold, size, qty }));
      const valid = imported.filter(
        (x) =>
          Number.isInteger(x.n) &&
          x.n >= 1 &&
          x.n <= 9 &&
          ["natural", "lab-grown", "confirm"].includes(x.origin) &&
          ["white", "pink", "yellow", "blue", "other"].includes(x.color) &&
          ["white", "yellow", "rose", "pictured"].includes(x.gold) &&
          Number.isInteger(x.qty) &&
          x.qty > 0 &&
          x.qty <= 10,
      );
      writeCart([...readCart(), ...valid].slice(0, MAX_CART_ENTRIES));
      window.history?.replaceState(null, "", "#cart");
    }
  }
  if (route === "privacy" || route === "terms") route = "legal";
  if (route === "founders") route = "story";
  let pieceNumber = /^piece-([1-9])$/.exec(route);
  if (![...routes, "legal"].includes(route) && !pieceNumber) route = "home";
  let t = copy[lang],
    l = labels[lang];
  document.documentElement.lang = lang;
  document.title = `${pieceNumber ? productRecord(Number(pieceNumber[1])).name : l[route]} | Atelier Tamara de Launay`;
  document.getElementById("nav").innerHTML = menuRoutes
    .map(
      (r) =>
        `<a href="#${r}" class="${r === route ? "active" : ""}"
          >${l[r]}</a
        >`,
    )
    .join("");
  let langs = Object.keys(copy)
    .map(
      (x) =>
        `<button
          class="lang ${lang === x ? "active" : ""}"
          data-lang="${x}"
          aria-label="${{ en: "English", fr: "Français", ko: "한국어" }[x]}"
        >
          ${x.toUpperCase()}
        </button>`,
    )
    .join("");
  document.getElementById("languages").innerHTML = langs;
  const bagCount = readCart().reduce((count, item) => count + item.qty, 0);
  document.getElementById("header-actions").innerHTML = `
    <a class="header-icon" href="#wishlist" aria-label="${l.wishlist}" title="${l.wishlist}"${route === "wishlist" ? ' aria-current="page"' : ""}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>
      </svg>
    </a>
    <a class="header-icon" href="#cart" aria-label="${l.cart}" title="${l.cart}"${route === "cart" ? ' aria-current="page"' : ""}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 7h14l1 14H4L5 7Z"/>
        <path d="M9 9V6a3 3 0 0 1 6 0v3"/>
      </svg>
      <span class="bag-count" id="cart-count" aria-live="polite" aria-atomic="true">${bagCount || ""}</span>
    </a>`;
  document.getElementById("menu").setAttribute("aria-label", lang === "ko" ? "메뉴 열기" : "Open menu");
  document.getElementById("nav").setAttribute("aria-label", lang === "ko" ? "주 메뉴" : "Main navigation");

  document.getElementById("footlinks").innerHTML = `<a
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
  document.getElementById("year").textContent = new Date().getFullYear();
  let selectedInquiry = null;
  try {
    const candidate = JSON.parse(sessionStorage.getItem("atelier-inquiry") || "null");
    if (
      candidate &&
      Number.isInteger(candidate.n) &&
      candidate.n >= 1 &&
      candidate.n <= 9 &&
      Date.now() - candidate.time < 30 * 60 * 1000
    )
      selectedInquiry = candidate;
  } catch (_) {}
  let app = document.getElementById("app");
  if (route === "home") app.innerHTML = homePage();
  else if (route === "story") app.innerHTML = storyPage();
  else if (route === "collection") app.innerHTML = collectionPage();
  else if (route === "wishlist") app.innerHTML = wishlistPage();
  else if (route === "cart") app.innerHTML = cartPage();
  else if (pieceNumber) app.innerHTML = productDetail(productRecord(Number(pieceNumber[1])));
  else if (route === "stones") app.innerHTML = stonePage();
  else if (route === "bespoke") app.innerHTML = bespokePage();
  else if (route === "contact") app.innerHTML = contactPage(selectedInquiry);
  else app.innerHTML = legalPage();
  bindPageEvents({ route, pieceNumber, sharedParams, render });
  document.getElementById("nav").classList.remove("open");
  document.getElementById("menu").setAttribute("aria-expanded", "false");
}

export { render };
