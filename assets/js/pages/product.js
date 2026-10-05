import { productPageCopy } from "../content/catalog.js";
import { lang } from "../core/language.js";
import { photoLabels } from "../content/site.js";
import { catalogDetails } from "../components/products.js";
import { ringSizing } from "../components/ring-sizing.js";
import { readWishlist } from "../features/wishlist.js";
import { sharePanel } from "../features/sharing.js";

function productDetail(product) {
  const q = productPageCopy[lang],
    n = product.n;
  return `<section class="page-hero product-page-heading">
      <a class="return-link" href="#collection">← ${q.back}</a
      ><span class="eyebrow">Atelier Tamara de Launay</span>
      <h1>${product.name}</h1>
      <p>${product.type}</p>
    </section>
    <article class="container product-detail">
      <div class="product-detail-gallery">
        <figure class="product-detail-image">
          <img
            id="detail-main"
            src="${product.image}"
            alt="${product.name}, ${photoLabels[lang]}"
          />
        </figure>
        <p class="editorial-note">${q.note}</p>
      </div>
      <div class="product-detail-content">
        <span class="eyebrow">${q.details}</span>
        <h2>${product.name}</h2>
        <p class="product-detail-type">${product.type}</p>
        <p>${product.description}</p>
        ${catalogDetails(product.spec, `detail-${n}`)}${ringSizing(n)}
        <div class="product-purchase-actions">
          <button type="button" class="button fill" data-add-to-cart="selected" data-piece="${n}">
            ${lang === "ko" ? "선택한 옵션 장바구니 담기" : "Add selected options to cart"}
          </button>
        </div>
        <p class="cart-feedback" id="cart-feedback" role="status" hidden></p>
        <button
          type="button"
          class="wish-button"
          data-wish="${n}"
          aria-pressed="${readWishlist().includes(n)}"
        >
          ${readWishlist().includes(n) ? (lang === "ko" ? "♥ 위시리스트에 담김" : "♥ Saved to wishlist") : lang === "ko" ? "♡ 위시리스트에 담기" : "♡ Add to wishlist"}</button
        >${sharePanel("piece", n)}<a class="text-link" href="#contact" data-inquire-piece="${n}"
          >${q.discuss}</a
        >
      </div>
    </article>`;
}

export { productDetail };
