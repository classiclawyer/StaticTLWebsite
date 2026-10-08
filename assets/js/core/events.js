import { handleShare } from "../features/sharing.js";
import { bindWishlistEvents } from "../features/wishlist-events.js";
import { bindRingSizeEvents } from "../features/ring-size-events.js";
import { bindCartEvents } from "../features/cart-events.js";
import { bindProductEvents } from "../features/product-events.js";
import { bindLanguageEvents } from "./language-events.js";
import { bindInquiryEvents } from "../features/inquiry-events.js";
import { bindRevealEvents } from "../features/reveal-events.js";

function bindPageEvents(context) {
  document.querySelectorAll("[data-share]").forEach(button => button.onclick = () => handleShare(button));
  bindWishlistEvents(context.render);
  bindRingSizeEvents();
  bindCartEvents(context.render);
  bindProductEvents(context);
  bindLanguageEvents(context.render);
  bindInquiryEvents();
  bindRevealEvents(context.route);
}
export { bindPageEvents };
