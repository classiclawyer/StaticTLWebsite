import { cartText } from "../content/cart.js";
import { lang } from "../core/language.js";
import { readCart, cartVariant } from "../features/cart.js";
import { productRecord, productPrice } from "../components/products.js";
import { sharePanel } from "../features/sharing.js";

function cartPage() {
  const t = cartText[lang],
    items = readCart();
  return `<section class="page-hero">
      <span class="eyebrow">Atelier Tamara de Launay</span>
      <h1>${t.title}</h1>
      <p>${t.lead}</p>
    </section>
    <section class="container cart-page">
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
            <div><h3><a href="#piece-${item.n}">${product.name}</a></h3><p>${cartVariant(item)}</p>
            <p>${item.origin === "natural" ? t.quote : productPrice(product.spec)}</p>
            <div class="cart-item-actions"><span>× ${item.qty}</span><button type="button" data-remove-cart="${i}">${t.remove}</button></div></div>
          </article>`;
            })
            .join("")}
          <p class="notice">${t.notFinal}</p>
          ${sharePanel("cart")}
        </div>
        <div class="cart-checkout">
          <h2>${t.inquiryTitle}</h2>
          <p class="inquiry-disclaimer">${t.notOrder}</p>
          <label for="cart-name">${t.name}</label><input id="cart-name" name="name" required autocomplete="name">
          <label for="cart-email">${t.email}</label><input id="cart-email" name="email" type="email" required autocomplete="email">
          <label for="cart-message">${t.messageLabel}</label><textarea id="cart-message" name="message" rows="5" placeholder="${t.messagePlaceholder}"></textarea>
          <input type="hidden" name="inquiry_type" value="Cart inquiry">
          <div class="form-honeypot" aria-hidden="true"><label for="cart-gotcha">Leave this blank</label><input id="cart-gotcha" name="_gotcha" tabindex="-1" autocomplete="off"></div>
          <button class="button fill" type="submit">${t.send}</button>
          <p id="cart-response" class="success" role="status" aria-live="polite" hidden></p>
        </div>
      </form>
      <p class="alternate-contact">${t.instagram} <a href="https://www.instagram.com/atelier_tamara_de_launay/" target="_blank" rel="noopener noreferrer">@atelier_tamara_de_launay ↗</a></p>
    `
          : `<div class="cart-empty"><p>${t.empty}</p><a class="button fill" href="#collection">${t.browse}</a></div>`
      }
    </section>`;
}

export { cartPage };
