import { routePath } from "../core/urls.js";
import { shareText } from "../content/sharing.js";
import { lang } from "../core/language.js";
import { readWishlist } from "./wishlist.js";
import { readCart, MAX_CART_ENTRIES } from "./cart.js";
import { productRecord } from "../components/products.js";
import { cartText } from "../content/cart.js";

function encodeShare(items) {
  return btoa(JSON.stringify(items)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodeShare(raw) {
  try {
    return JSON.parse(atob(raw.replace(/-/g, "+").replace(/_/g, "/")));
  } catch (_) {
    return null;
  }
}
function shareUrl(kind, n) {
  const base = location.origin;
  if (kind === "wishlist") return `${base}${routePath("wishlist", lang)}?items=${readWishlist().join(",")}`;
  if (kind === "cart") {
    const items = readCart()
      .slice(0, MAX_CART_ENTRIES)
      .map((x) => [x.n, x.origin, x.color, x.gold, x.size, x.qty]);
    return `${base}${routePath("cart", lang)}?items=${encodeShare(items)}`;
  }
  const id = `detail-${n}`,
    val = (key) => document.querySelector(`input[name="${key}-${id}"]:checked`)?.value;
  const params = new URLSearchParams({
    o: val("diamond-origin") || "lab-grown",
  });
  return `${base}${routePath(`piece-${n}`, lang)}?${params}`;
}
async function copyShare(url) {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (_) {
    return false;
  }
}
async function handleShare(button) {
  const panel = button.closest(".share-panel"),
    kind = panel.dataset.shareKind,
    n = Number(panel.dataset.sharePiece),
    url = shareUrl(kind, n),
    action = button.dataset.share,
    t = shareText[lang],
    name =
      kind === "piece"
        ? productRecord(n, lang).name
        : kind === "cart"
          ? cartText[lang].title
          : t.wishlist,
    message = `${name} — Atelier Tamara de Launay: ${url}`,
    status = panel.querySelector(".share-status");
  if (action === "email") {
    location.href = `mailto:?subject=${encodeURIComponent(lang === "ko" ? "이 주얼리 어때요?" : "A little jewelry hint")}&body=${encodeURIComponent(message)}`;
    return;
  }
  if (action === "copy") {
    status.textContent = (await copyShare(url)) ? t.copied : url;
    status.hidden = false;
    return;
  }
  if (navigator.share) {
    try {
      await navigator.share({ title: name, text: message, url });
      return;
    } catch (e) {
      if (e.name === "AbortError") return;
    }
  }
  const copied = await copyShare(url);
  status.textContent = copied ? t.choose : url;
  status.hidden = false;
  if (action === "kakao") window.open("https://talk.kakao.com/", "_blank", "noopener");
}

export { encodeShare, decodeShare, shareUrl, copyShare, handleShare };
