import { readWishlist, writeWishlist } from "./wishlist.js";

function bindWishlistEvents(render) {
  document.querySelectorAll("[data-wish]").forEach(
    (b) =>
      (b.onclick = () => {
        const n = Number(b.dataset.wish),
          items = readWishlist();
        const checkout = document.querySelector(".checkout-button")?.cloneNode(true);
        writeWishlist(items.includes(n) ? items.filter((x) => x !== n) : [...items, n]);
        render();
        if (!items.includes(n)) {
          const icon = document.querySelector('#header-actions a[data-route="wishlist"]');
          if (icon) {
            icon.classList.add("bag-icon-added");
            icon.addEventListener("animationend", () => icon.classList.remove("bag-icon-added"), { once: true });
          }
        }
        if (checkout) document.querySelector("[data-add-to-cart]")?.replaceWith(checkout);
        const heart = document.querySelector(`.wishlist-heart[data-wish="${n}"]`);
        if (heart) {
          heart.classList.add("wish-clicked");
          heart.focus({ preventScroll: true });
        }
      }),
  );

}

export { bindWishlistEvents };
