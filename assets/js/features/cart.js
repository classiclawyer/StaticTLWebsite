import { readLocal, writeLocal } from "../core/storage.js";
import {
  ringIds,
  jewelryOptions,
  ringCopy,
  picturedColor,
  picturedGold,
} from "../content/catalog.js";
import { lang } from "../core/language.js";
import { cartText } from "../content/cart.js";

const MAX_CART_ENTRIES = 30;
function readCart() {
  try {
    const items = JSON.parse(readLocal("atelier-cart") || "[]");
    return Array.isArray(items)
      ? items
          .filter(
            (x) =>
              Number.isInteger(x.n) &&
              x.n >= 1 &&
              x.n <= 9 &&
              ["natural", "lab-grown", "confirm"].includes(x.origin) &&
              ["white", "pink", "yellow", "blue", "other"].includes(x.color) &&
              ["white", "yellow", "rose", "pictured"].includes(x.gold) &&
              Number.isInteger(x.qty) &&
              x.qty > 0 &&
              x.qty <= 10 &&
              (!ringIds.has(x.n) ||
                x.size === undefined ||
                x.size === "consult" ||
                (Number.isInteger(x.size) && x.size >= 44 && x.size <= 72)),
          )
          .slice(0, MAX_CART_ENTRIES)
      : [];
  } catch (_) {
    return [];
  }
}
function writeCart(items) {
  const saved = items.slice(0, MAX_CART_ENTRIES);
  writeLocal("atelier-cart", JSON.stringify(saved));
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = saved.reduce((n, x) => n + x.qty, 0) || "";
}
function cartVariant(item) {
  const o = jewelryOptions[lang],
    t = cartText[lang];
  const color = o.diamond.find(([k]) => k === item.color)?.[1] || item.color;
  const gold =
    item.gold === "pictured" ? t.pictured : o.gold.find(([k]) => k === item.gold)?.[1] || item.gold;
  const origin =
    item.origin === "confirm" ? t.confirm : item.origin === "natural" ? o.natural : o.lab;
  return `${origin} · ${color} · ${gold}${ringIds.has(item.n) ? ` · ${ringCopy[lang].variant}: ${Number.isInteger(item.size) ? item.size + " mm" : ringCopy[lang].unsure}` : ""}`;
}
function addCart(n, mode) {
  const id = `detail-${n}`;
  const checked = (key) => document.querySelector(`input[name="${key}-${id}"]:checked`)?.value;
  const item = {
    n,
    origin: checked("diamond-origin") || "lab-grown",
    color: checked("diamond-color") || picturedColor[n],
    gold: checked("gold-color") || picturedGold[n],
    size: ringIds.has(n)
      ? Number(document.getElementById(`ring-size-${n}`)?.value) || "consult"
      : null,
    qty: 1,
  };
  const items = readCart(),
    same = items.find(
      (x) =>
        x.n === item.n &&
        x.origin === item.origin &&
        x.color === item.color &&
        x.gold === item.gold &&
        x.size === item.size,
    );
  if (same) same.qty = Math.min(10, same.qty + 1);
  else if (items.length >= MAX_CART_ENTRIES) {
    const feedback = document.getElementById("cart-feedback");
    feedback.textContent =
      lang === "ko"
        ? "장바구니에는 최대 30개의 구성을 담을 수 있습니다. 다른 구성을 추가하려면 하나를 삭제해 주세요."
        : "Your cart can hold up to 30 selections. Remove one before adding another.";
    feedback.hidden = false;
    return;
  } else items.push(item);
  writeCart(items);
  const bagIcon = document.querySelector('#header-actions a[href="#cart"]');
  if (bagIcon) {
    bagIcon.classList.remove("bag-icon-added");
    void bagIcon.offsetWidth;
    bagIcon.classList.add("bag-icon-added");
    bagIcon.addEventListener("animationend", () => bagIcon.classList.remove("bag-icon-added"), { once: true });
  }
  const feedback = document.getElementById("cart-feedback");
  const button = document.querySelector(`[data-add-to-cart][data-piece="${n}"]`);
  if (button) {
    button.disabled = true;
    button.classList.add("bag-added");
    const checkout = document.createElement("a");
    checkout.href = "#cart";
    checkout.className = "button fill checkout-button";
    checkout.textContent = lang === "ko" ? "체크아웃" : "Check out";
    setTimeout(() => {
      if (!button.isConnected) return;
      const focused = document.activeElement === button;
      button.replaceWith(checkout);
      if (focused) checkout.focus();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280);
  }
  feedback.textContent = lang === "ko" ? "쇼핑백에 담았습니다." : "Added to the bag.";
  feedback.classList.add("visually-hidden");
  feedback.hidden = false;
}

export { MAX_CART_ENTRIES, readCart, writeCart, cartVariant, addCart };
