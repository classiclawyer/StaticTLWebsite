// Shared catalog loader. Edit product data in collection.json.
const response = await fetch(new URL("./collection.json", import.meta.url));
if (!response.ok) throw new Error("Could not load the product catalog.");
const products = await response.json();
export { products };
