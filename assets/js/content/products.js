// One catalog source, loaded by the browser or the static builder.
const catalogUrl = new URL("./collection.json", import.meta.url);
let products;
if (catalogUrl.protocol === "file:") {
  const { readFile } = await import("node:fs/promises");
  products = JSON.parse(await readFile(catalogUrl, "utf8"));
} else {
  const response = await fetch(catalogUrl);
  if (!response.ok) throw new Error("Could not load the product catalog.");
  products = await response.json();
}
export { products };
