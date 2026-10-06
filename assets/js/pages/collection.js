import { lang } from "../core/language.js";
import { signatures, catalogLabels } from "../content/catalog.js";
import { collectionCard } from "../components/products.js";

import { products } from "../content/products.js";

function collectionPage() {
  return `<section class="container signature-section">
      <div class="signature-intro">
        <span class="eyebrow">Made-to-order fine jewelry</span>
        <h2>${signatures[lang].heading}</h2>
        <p>${signatures[lang].lead}</p>
      </div>
      <div class="signature-grid">${products.map((product) => collectionCard(product.id)).join("")}</div>
      <p class="catalog-fineprint">${catalogLabels[lang].note}</p>
    </section>`;
}

export { collectionPage };

