import { cartText } from "../content/cart.js";
import { lang } from "../core/language.js";
import { readCart } from "../features/cart.js";
import { productRecord, productPrice } from "../components/products.js";
import { sharePanel } from "../features/sharing.js";
import { ringSizing, ringSizeDialog } from "../components/ring-sizing.js";
import { ringIds, jewelryOptions } from "../content/catalog.js";

function cartPage() {
  const t = cartText[lang],
    items = readCart();
  return `<section class="container cart-page">
      ${
        items.length
          ? `
      <form id="cart-request" class="cart-layout cart-inquiry-form" action="https://formspree.io/f/mdekydbn" method="POST" autocomplete="on">
        <div class="cart-items">
          <h2>${t.selectionTitle}</h2>
          ${items
            .map((item, i) => {
              const product = productRecord(item.n);
              return `<article class="cart-item">
            <a href="#piece-${item.n}"><img src="${product.image}" alt="${product.name}"></a>
            <div><h3><a href="#piece-${item.n}">${product.name}</a></h3><p>${item.origin === "natural" ? jewelryOptions[lang].natural : item.origin === "lab-grown" ? jewelryOptions[lang].lab : t.confirm} ${lang === "ko" ? "다이아몬드" : "diamonds"}</p>
            <p>${productPrice(product.spec, item.origin)}</p>
            ${ringSizing(item.n, i, item.size ?? "consult", false)}
            <div class="cart-item-actions"><span>× ${item.qty}</span><button type="button" data-remove-cart="${i}">${t.remove}</button></div></div>
          </article>`;
            })
            .join("")}
          <p class="notice">${t.notFinal}</p>
          ${sharePanel("cart")}
        </div>
        <div class="cart-checkout">
          <h2>${t.inquiryTitle}</h2>
          <label for="cart-name">${t.name}</label><input id="cart-name" name="name" required autocomplete="name">
          <label for="cart-email">${t.email}</label><input id="cart-email" name="email" type="email" required autocomplete="email">
          <label for="cart-phone">${t.phone}</label><input id="cart-phone" name="phone" type="tel" autocomplete="tel">
          <label for="cart-address">${t.shippingAddress}</label><textarea id="cart-address" name="shipping_address" rows="3" autocomplete="street-address"></textarea>
          <label for="cart-message">${t.messageLabel}</label><textarea id="cart-message" name="message" rows="5" placeholder="${t.messagePlaceholder}"></textarea>
          <input type="hidden" name="inquiry_type" value="Cart inquiry">
          <div class="form-honeypot" aria-hidden="true"><label for="cart-gotcha">Leave this blank</label><input id="cart-gotcha" name="_gotcha" tabindex="-1" autocomplete="off"></div>
          <button class="button fill" type="submit">${t.send}</button>
          <p id="cart-response" class="success" role="status" aria-live="polite" hidden></p>
        </div>
      </form>
      <p class="alternate-contact">${lang === "ko" ? "직접 연락하고 싶으신가요? 인스타그램에서 아뜰리에 타마라 드 로네에 DM을 보내셔도 좋습니다." : "Prefer to contact us directly? You can also DM l'Atelier Tamara de Launay on Instagram."} <a class="contact-instagram-link" href="https://www.instagram.com/tamara_de_launay/" target="_blank" rel="noopener noreferrer">@tamara_de_launay</a></p>
    `
          : `<div class="cart-empty"><p>${t.empty}</p><a class="button fill" href="#collection">${t.browse}</a></div>`
      }
    </section>${items.some(item => ringIds.has(item.n)) ? ringSizeDialog() : ""}`;
}

export { cartPage };
