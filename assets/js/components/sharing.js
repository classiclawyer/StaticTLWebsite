import { shareText } from "../content/sharing.js";

function sharePanel(kind, n, lang = "en") {
  const t = shareText[lang];
  return `<div
    class="share-panel"
    data-share-kind="${kind}"
    ${n ? `data-share-piece="${n}"` : ""}
  >
    ${kind !== "wishlist" ? "" : `<h3>${kind === "cart" ? t.shareCart : t.shareWish}</h3>`}
    ${kind === "wishlist" ? `<p>${t.hint}</p>` : ""}
    <div class="share-actions">
      <button type="button" data-share="native">${t.native}</button
      ><button type="button" data-share="copy">${t.copy}</button
      ><button type="button" data-share="email">${t.email}</button
      ><button type="button" data-share="kakao">${t.kakao}</button>
    </div>
    <p class="share-status" role="status" hidden></p>
  </div>`;
}

export { sharePanel };
