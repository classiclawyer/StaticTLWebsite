import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await mkdir(output, { recursive: true });
await cp(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
// Render the existing page modules with empty visitor state; no customer data enters HTML.
globalThis.localStorage = { getItem: () => null, setItem() {} };
globalThis.sessionStorage = { getItem: () => null };
globalThis.location = new URL("https://tamarajewelry.vercel.app/en/");
globalThis.window = { matchMedia: () => ({ matches: true }), history: { replaceState() {} } };
globalThis.fetch = async url => ({ ok: true, json: async () => JSON.parse(await readFile(url, "utf8")) });
const elements = new Map();
const element = id => {
  if (!elements.has(id)) elements.set(id, { innerHTML: "", textContent: "", setAttribute() {}, classList: { remove() {} } });
  return elements.get(id);
};
globalThis.document = {
  documentElement: { lang: "en" },
  head: { querySelectorAll: () => [], insertAdjacentHTML() {} },
  querySelectorAll: () => [], querySelector: () => null,
  getElementById: id => ["nav", "menu", "app", "languages", "header-actions", "footlinks", "year"].includes(id) ? element(id) : null
};
const { render } = await import("../assets/js/core/router.js");
const { setLanguage } = await import("../assets/js/core/language.js");
const { routePath, routes } = await import("../assets/js/core/urls.js");
const { metadataHtml } = await import("../assets/js/core/metadata.js");
const { siteOrigin } = await import("../assets/js/content/seo.js");
const shell = await readFile(path.join(root, "index.html"), "utf8");
const pageRoutes = [...routes, ...Array.from({length:9}, (_,i) => `piece-${i+1}`)];
const publicRoutes = pageRoutes.filter(route => !["cart", "wishlist"].includes(route));
function links(html, language) {
  return html.replace(/href="#([a-z]+(?:-[1-9])?)(?:\?([^" ]*))?"/g, (match, route, query) => pageRoutes.includes(route) ? `data-route="${route}" href="${routePath(route, language)}${query ? "?" + query : ""}"` : match)
    .replace(/((?:src|href)=["'])assets\//g, "$1/assets/")
    .replace(/class="([^"]*\bhome-reveal\b[^"]*)"/g, 'class="$1 is-visible"');
}
for (const language of ["en", "ko"]) {
  setLanguage(language);
  for (const route of pageRoutes) {
    globalThis.location = new URL(routePath(route, language), siteOrigin);
    render();
    let html = shell.replace('<html lang="en">', `<html lang="${language}">`)
      .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "")
      .replace(/<title>[\s\S]*?<\/title>/, metadataHtml(route, language));
    for (const id of ["nav", "app", "languages", "header-actions", "footlinks"])
      html = html.replace(new RegExp(`(<(nav|main|div)[^>]*id="${id}"[^>]*>)([\\s\\S]*?)(<\\/\\2>)`), (_, open, tag, empty, close) => open + element(id).innerHTML + close);
    html = html.replace('<span id="year"></span>', `<span id="year">${element("year").textContent}</span>`);
    if (language === "ko") html = html.replace('aria-label="Main navigation"', 'aria-label="주 메뉴"').replace('aria-label="Open menu"', 'aria-label="메뉴 열기"');
    html = links(html, language);
    const folder = path.join(output, routePath(route, language));
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, "index.html"), html);
    if (language === "en" && route === "home") await writeFile(path.join(output,"index.html"), html);
  }
}
await writeFile(path.join(output,"sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["en","ko"].flatMap(language => publicRoutes.map(route => `  <url><loc>${siteOrigin + routePath(route,language)}</loc></url>`)).join("\n")}\n</urlset>\n`);
await writeFile(path.join(output,"robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
await writeFile(path.join(output,"404.html"), '<!doctype html><html lang="en"><meta charset="utf-8"><title>Page not found | Tamara de Launay</title><meta name="robots" content="noindex"><h1>Page not found</h1><p><a href="/en/">English homepage</a> · <a href="/ko/">한국어 홈페이지</a></p></html>');
console.log(`Built ${pageRoutes.length * 2} localized pages from existing content modules.`);
