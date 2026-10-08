const languages = ["en", "ko"];
const routes = ["home", "story", "collection", "bespoke", "stones", "contact", "legal", "wishlist", "cart"];
function validRoute(route) {
  return routes.includes(route) || /^piece-[1-9]$/.test(route);
}
function routePath(route, language = "en") {
  if (!languages.includes(language) || !validRoute(route)) throw new Error("Unknown page");
  return `/${language}/${route === "home" ? "" : route + "/"}`;
}
function locationRoute(location) {
  const segments = location.pathname.split("/").filter(Boolean);
  const language = languages.includes(segments[0]) ? segments[0] : null;
  let [route, query] = location.hash.slice(1).split("?");
  if (!route) { route = language ? segments[1] || "home" : "home"; query = location.search.slice(1); }
  if (["terms", "privacy"].includes(route)) route = "legal";
  if (route === "founders") route = "story";
  return { language, route: validRoute(route) ? route : "home", query: query || "" };
}
function rewriteLinks(root, language) {
  root.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const [route, query] = anchor.getAttribute("href").slice(1).split("?");
    if (!validRoute(route)) return;
    anchor.dataset.route = route;
    anchor.href = routePath(route, language) + (query ? `?${query}` : "");
  });
}
export { languages, routes, validRoute, routePath, locationRoute, rewriteLinks };
