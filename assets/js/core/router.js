import { locationRoute, routePath, rewriteLinks } from "./urls.js";
import { updateMetadata } from "./metadata.js";
import { renderPage } from "./render-page.js";
import { renderNavigation } from "../components/navigation.js";
import { importSharedSelections } from "../features/shared-selections.js";
import { readSelectedInquiry } from "../features/selected-inquiry.js";
import { readCart } from "../features/cart.js";
import { readWishlist } from "../features/wishlist.js";
import { uiText } from "../content/ui.js";
import { lang } from "./language.js";
import { bindPageEvents } from "./events.js";

function render() {
  const current = locationRoute(location);
  const sharedQuery = importSharedSelections(current.route, current.query);
  const wishlist = readWishlist(), cart = readCart();
  const navigation = renderNavigation(current.route, lang, {
    query: sharedQuery, wishlistCount: wishlist.length,
    bagCount: cart.reduce((count, item) => count + item.qty, 0)
  });
  document.documentElement.lang = lang;
  document.querySelector(".skip-link").textContent = uiText[lang].skipContent;
  document.querySelectorAll(".identity, .footer-identity").forEach(a => a.href = routePath("home", lang));
  for (const [id, markup] of Object.entries({ nav: navigation.nav, languages: navigation.langs, "header-actions": navigation.actions, footlinks: navigation.footlinks }))
    document.getElementById(id).innerHTML = markup;
  document.getElementById("menu").setAttribute("aria-label", navigation.menuLabel);
  document.getElementById("nav").setAttribute("aria-label", navigation.navLabel);
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("app").innerHTML = renderPage(current.route, {
    language: lang, wishlist, cart, selectedInquiry: readSelectedInquiry()
  });
  bindPageEvents({ route: current.route, pieceNumber: /^piece-([1-9])$/.exec(current.route), sharedParams: new URLSearchParams(sharedQuery), render });
  rewriteLinks(document, lang);
  updateMetadata(current.route, lang);
  if (location.hash || location.pathname === "/" || sharedQuery !== current.query)
    window.history.replaceState(null, "", routePath(current.route, lang) + (sharedQuery ? "?" + sharedQuery : ""));
  document.getElementById("nav").classList.remove("open");
  document.getElementById("menu").setAttribute("aria-expanded", "false");
}
export { render };
