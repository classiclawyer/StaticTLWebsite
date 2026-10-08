import { readLocal, writeLocal } from "../core/storage.js";
import { ringIds } from "../content/catalog.js";
import { lang } from "../core/language.js";
import { productRecord, productPrice } from "../components/products.js";

function bindProductEvents({ pieceNumber, sharedParams, render }) {
  if (pieceNumber) {
    const n = Number(pieceNumber[1]),
      key = `atelier-piece-${n}`,
      names = ["diamond-origin", "diamond-color", "gold-color"];
    const refreshPrice = () => {
      const price = document.getElementById(`product-price-detail-${n}`);
      const origin = document.querySelector(`input[name="diamond-origin-detail-${n}"]:checked`)?.value || "lab-grown";
      if (price) price.textContent = productPrice(productRecord(n, lang).spec, origin, lang);
    };
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
    refreshPrice();
    const save = () => {
      refreshPrice();
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

}

export { bindProductEvents };
