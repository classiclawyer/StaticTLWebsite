import { shareText } from "../content/sharing.js";
import { productRecord } from "../components/products.js";
import { sharePanel } from "../components/sharing.js";
import { labels } from "../content/site.js";

function wishlistPage(lang, items = []) {
  const t = shareText[lang];
  return `<section class="page-hero">
      <span class="eyebrow">Atelier Tamara de Launay</span>
      <h1>${t.wishlist}</h1>
      <p>${items.length ? t.hint : t.empty}</p>
    </section>
    <section class="container">
      ${
        items.length
          ? `<div class="wishlist-grid">${items
              .map((n) => {
                const product = productRecord(n, lang);
                return `<article class="wishlist-card"><a href="#piece-${n}"><img src="${product.image}" alt="${product.name}"></a><h2>${product.name}</h2><a class="button" href="#piece-${n}">${t.view}</a><button type="button" class="wish-button" data-wish="${n}" aria-pressed="true">♥ ${t.remove}</button></article>`;
              })
              .join("")}</div>${sharePanel("wishlist", undefined, lang)}`
          : `<div class="wishlist-empty"><p>${t.save}</p><a class="button fill" href="#collection">${labels[lang].collection} →</a></div>`
      }
    </section>`;
}

export { wishlistPage };
