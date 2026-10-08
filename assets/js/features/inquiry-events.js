import { readCart, cartVariant } from "./cart.js";
import { cartText } from "../content/cart.js";
import { lang } from "../core/language.js";
import { productRecord, productPrice } from "../components/products.js";
import { submitInquiry } from "./inquiry.js";
import { copy } from "../content/site.js";

function bindInquiryEvents() {
  let cartForm = document.getElementById("cart-request");
  if (cartForm)
    cartForm.onsubmit = (e) => {
      e.preventDefault();
      const t = cartText[lang],
        items = readCart();
      const selection = items
        .map(
          (item, i) =>
            `${i + 1}. #${item.n} ${productRecord(item.n, lang).name} × ${item.qty} — ${cartVariant(item)} — ${productPrice(productRecord(item.n, lang).spec, item.origin, lang)}`,
        )
        .join("\n");
      submitInquiry(
        cartForm,
        document.getElementById("cart-response"),
        { pending: t.pending, sent: t.sent, error: t.error },
        { selection },
      );
    };
  let form = document.getElementById("request");
  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      submitInquiry(form, document.getElementById("response"), {
        pending: lang === "ko" ? "문의를 보내고 있습니다…" : "Sending your inquiry…",
        sent: copy[lang].success,
        error:
          lang === "ko"
            ? "문의를 보내지 못했습니다. 다시 시도하시거나 인스타그램으로 연락해 주세요."
            : "We could not send your inquiry. Please try again, or contact us on Instagram.",
      });
    };

}

export { bindInquiryEvents };
