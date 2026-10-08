import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "../assets/js/core/render-page.js";
import { routes, routePath } from "../assets/js/core/urls.js";

const root=fileURLToPath(new URL("../", import.meta.url));
const all=[...routes,...Array.from({length:9},(_,i)=>`piece-${i+1}`)];
assert.equal(typeof document,"undefined");
assert.equal(typeof localStorage,"undefined");
for (const language of ["en","ko"]) for (const route of all) {
  const html=await readFile(path.join(root,"dist",routePath(route,language),"index.html"),"utf8");
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${language}/${route}: one main heading`);
  assert.match(html,/class="skip-link"/);
  assert.match(html,/<main id="app" tabindex="-1">/);
  assert.doesNotMatch(html,/\bon[a-z]+="|<style\b|\bstyle="/);
  for (const tag of html.match(/<img\b[^>]*>/g)||[]) {
    assert.match(tag,/alt="[^"]+"/,`${route}: descriptive image`);
    assert.match(tag,/width="\d+"/);
    assert.match(tag,/height="\d+"/);
  }
  for (const [,url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (!url.startsWith("/")) continue;
    const target=url.split("?")[0];
    const file=path.join(root,"dist",target.endsWith("/")?target+"index.html":target);
    await access(file).catch(()=>{throw Error(`${language}/${route}: missing ${target}`);});
  }
  assert.equal(renderPage(route,{language}),renderPage(route,{language}),"Rendering must be independent of previous pages");
}
assert.match(renderPage("collection",{language:"en",wishlist:[1]}),/is-saved/);
assert.doesNotMatch(renderPage("collection",{language:"en"}),/is-saved/);
const config=JSON.parse(await readFile(path.join(root,"vercel.json"),"utf8"));
const css=await readFile(path.join(root,"dist/assets/css/site.css"),"utf8");
assert.match(css.trimStart(), /^@import url\("https:\/\/fonts\.googleapis\.com\/[^"\n]+"\);/);
const csp=config.headers[0].headers.find(h=>h.key==="Content-Security-Policy").value;
assert.ok(!csp.includes("unsafe-inline")&&!csp.includes("unsafe-eval"));
console.log("PASS independent rendering, main headings, image dimensions/alt text, local links/assets and security configuration across 36 pages");
