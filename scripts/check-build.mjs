import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const routes = ["", "story/", "collection/", "bespoke/", "stones/", "contact/", "legal/", ...Array.from({length:9}, (_,i) => `piece-${i+1}/`)];
for (const language of ["en", "ko"]) {
  for (const route of routes) {
    const html = await readFile(new URL(`../dist/${language}/${route}index.html`,import.meta.url),"utf8");
    assert.ok(html.includes(`<html lang="${language}">`));
    assert.match(html, /<main id="app"[^>]*>\s*<(section|article)/);
    assert.ok(!html.replace('href="#app"','').includes('href="#'));
    assert.ok(!html.includes('src="assets/'));
    assert.ok(html.includes(`rel="canonical" href="https://tamaradelaunay.com/${language}/${route}"`));
    for (const alternate of ["en", "ko", "x-default"]) assert.ok(html.includes(`hreflang="${alternate}"`));
    assert.ok(html.includes(`property="og:url" content="https://tamaradelaunay.com/${language}/${route}"`));
    assert.ok(html.includes('property="og:image" content="https://tamaradelaunay.com/'));
    assert.ok(html.includes('name="twitter:image" content="https://tamaradelaunay.com/'));
    assert.doesNotMatch(html, /https:\/\/[^"\s<>]+\.vercel\.app/);
    if (route === "legal/") {
      assert.ok(html.includes("@tamara_de_launay"));
      assert.ok(!html.includes("@atelier_tamara_de_launay"));
    }
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
for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  assert.equal(new URL(url).origin, "https://tamaradelaunay.com");
}
const robots = await readFile(new URL("../dist/robots.txt",import.meta.url),"utf8");
assert.ok(robots.includes("Sitemap: https://tamaradelaunay.com/sitemap.xml"));
console.log("PASS initial HTML, bilingual URLs, canonical/hreflang, social metadata, schema and sitemap");
