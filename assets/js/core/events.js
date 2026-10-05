import { handleShare } from "../features/sharing.js";
import { readWishlist, writeWishlist } from "../features/wishlist.js";
import { readLocal, writeLocal } from "./storage.js";
import { addCart, readCart, writeCart, cartVariant } from "../features/cart.js";
import { ringIds } from "../content/catalog.js";
import { setLanguage, lang } from "./language.js";
import { cartText } from "../content/cart.js";
import { productRecord } from "../components/products.js";
import { submitInquiry } from "../features/inquiry.js";
import { copy } from "../content/site.js";

// Reattach handlers after the router replaces page markup.
function bindPageEvents({ route, pieceNumber, sharedParams, render }) {
  document.querySelectorAll("[data-share]").forEach((b) => (b.onclick = () => handleShare(b)));
  document.querySelectorAll("[data-wish]").forEach(
    (b) =>
      (b.onclick = () => {
        const n = Number(b.dataset.wish),
          items = readWishlist();
        const checkout = document.querySelector(".checkout-button")?.cloneNode(true);
        writeWishlist(items.includes(n) ? items.filter((x) => x !== n) : [...items, n]);
        render();
        if (checkout) document.querySelector("[data-add-to-cart]")?.replaceWith(checkout);
        const heart = document.querySelector(`.wishlist-heart[data-wish="${n}"]`);
        if (heart) {
          heart.classList.add("wish-clicked");
          heart.focus({ preventScroll: true });
        }
      }),
  );
  document
    .querySelectorAll("[data-size-guide]")
    .forEach((b) => (b.onclick = () => document.getElementById("ring-size-dialog")?.showModal()));
  document
    .querySelectorAll("[data-close-size-guide]")
    .forEach((b) => (b.onclick = () => b.closest("dialog").close()));
  if (pieceNumber) {
    const n = Number(pieceNumber[1]),
      key = `atelier-piece-${n}`,
      names = ["diamond-origin", "diamond-color", "gold-color"];
    try {
      const saved = JSON.parse(readLocal(key) || "null");
      if (sharedParams.has("o")) {
        const shared = {
          ["diamond-origin"]: sharedParams.get("o"),
          ["diamond-color"]: sharedParams.get("c"),
          ["gold-color"]: sharedParams.get("g"),
          size: sharedParams.get("s"),
        };
        for (const name of names) {
          const el = document.querySelector(
            `input[name=\"${name}-detail-${n}\"][value=\"${shared[name]}\"]`,
          );
          if (el) el.checked = true;
        }
        const size = document.getElementById(`ring-size-${n}`);
        if (size && shared.size && Array.from(size.options).some((o) => o.value === shared.size))
          size.value = shared.size;
        const premium = document.getElementById(`natural-premium-detail-${n}`);
        if (premium) premium.hidden = shared["diamond-origin"] !== "natural";
      } else if (saved) {
        for (const name of names) {
          const el = document.querySelector(
            `input[name="${name}-detail-${n}"][value="${saved[name]}"]`,
          );
          if (el) el.checked = true;
        }
        const size = document.getElementById(`ring-size-${n}`);
        if (
          size &&
          saved.size &&
          Array.from(size.options).some((o) => o.value === String(saved.size))
        )
          size.value = String(saved.size);
        const premium = document.getElementById(`natural-premium-detail-${n}`);
        if (premium) premium.hidden = saved["diamond-origin"] !== "natural";
      }
    } catch (_) {}
    const save = () => {
      const data = {};
      for (const name of names)
        data[name] = document.querySelector(`input[name="${name}-detail-${n}"]:checked`)?.value;
      data.size = document.getElementById(`ring-size-${n}`)?.value;
      try {
        writeLocal(key, JSON.stringify(data));
      } catch (_) {}
    };
    document
      .querySelectorAll(".product-detail input[type=radio],.product-detail select[id^=ring-size]")
      .forEach((el) => el.addEventListener("change", save));
  }
  document
    .querySelectorAll("[data-add-to-cart]")
    .forEach((b) => (b.onclick = () => addCart(Number(b.dataset.piece), b.dataset.addToCart)));
  document.querySelectorAll("[data-remove-cart]").forEach(
    (b) =>
      (b.onclick = () => {
        const items = readCart();
        items.splice(Number(b.dataset.removeCart), 1);
        writeCart(items);
        render();
      }),
  );
  document.querySelectorAll('input[name^="diamond-origin-detail-"]').forEach(
    (r) =>
      (r.onchange = () => {
        const box = document.getElementById(
          "natural-premium-" + r.name.slice("diamond-origin-".length),
        );
        if (box) box.hidden = r.value !== "natural";
        if (document.querySelector(".checkout-button")) render();
      }),
  );
  document.querySelectorAll("[data-inquire-piece]").forEach(
    (a) =>
      (a.onclick = () => {
        const n = Number(a.dataset.inquirePiece),
          id = `detail-${n}`;
        const inquiry = { n, time: Date.now() };
        for (const key of ["diamond-origin", "diamond-color", "gold-color"])
          inquiry[key] = document.querySelector(`input[name="${key}-${id}"]:checked`)?.value || "";
        if (ringIds.has(n))
          inquiry["ring-size"] = document.getElementById(`ring-size-${n}`)?.value || "consult";
        try {
          sessionStorage.setItem("atelier-inquiry", JSON.stringify(inquiry));
        } catch (_) {}
      }),
  );
  document.querySelectorAll("[data-lang]").forEach(
    (b) =>
      (b.onclick = () => {
        setLanguage(b.dataset.lang);
        render();
      }),
  );
  let cartForm = document.getElementById("cart-request");
  if (cartForm)
    cartForm.onsubmit = (e) => {
      e.preventDefault();
      const t = cartText[lang],
        items = readCart();
      const selection = items
        .map(
          (item, i) =>
            `${i + 1}. ${productRecord(item.n).name} × ${item.qty} — ${cartVariant(item)}`,
        )
        .join("\n");
      submitInquiry(
        cartForm,
        document.getElementById("cart-response"),
        { pending: t.pending, sent: t.sent, error: t.error },
        { selection },
      );
    };
  let form = document.getElementById("request");
  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      submitInquiry(form, document.getElementById("response"), {
        pending: lang === "ko" ? "문의를 보내고 있습니다…" : "Sending your inquiry…",
        sent: copy[lang].success,
        error:
          lang === "ko"
            ? "문의를 보내지 못했습니다. 다시 시도하시거나 인스타그램으로 연락해 주세요."
            : "We could not send your inquiry. Please try again, or contact us on Instagram.",
      });
    };
  if (route === "home") {
    const sections = document.querySelectorAll(".home-reveal");
    if (
      "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      sections.forEach((el) => observer.observe(el));
    } else sections.forEach((el) => el.classList.add("is-visible"));
  }
}

export { bindPageEvents };

