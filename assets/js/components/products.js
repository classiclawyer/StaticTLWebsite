import { products } from "../content/products.js";
import {
  catalogLabels,
  jewelryOptions,
  picturedColor,
  picturedGold,
  productPageCopy,
  toneGroups,
} from "../content/catalog.js";
import { lang } from "../core/language.js";
import { photoLabels, editorialNote, labels } from "../content/site.js";
import { readWishlist } from "../features/wishlist.js";

function choiceGroup(name, label, options, id, selected) {
  return `<fieldset class="diamond-choice">
    <legend>${label}</legend>
    <div class="stone-options">
      ${options.map(([value, title]) => `<label class="stone-choice"><input type="radio" name="${name}-${id}" value="${value}" ${value === selected ? "checked" : ""}><span>${title}</span></label>`).join("")}
    </div>
  </fieldset>`;
}
function catalogDetails(spec, id) {
  const t = catalogLabels[lang],
    o = jewelryOptions[lang];
  const rows = [
    ["diamond", spec.total],
    ["center", spec.center],
    ["melee", spec.melee],
    ["pieces", spec.pieces],
    ["goldWeight", spec.goldWeight],
  ]
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `<li><span>${t[key]}</span><strong>${value}</strong></li>`)
    .join("");
  return `<div class="catalog-details">
    <p class="catalog-price">
      ${spec.price ? `${t.starts} USD ${spec.price.toLocaleString("en-US")}` : t.request}
    </p>
    <p class="catalog-metal">${spec.gold} ${t.gold}</p>
    ${rows ? `<ul>${rows}</ul>` : `<p class="spec-pending">${lang === "ko" ? "캐럿·골드 중량은 개별 문의 시 안내합니다." : "Carat and gold weights are confirmed on inquiry."}</p>`}
    <div class="jewelry-choices">
      ${choiceGroup(
        "diamond-origin",
        o.origin,
        [
          ["lab-grown", o.lab],
          ["natural", o.natural],
        ],
        id,
        "lab-grown",
      )}${choiceGroup("diamond-color", o.colors, o.diamond, id, picturedColor[Number(id.split("-")[1])])}${choiceGroup("gold-color", o.metals, [["pictured", lang === "ko" ? "사진 속 구성" : "As photographed"], ...o.gold], id, picturedGold[Number(id.split("-")[1])])}
      <p class="choice-hint">${o.hint}</p>
      <p class="natural-premium" id="natural-premium-${id}" hidden>
        ${lang === "ko" ? "천연 다이아몬드는 추가 비용이 발생합니다. 정확한 가격은 문의해 주세요." : "Natural diamonds incur an additional cost. Please inquire for an individual quote."}
      </p>
    </div>
  </div>`;
}
function productRecord(n) {
  const product = products.find((item) => item.id === n);
  if (!product) return null;
  const language = lang === "ko" ? "kr" : "en";
  const spec = { price: product.dollar, gold: product["gold-purity"] };
  for (const [key, field] of [["total", "stone"], ["goldWeight", "gold"], ["pieces", "count"], ["center", "center-stone"], ["melee", "melee-stone"]]) {
    if (product[field] !== "") spec[key] = product[field];
  }
  return {
    n: product.id,
    name: language === "kr" ? product["name-kr"] || product.name : product.name,
    image: product.image,
    type: product[`oneliner-${language}`],
    description: product[`description-${language}`],
    spec,
  };
}
function collectionCardSpecs(spec) {
  const t = catalogLabels[lang];
  const rows = [
    ["diamond", spec.total],
    ["center", spec.center],
    ["melee", spec.melee],
    ["pieces", spec.pieces],
    ["goldWeight", spec.goldWeight],
  ].filter(([, value]) => value !== undefined);
  return `<div class="card-specs">
    <div class="card-spec-row">
      <span>${lang === "ko" ? "골드 함량" : "Gold purity"}</span><strong>${spec.gold}</strong>
    </div>
    ${rows.length ? rows.map(([key, value]) => `<div class="card-spec-row"><span>${t[key]}</span><strong>${value}</strong></div>`).join("") : `<p class="card-spec-pending">${lang === "ko" ? "캐럿·골드 중량은 개별 문의 시 안내" : "Carat and gold weights confirmed on inquiry"}</p>`}
  </div>`;
}
function collectionCard(n) {
  const piece = productRecord(n),
    q = productPageCopy[lang],
    photo = piece.image,
    wished = readWishlist().includes(n);
  return `<article class="signature-card">
    <a class="product-card-image-link" href="#piece-${n}" aria-label="${q.view}: ${piece.name}"
      ><div class="signature-main">
        <img src="${photo}" alt="${piece.name}, ${photoLabels[lang]}" loading="lazy" /></div
    ></a>
    <p class="editorial-note">${editorialNote[lang]}</p>
    <h3><a href="#piece-${n}">${piece.name}</a></h3>
    <div class="meta">${piece.type}</div>
    <p>${piece.description}</p>
    ${collectionCardSpecs(piece.spec)}
    <p class="catalog-price">
      ${piece.spec.price ? `${catalogLabels[lang].starts} USD ${piece.spec.price.toLocaleString("en-US")}` : catalogLabels[lang].request}
    </p>
    <div class="signature-inquire">
      <a class="button" href="#piece-${n}">${q.view}</a
      ><button type="button" class="wish-button" data-wish="${n}" aria-pressed="${wished}">
        ${wished ? "♥" : "♡"} ${labels[lang].wishlist}
      </button>
    </div>
  </article>`;
}
function toneCards(tone) {
  return toneGroups[tone].map(collectionCard).join("");
}

export {
  choiceGroup,
  catalogDetails,
  productRecord,
  collectionCardSpecs,
  collectionCard,
  toneCards,
};
