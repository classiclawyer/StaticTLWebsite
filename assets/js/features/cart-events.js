import { addCart, readCart, writeCart } from "./cart.js";
import { ringIds } from "../content/catalog.js";

function bindCartEvents(render) {
  document.querySelectorAll("[data-cart-ring-size]").forEach((select) => {
    select.onchange = () => {
      const items = readCart(), item = items[Number(select.dataset.cartRingSize)];
      if (!item || !ringIds.has(item.n)) return;
      const size = select.value === "consult" ? "consult" : Number(select.value);
      if (size !== "consult" && (!Number.isInteger(size) || size < 44 || size > 72)) return;
      item.size = size;
      writeCart(items);
    };
  });
  document
    .querySelectorAll("[data-add-to-cart]")
    .forEach((b) => (b.onclick = () => addCart(Number(b.dataset.piece), b.dataset.addToCart)));
  document.querySelectorAll("[data-remove-cart]").forEach(
    (b) =>
      (b.onclick = () => {
        const items = readCart();
        items.splice(Number(b.dataset.removeCart), 1);
        writeCart(items);
        render();
      }),
  );

}

export { bindCartEvents };
