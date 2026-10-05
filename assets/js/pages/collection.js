import { copy, labels } from "../content/site.js";
import { lang } from "../core/language.js";
import { signatures, catalogLabels } from "../content/catalog.js";
import { collectionCard } from "../components/products.js";

import { products } from "../content/products.js";

function collectionPage() {
  const t = copy[lang],
    l = labels[lang];
  return `<section class="page-hero">
      <h1>${l.collection}</h1>
      <p>${t.collectionLead}</p>
      <a class="stone-hero-link" href="#stones">${l.stones} ↗</a>
    </section>
    <section class="container signature-section">
      <div class="signature-intro">
        <span class="eyebrow">Atelier Tamara de Launay</span>
        <h2>${signatures[lang].heading}</h2>
        <p>${signatures[lang].lead}</p>
        <p class="catalog-fineprint">${catalogLabels[lang].note}</p>
      </div>
      <div class="signature-grid">${products.map((product) => collectionCard(product.id)).join("")}</div>
    </section>`;
}

export { collectionPage };
