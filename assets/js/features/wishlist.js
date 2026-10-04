import { readLocal, writeLocal } from "../core/storage.js";

function readWishlist() {
  try {
    const x = JSON.parse(readLocal("atelier-wishlist") || "[]");
    return Array.isArray(x)
      ? [...new Set(x.filter((n) => Number.isInteger(n) && n >= 1 && n <= 9))]
      : [];
  } catch (_) {
    return [];
  }
}
function writeWishlist(items) {
  writeLocal("atelier-wishlist", JSON.stringify(items));
}

export { readWishlist, writeWishlist };
