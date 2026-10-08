import { uiText } from "../content/ui.js";
import { stoneGuide } from "../content/stones.js";

function stonePage(lang) {
  const g = stoneGuide[lang];
  return `<article class="stone-guide standard-guide container">
      <section class="standard-opening">
        <div>
          <span class="eyebrow">${g.eyebrow}</span>
          <h2>${g.title}</h2>
          <p>${g.lead}</p>
        </div>
        <figure class="standard-feature">
          <img src="assets/images/bespoke/custom-blue-rings.webp" alt="${uiText[lang].standardRingsAlt}" loading="eager">
          <figcaption><em>${g.visualNote}</em></figcaption>
        </figure>
      </section>
      <section class="standard-selection">
        <span class="eyebrow">${g.selectionLabel}</span>
        <h2>${g.selection}</h2>
        ${g.selectionParagraphs.map(p => `<p>${p}</p>`).join("")}
        <figure class="standard-selection-visual">
          <img src="assets/images/guides/gem-selection-illustration.webp" alt="${uiText[lang].standardSelectionAlt}" loading="lazy">
          <figcaption>${uiText[lang].standardSelectionCaption}</figcaption>
        </figure>
      </section>
      <section class="standard-commitment">
        <span class="eyebrow">${g.commitment}</span>
        <div class="standard-cards">
          <div><h3>01 / ${g.curated}</h3><p>${g.curatedText}</p></div>
          <div><h3>02 / ${g.setting}</h3><p>${g.settingText}</p></div>
          <div><h3>03 / ${g.care}</h3><p>${g.careText}</p><p>${g.careTerms}</p></div>
        </div>
      </section>
      <section class="standard-origin">
        <div>
          <h2>${g.origin}</h2>
          ${g.originParagraphs.map(p => `<p>${p}</p>`).join("")}
        </div>
        <figure>
          <img src="assets/images/guides/diamond-pair-editorial.webp" alt="${uiText[lang].diamondPairAlt}" loading="lazy">
          <figcaption><em>${g.visualNote}</em></figcaption>
        </figure>
      </section>
      <section class="stone-final">
        <h2>${g.closer}</h2>
        <p>${g.closerText}</p>
        <a class="button fill" href="#bespoke">${g.cta}</a>
      </section>
    </article>`;
}

export { stonePage };
