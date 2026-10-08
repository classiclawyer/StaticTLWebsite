import { signatures, catalogLabels } from "../content/catalog.js";
import { collectionCard } from "../components/products.js";

const collectionOrder = [9, 8, 4, 7, 1, 2, 3, 5, 6];

function collectionPage(lang, wishlist = []) {
  return `<section class="container signature-section">
      <div class="signature-intro">
        <span class="eyebrow collection-eyebrow">Made-to-order fine jewelry</span>
        <h2>${signatures[lang].heading}</h2>
        ${signatures[lang].lead.split("\n\n").map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
      <div class="signature-grid">${collectionOrder.map((id) => collectionCard(id, lang, wishlist)).join("")}</div>
      <p class="catalog-fineprint">${catalogLabels[lang].note}</p>
    </section>`;
}

export { collectionPage };
