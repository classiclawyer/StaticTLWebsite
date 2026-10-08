import { siteOrigin, pageDescriptions } from "../content/seo.js";
import { routePath } from "./urls.js";
import { labels, copy } from "../content/site.js";
import { productRecord } from "../components/products.js";
const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[c]));
function metadata(route, language) {
  const piece = /^piece-([1-9])$/.exec(route);
  const product = piece ? productRecord(Number(piece[1])) : null;
  const title = `${product ? product.name : route === "home" ? copy[language].heroTitle : labels[language][route]} | Tamara de Launay`;
  const description = product ? product.description || product.type : pageDescriptions[language][route];
  const url = siteOrigin + routePath(route, language);
  const image = siteOrigin + "/" + (product?.image || "assets/images/home/opening-collection.webp");
  const privatePage = ["cart", "wishlist"].includes(route);
  const organization = {"@type":"Organization", "@id":siteOrigin+"/#organization", name:"Tamara de Launay", url:siteOrigin, logo:siteOrigin+"/assets/images/brand/variants/full-logo/purple-transparent.svg", sameAs:["https://www.instagram.com/tamara_de_launay/"]};
  const webpage = {"@type":route === "collection" ? "CollectionPage" : route === "story" ? "AboutPage" : route === "contact" ? "ContactPage" : "WebPage", "@id":url+"#page", url, name:title, description, inLanguage:language, publisher:{"@id":organization["@id"]}};
  const graph = [organization, webpage];
  if (product) graph.push({"@type":"Product", "@id":url+"#product", name:product.name, description, image, sku:String(product.n), brand:{"@type":"Brand",name:"Tamara de Launay"}, url});
  return { title, description, url, image, privatePage, schema:{"@context":"https://schema.org", "@graph":graph} };
}
function metadataHtml(route, language) {
  const m = metadata(route, language);
  return `<title data-seo>${escape(m.title)}</title>
<meta data-seo name="description" content="${escape(m.description)}">
<meta data-seo name="robots" content="${m.privatePage ? "noindex,follow" : "index,follow"}">
<link data-seo rel="canonical" href="${m.url}">
${["en", "ko", "x-default"].map(l => `<link data-seo rel="alternate" hreflang="${l}" href="${siteOrigin + routePath(route, l === "x-default" ? "en" : l)}">`).join("\n")}
<meta data-seo property="og:type" content="website">
<meta data-seo property="og:site_name" content="Tamara de Launay">
<meta data-seo property="og:title" content="${escape(m.title)}">
<meta data-seo property="og:description" content="${escape(m.description)}">
<meta data-seo property="og:url" content="${m.url}">
<meta data-seo property="og:image" content="${m.image}">
<meta data-seo property="og:locale" content="${language === "ko" ? "ko_KR" : "en_US"}">
<meta data-seo name="twitter:card" content="summary_large_image">
<meta data-seo name="twitter:title" content="${escape(m.title)}">
<meta data-seo name="twitter:description" content="${escape(m.description)}">
<meta data-seo name="twitter:image" content="${m.image}">
<script data-seo type="application/ld+json">${JSON.stringify(m.schema).replace(/</g,"\\u003c")}</script>`;
}
function updateMetadata(route, language) {
  document.head.querySelectorAll("[data-seo], title, meta[name=description]").forEach(el => el.remove());
  document.head.insertAdjacentHTML("beforeend", metadataHtml(route, language));
}
export { metadata, metadataHtml, updateMetadata };
