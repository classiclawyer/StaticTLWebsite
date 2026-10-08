import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const routes = ["", "story/", "collection/", "bespoke/", "stones/", "contact/", "legal/", ...Array.from({length:9}, (_,i) => `piece-${i+1}/`)];
for (const language of ["en", "ko"]) {
  for (const route of routes) {
    const html = await readFile(new URL(`../dist/${language}/${route}index.html`,import.meta.url),"utf8");
    assert.ok(html.includes(`<html lang="${language}">`));
    assert.match(html, /<main id="app">\s*<(section|article)/);
    assert.ok(!html.includes('href="#'));
    assert.ok(!html.includes('src="assets/'));
    assert.ok(html.includes(`rel="canonical" href="https://tamarajewelry.vercel.app/${language}/${route}"`));
    for (const alternate of ["en", "ko", "x-default"]) assert.ok(html.includes(`hreflang="${alternate}"`));
    assert.ok(html.includes('property="og:image"'));
    const schema = JSON.parse(html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema["@context"], "https://schema.org");
    if(route.startsWith("piece-")) assert.ok(schema["@graph"].some(item => item["@type"] === "Product"));
  }
  for(const route of ["cart", "wishlist"]) {
    const html = await readFile(new URL(`../dist/${language}/${route}/index.html`,import.meta.url),"utf8");
    assert.ok(html.includes('content="noindex,follow"'));
  }
}
const sitemap = await readFile(new URL("../dist/sitemap.xml",import.meta.url),"utf8");
assert.equal((sitemap.match(/<loc>/g)||[]).length,32);
assert.ok(!/\/fr\/|\/cart\/|\/wishlist\//.test(sitemap));
console.log("PASS initial HTML, bilingual URLs, canonical/hreflang, social metadata, schema and sitemap");
