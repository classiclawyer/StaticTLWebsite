import { products } from "../content/products.js";
import {
  catalogLabels,
  jewelryOptions,
  picturedColor,
  picturedGold,
  productPageCopy,
} from "../content/catalog.js";
import { lang } from "../core/language.js";
import { photoLabels } from "../content/site.js";
import { readWishlist } from "../features/wishlist.js";

function choiceGroup(name, label, options, id, selected) {
  return `<fieldset class="diamond-choice">
    <legend>${label}</legend>
    <div class="stone-options">
      ${options.map(([value, title]) => `<label class="stone-choice"><input type="radio" name="${name}-${id}" value="${value}" ${value === selected ? "checked" : ""}><span>${title}</span></label>`).join("")}
    </div>
  </fieldset>`;
}
function productPrice(spec) {
  const t = catalogLabels[lang];
  if (!spec.price) return t.request;
  const amount = new Intl.NumberFormat(lang === "ko" ? "ko-KR" : "en-IE", {
    style: "currency", currency: spec.currency, maximumFractionDigits: spec.currency === "KRW" ? 0 : 2,
  }).format(spec.price);
  return `${t.starts} ${amount}${spec.currency === "USD" ? (lang === "ko" ? " · 임시 USD 가격" : " · Temporary USD price") : ""}`;
}
function wishlistHeart(n) {
  const wished = readWishlist().includes(n);
  const title = lang === "ko" ? (wished ? "위시리스트에서 삭제" : "위시리스트에 담기") : (wished ? "Remove from wishlist" : "Add to wishlist");
  return `<button type="button" class="wishlist-heart${wished ? " is-saved" : ""}" data-wish="${n}" aria-pressed="${wished}" aria-label="${title}" title="${title}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>`;
}
function catalogDetails(spec, id) {
  const o = jewelryOptions[lang];
  return `<div class="catalog-details">
    <section class="product-specifications"><h3>${lang === "ko" ? "제품 사양" : "Specifications"}</h3>${collectionCardSpecs(spec)}</section>
    <div class="jewelry-choices">
      ${choiceGroup("diamond-origin", o.origin, [["lab-grown", o.lab], ["natural", o.natural]], id, "lab-grown")}
      <p class="natural-premium" id="natural-premium-${id}" hidden>${lang === "ko" ? "천연 다이아몬드는 추가 비용이 발생합니다. 정확한 가격은 문의해 주세요." : "Natural diamonds incur an additional cost. Please inquire for an individual quote."}</p>
    </div>
    <p class="catalog-price">${productPrice(spec)}</p>
  </div>`;
}
function productRecord(n) {
  const product = products.find((item) => item.id === n);
  if (!product) return null;
  const language = lang === "ko" ? "kr" : "en";
  const currency = lang === "ko" ? "KRW" : "EUR";
  const price = product[lang === "ko" ? "krw" : "euro"];
  const spec = { price: price || product["temporary-usd"], currency: price ? currency : "USD", gold: product["gold-purity"] };
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
    photo = piece.image;
  return `<article class="signature-card">
    <a class="product-card-image-link" href="#piece-${n}" aria-label="${q.view}: ${piece.name}"
      ><div class="signature-main">
        <img src="${photo}" alt="${piece.name}, ${photoLabels[lang]}" loading="lazy" /></div
    ></a>
    <h3><a href="#piece-${n}">${piece.name}</a></h3>
    <div class="meta">${piece.type}</div>
    <p>${piece.description}</p>
    <div class="product-price-row"><p class="catalog-price">${productPrice(piece.spec)}</p>${wishlistHeart(n)}</div>
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
