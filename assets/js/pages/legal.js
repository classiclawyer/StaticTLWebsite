import { copy, labels } from "../content/site.js";
import { lang } from "../core/language.js";
import { legalCopy } from "../content/legal.js";

function legalPage() {
  const t = copy[lang],
    l = labels[lang];
  return `<section class="page-hero">
      <h1>${l.legal}</h1>
      <p>${t.legalLead}</p>
    </section>
    <article class="container legal">
      <p class="legal-date">
        ${lang === "ko" ? "최종 수정: 2026년 9월 29일" : "Last updated: 29 September 2026"}
      </p>
      <p class="legal-business">${legalCopy[lang][0][1]}</p>
      ${legalCopy[lang]
        .slice(1)
        .map(([h, p]) => `<section><h2>${h}</h2><p>${p}</p></section>`)
        .join("")}
    </article>`;
}

export { legalPage };
