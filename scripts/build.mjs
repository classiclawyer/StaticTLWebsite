import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await mkdir(output, { recursive: true });
await cp(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
const styleFiles = JSON.parse(await readFile(path.join(root, "styles/order.json"), "utf8"));
const styles = await Promise.all(styleFiles.map(file => readFile(path.join(root, file), "utf8")));
await mkdir(path.join(output, "assets/css"), { recursive: true });
await writeFile(path.join(output, "assets/css/site.css"), styles.join("\n"));
const { renderPage } = await import("../assets/js/core/render-page.js");
const { renderNavigation } = await import("../assets/js/components/navigation.js");
const { routePath, routes, rootAssetPaths } = await import("../assets/js/core/urls.js");
const { metadataHtml } = await import("../assets/js/core/metadata.js");
const { siteOrigin } = await import("../assets/js/content/seo.js");
const { uiText } = await import("../assets/js/content/ui.js");
const shell = await readFile(path.join(root, "index.html"), "utf8");
const pageRoutes = [...routes, ...Array.from({length:9}, (_,i) => `piece-${i+1}`)];
const publicRoutes = pageRoutes.filter(route => !["cart", "wishlist"].includes(route));
function links(html, language) {
  return rootAssetPaths(html.replace(/href="#([a-z]+(?:-[1-9])?)(?:\?([^" ]*))?"/g, (match, route, query) => pageRoutes.includes(route) ? `data-route="${route}" href="${routePath(route, language)}${query ? "?" + query : ""}"` : match))
    .replace(/class="([^"]*\bhome-reveal\b[^"]*)"/g, 'class="$1 is-visible"');
}
for (const language of ["en", "ko"]) {
  for (const route of pageRoutes) {
    const navigation = renderNavigation(route, language);
    const sections = { nav: navigation.nav, app: renderPage(route, { language }), languages: navigation.langs, "header-actions": navigation.actions, footlinks: navigation.footlinks };
    let html = shell.replace('<html lang="en">', `<html lang="${language}">`)
      .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "")
      .replace(/<title>[\s\S]*?<\/title>/, metadataHtml(route, language));
    for (const id of ["nav", "app", "languages", "header-actions", "footlinks"])
      html = html.replace(new RegExp(`(<(nav|main|div)[^>]*id="${id}"[^>]*>)([\\s\\S]*?)(<\\/\\2>)`), (_, open, tag, empty, close) => open + sections[id] + close);
    html = html.replace('<span id="year"></span>', `<span id="year">${new Date().getFullYear()}</span>`);
    if (language === "ko") html = html.replace('aria-label="Main navigation"', 'aria-label="주 메뉴"').replace('aria-label="Open menu"', 'aria-label="메뉴 열기"');
    html = html.replace("Skip to content", uiText[language].skipContent);
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
