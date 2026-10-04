import { copy, labels } from "../content/site.js";
import { lang } from "../core/language.js";
import { productRecord } from "../components/products.js";
import { jewelryOptions, ringIds, ringCopy } from "../content/catalog.js";
import { cartText } from "../content/cart.js";

function contactPage(selectedInquiry) {
  const t = copy[lang],
    l = labels[lang];
  return `<section class="page-hero">
      <span class="eyebrow">Paris, Seoul</span>
      <h1>${l.contact}</h1>
      <p>${t.formLead}</p>
    </section>
    <section class="container form-wrap">
      <p>${t.formText}</p>
      <form id="request" action="https://formspree.io/f/mdekydbn" method="POST" autocomplete="on">
        <input type="hidden" name="inquiry_type" value="General inquiry" />
        <div class="form-honeypot" aria-hidden="true">
          <label for="request-gotcha">Leave this blank</label
          ><input id="request-gotcha" name="_gotcha" tabindex="-1" autocomplete="off" />
        </div>
        ${
          selectedInquiry
            ? `<div class="selection-summary"><strong>${lang === "ko" ? "선택한 작품" : "Selected piece"}</strong><span>${productRecord(selectedInquiry.n).name}</span><input type="hidden" name="selected_piece" value="${productRecord(selectedInquiry.n).name}">${[
                "diamond-origin",
                "diamond-color",
                "gold-color",
              ]
                .map((key) => {
                  const val = selectedInquiry[key],
                    field =
                      key === "diamond-origin"
                        ? "selected_diamond_origin"
                        : key === "diamond-color"
                          ? "selected_diamond_color"
                          : "selected_gold_color";
                  const opt = jewelryOptions[lang];
                  const labels =
                    key === "diamond-origin"
                      ? [
                          ["confirm", cartText[lang].confirm],
                          ["lab-grown", opt.lab],
                          ["natural", opt.natural],
                        ]
                      : key === "diamond-color"
                        ? opt.diamond
                        : opt.gold;
                  const label = labels.find(([code]) => code === val)?.[1];
                  return label ? `<input type="hidden" name="${field}" value="${label}">` : ``;
                })
                .join(
                  "",
                )}${ringIds.has(selectedInquiry.n) ? `<input type="hidden" name="selected_ring_size" value="${selectedInquiry["ring-size"] === "consult" ? ringCopy[lang].unsure : selectedInquiry["ring-size"] + " mm"}">` : ""}</div>`
            : ``
        }
        <div class="form-grid">
          <div class="field">
            <label for="name">${t.name}</label
            ><input id="name" name="name" autocomplete="off" required />
          </div>
          <div class="field">
            <label for="email">${t.email}</label
            ><input id="email" name="email" type="email" autocomplete="off" required />
          </div>
        </div>
        <div class="field">
          <label for="location">${t.location}</label
          ><input
            id="location"
            name="location"
            autocomplete="off"
            placeholder="${lang === "ko" ? "예: 서울, 한국" : "e.g. Seoul, South Korea"}"
          />
        </div>
        <div class="field">
          <label for="message">${t.message}</label
          ><textarea
            id="message"
            name="message"
            placeholder="${t.messagePlaceholder}"
            required
          ></textarea>
        </div>
        <details class="contact-options">
          <summary>${t.optional}</summary>
          <div class="form-grid">
            <div class="field">
              <label for="interest">${t.interest}</label
              ><select id="interest" name="jewelry_category">
                <option value="">${t.choose}</option>
                ${t.categories.map((x) => `<option>${x}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="budget">${t.budget}</label
              ><select id="budget" name="budget_usd">
                <option value="">${t.choose}</option>
                ${t.budgetOptions.map((option, i) => `<option value="${["Under USD 1,000", "USD 1,000–2,999", "USD 3,000–4,999", "USD 5,000–6,999", "USD 7,000–9,999", "USD 10,000–99,999", "USD 100,000–999,999", "USD 1,000,000+"][i]}">${option}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="diamond">${t.preference}</label
              ><select id="diamond" name="diamond_preference">
                <option value="">${t.choose}</option>
                ${t.stoneOptions.map((x) => `<option>${x}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="gem">${t.gemPreference}</label
              ><select id="gem" name="colored_gemstone_preference">
                <option value="">${t.choose}</option>
                ${t.stoneOptions.map((x) => `<option>${x}</option>`).join("")}
              </select>
            </div>
          </div>
        </details>
        <p class="form-note">${t.formNote}</p>
        <button class="button fill" type="submit">${t.submit}</button>
        <p id="response" class="success" hidden role="status" aria-live="polite"></p>
      </form>
      <p class="alternate-contact">
        ${lang === "ko" ? "인스타그램 DM으로 편하게 이야기하셔도 좋습니다." : "Prefer to write directly? You can also DM Atelier Tamara de Launay on Instagram."}
        <a
          href="https://www.instagram.com/atelier_tamara_de_launay/"
          target="_blank"
          rel="noopener noreferrer"
          >@atelier_tamara_de_launay ↗</a
        >
      </p>
    </section>`;
}

export { contactPage };
