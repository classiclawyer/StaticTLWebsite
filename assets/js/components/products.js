import { uiText } from "../content/ui.js";
import { products } from "../content/products.js";
import {
  catalogLabels,
  jewelryOptions,
  productPageCopy,
} from "../content/catalog.js";
import { photoLabels } from "../content/site.js";

function choiceGroup(name, label, options, id, selected) {
  return `<fieldset class="diamond-choice">
    <legend>${label}</legend>
    <div class="stone-options">
      ${options.map(([value, title]) => `<label class="stone-choice"><input type="radio" name="${name}-${id}" value="${value}" ${value === selected ? "checked" : ""}><span>${title}</span></label>`).join("")}
    </div>
  </fieldset>`;
}
function productPrice(spec, origin = "lab-grown", lang = "en") {
  const t = catalogLabels[lang];
  const price = origin === "natural" ? spec.naturalPrice : origin === "lab-grown" ? spec.price : "";
  if (price === "" || price === undefined || price === null) return t.request;
  const amount = new Intl.NumberFormat(lang === "ko" ? "ko-KR" : "en-IE", {
    style: "currency", currency: spec.currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price);
  return `${t.starts} ${amount}`;
}
function wishlistHeart(n, lang = "en", wishlist = []) {
  const wished = wishlist.includes(n);
  const title = wished ? uiText[lang].removeWish : uiText[lang].addWish;
  return `<button type="button" class="wishlist-heart${wished ? " is-saved" : ""}" data-wish="${n}" aria-pressed="${wished}" aria-label="${title}" title="${title}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>`;
}
function catalogDetails(spec, id, lang) {
  const o = jewelryOptions[lang];
  return `<div class="catalog-details">
    <section class="product-specifications"><h3>${uiText[lang].specifications}</h3>${collectionCardSpecs(spec, lang)}</section>
    <div class="jewelry-choices">
      ${choiceGroup("diamond-origin", o.origin, [["lab-grown", o.lab], ["natural", o.natural]], id, "lab-grown")}
    </div>
    <p class="catalog-price" id="product-price-${id}" aria-live="polite">${productPrice(spec, undefined, lang)}</p>
  </div>`;
}
function productRecord(n, lang = "en") {
  const product = products.find((item) => item.id === n);
  if (!product) return null;
  const korean = lang === "ko";
  const currency = lang === "ko" ? "KRW" : "EUR";
  const price = product[korean ? "Lab-krw" : "Lab-eur"];
  const naturalPrice = product[korean ? "Nat-krw" : "Nat-eur"];
  const spec = { price, naturalPrice, currency, gold: product["gold-purity"] };
  for (const [key, field] of [["goldWeight", "gold"], ["pieces", "melee-count"], ["center", "center-stone"], ["melee", "melee-stone"]]) {
    if (product[field] !== "" && product[field] !== undefined && product[field] !== null) {
      spec[key] = key === "pieces" ? product[field] : `${product[field]} ${key === "goldWeight" ? "g" : "ct"}`;
    }
  }
  return {
    n: product.id,
    name: korean ? product["name kr"] || product.Product : product.Product,
    image: product.image,
    type: product[korean ? "one liner kr" : "one liner"],
    description: product[korean ? "description kr" : "description"],
    spec,
  };
}
function collectionCardSpecs(spec, lang) {
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
      <span>${uiText[lang].goldPurity}</span><strong>${spec.gold}</strong>
    </div>
    ${rows.length ? rows.map(([key, value]) => `<div class="card-spec-row"><span>${t[key]}</span><strong>${value}</strong></div>`).join("") : `<p class="card-spec-pending">${uiText[lang].weightsPending}</p>`}
  </div>`;
}
function collectionCard(n, lang, wishlist = []) {
  const piece = productRecord(n, lang),
    q = productPageCopy[lang],
    photo = piece.image;
  return `<article class="signature-card">
    <a class="product-card-image-link" href="#piece-${n}" aria-label="${q.view}: ${piece.name}"
      ><div class="signature-main">
        <img src="${photo}" alt="${piece.name}, ${photoLabels[lang]}" loading="lazy" /></div
    ></a>
    <h3><a href="#piece-${n}">${piece.name}</a></h3>
    <div class="meta">${piece.type}</div>
    <p>${piece.description}</p>
    <div class="product-price-row"><p class="catalog-price">${productPrice(piece.spec, undefined, lang)}</p>${wishlistHeart(n, lang, wishlist)}</div>
    <div class="signature-inquire"><a class="button" href="#piece-${n}">${q.view}</a></div>
  </article>`;
}

export {
  choiceGroup,
  catalogDetails,
  productRecord,
  collectionCardSpecs,
  collectionCard,
  productPrice,
  wishlistHeart,
};
