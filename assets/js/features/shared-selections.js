import { writeWishlist, readWishlist } from "./wishlist.js";
import { decodeShare } from "./sharing.js";
import { MAX_CART_ENTRIES, writeCart, readCart } from "./cart.js";

function importSharedSelections(route, sharedQuery) {
  const sharedParams = new URLSearchParams(sharedQuery);
  if (
    route === "wishlist" &&
    sharedParams.has("items") &&
    window.__importedShareLink !== location.href
  ) {
    window.__importedShareLink = location.href;
    const imported = sharedParams
      .get("items")
      .split(",")
      .map(Number)
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= 9);
    writeWishlist([...new Set([...readWishlist(), ...imported])]);
    
    sharedQuery = "";
  }
  if (
    route === "cart" &&
    sharedParams.has("items") &&
    window.__importedShareLink !== location.href
  ) {
    window.__importedShareLink = location.href;
    const tuples = decodeShare(sharedParams.get("items"));
    if (Array.isArray(tuples)) {
      const imported = tuples
        .slice(0, MAX_CART_ENTRIES)
        .filter(Array.isArray)
        .map(([n, origin, color, gold, size, qty]) => ({ n, origin, color, gold, size, qty }));
      const valid = imported.filter(
        (x) =>
          Number.isInteger(x.n) &&
          x.n >= 1 &&
          x.n <= 9 &&
          ["natural", "lab-grown", "confirm"].includes(x.origin) &&
          ["white", "pink", "yellow", "blue", "other"].includes(x.color) &&
          ["white", "yellow", "rose", "pictured"].includes(x.gold) &&
          Number.isInteger(x.qty) &&
          x.qty > 0 &&
          x.qty <= 10,
      );
      writeCart([...readCart(), ...valid].slice(0, MAX_CART_ENTRIES));
      
      sharedQuery = "";
    }
  }

  return sharedQuery;
}
export { importSharedSelections };
