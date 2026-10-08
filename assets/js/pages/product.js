import { uiText } from "../content/ui.js";
import { productPageCopy } from "../content/catalog.js";
import { photoLabels } from "../content/site.js";
import { catalogDetails, wishlistHeart } from "../components/products.js";
import { sharePanel } from "../components/sharing.js";

function productDetail(product, lang, wishlist = []) {
  const q = productPageCopy[lang],
    n = product.n;
  return `<article class="container product-detail">
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
        ${catalogDetails(product.spec, `detail-${n}`, lang)}
        <div class="product-purchase-actions">
          <button type="button" class="button fill" data-add-to-cart="selected" data-piece="${n}">
            ${uiText[lang].addBag}
          </button>
          <div class="product-wishlist-action"><span>${uiText[lang].wishlist}</span>${wishlistHeart(n, lang, wishlist)}</div>
        </div>
        <p class="cart-feedback" id="cart-feedback" role="status" hidden></p>
        ${sharePanel("piece", n, lang)}<a class="text-link" href="#contact" data-inquire-piece="${n}"
          >${q.discuss}</a
        >
      </div>
    </article>`;
}

export { productDetail };
