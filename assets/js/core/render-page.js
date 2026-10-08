import { homePage } from "../pages/home.js";
import { storyPage } from "../pages/story.js";
import { collectionPage } from "../pages/collection.js";
import { bespokePage } from "../pages/bespoke.js";
import { stonePage } from "../pages/stones.js";
import { contactPage } from "../pages/contact.js";
import { legalPage } from "../pages/legal.js";
import { wishlistPage } from "../pages/wishlist.js";
import { cartPage } from "../pages/cart.js";
import { productDetail } from "../pages/product.js";
import { productRecord } from "../components/products.js";
import { rootAssetPaths } from "./urls.js";
import { prepareImages } from "../components/images.js";
import { labels } from "../content/site.js";

// Shared HTML rendering has no DOM, storage, or navigation side effects.
function renderPage(route, { language, wishlist = [], cart = [], selectedInquiry = null }) {
  let markup;
  const piece = /^piece-([1-9])$/.exec(route);
  if (piece) markup = productDetail(productRecord(Number(piece[1]), language), language, wishlist);
  else {
    const pages = {
      home: () => homePage(language), story: () => storyPage(language),
      collection: () => collectionPage(language, wishlist), bespoke: () => bespokePage(language),
      stones: () => stonePage(language), contact: () => contactPage(selectedInquiry, language),
      legal: () => legalPage(language), wishlist: () => wishlistPage(language, wishlist),
      cart: () => cartPage(language, cart)
    };
    if (!pages[route]) throw new Error(`Unknown page: ${route}`);
    markup = pages[route]();
  }
  if (!markup.includes("<h1")) markup = markup.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/, '<h1$1>$2</h1>');
  if (!markup.includes("<h1")) markup = `<h1 class="visually-hidden">${labels[language][route]}</h1>` + markup;
  return prepareImages(rootAssetPaths(markup));
}
export { renderPage };
