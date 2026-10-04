import { shareText } from "../content/sharing.js";
import { lang } from "../core/language.js";
import { readWishlist } from "./wishlist.js";
import { readCart, MAX_CART_ENTRIES } from "./cart.js";
import { picturedColor, picturedGold, ringIds } from "../content/catalog.js";
import { productRecord } from "../components/products.js";
import { cartText } from "../content/cart.js";

function sharePanel(kind, n) {
  const t = shareText[lang];
  return `<div
    class="share-panel"
    data-share-kind="${kind}"
    ${n ? `data-share-piece="${n}"` : ""}
  >
    <h3>${kind === "cart" ? t.shareCart : kind === "wishlist" ? t.shareWish : t.title}</h3>
    ${kind === "wishlist" ? `<p>${t.hint}</p>` : ""}
    <div class="share-actions">
      <button type="button" data-share="native">${t.native}</button
      ><button type="button" data-share="copy">${t.copy}</button
      ><button type="button" data-share="email">${t.email}</button
      ><button type="button" data-share="whatsapp">${t.whatsapp}</button
      ><button type="button" data-share="facebook">${t.facebook}</button
      ><button type="button" data-share="messenger">${t.messenger}</button
      ><button type="button" data-share="kakao">${t.kakao}</button>
    </div>
    <p class="share-status" role="status" hidden></p>
  </div>`;
}
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
  const base = location.origin + location.pathname;
  if (kind === "wishlist") return `${base}#wishlist?items=${readWishlist().join(",")}`;
  if (kind === "cart") {
    const items = readCart()
      .slice(0, MAX_CART_ENTRIES)
      .map((x) => [x.n, x.origin, x.color, x.gold, x.size, x.qty]);
    return `${base}#cart?items=${encodeShare(items)}`;
  }
  const id = `detail-${n}`,
    val = (key) => document.querySelector(`input[name="${key}-${id}"]:checked`)?.value;
  const params = new URLSearchParams({
    o: val("diamond-origin") || "lab-grown",
    c: val("diamond-color") || picturedColor[n],
    g: val("gold-color") || picturedGold[n],
  });
  if (ringIds.has(n))
    params.set("s", document.getElementById(`ring-size-${n}`)?.value || "consult");
  return `${base}#piece-${n}?${params}`;
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
        ? productRecord(n).name
        : kind === "cart"
          ? cartText[lang].title
          : t.wishlist,
    message = `${name} — Atelier Tamara de Launay: ${url}`,
    status = panel.querySelector(".share-status");
  if (action === "email") {
    location.href = `mailto:?subject=${encodeURIComponent(lang === "ko" ? "이 주얼리 어때요?" : "A little jewelry hint")}&body=${encodeURIComponent(message)}`;
    return;
  }
  if (action === "whatsapp") {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
    return;
  }
  if (action === "facebook") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener",
    );
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
  if (action === "messenger") window.open("https://www.messenger.com/", "_blank", "noopener");
  if (action === "kakao") window.open("https://talk.kakao.com/", "_blank", "noopener");
}

export { sharePanel, encodeShare, decodeShare, shareUrl, copyShare, handleShare };
