import { uiText } from "../content/ui.js";
import { copy } from "../content/site.js";

function bespokePage(lang) {
  const t = copy[lang];
  return `<article class="high-jewelry-page">
    <section class="container high-jewelry-opening">
      <div class="story high-jewelry-copy">
        <span class="eyebrow">${uiText[lang].bespokeLabel}</span>
        <h2>${t.bespokeLead}</h2>
        <p>${t.bespokeText}</p>
        <div class="high-jewelry-design-intro">
          <h3><em>${t.bespokeInvitationTitle}</em></h3>
          <p>${t.bespokeInvitation}</p>
        </div>
      </div>
      <figure class="high-jewelry-photo">
        <img src="assets/images/bespoke/custom-paraiba-portrait.webp" alt="${uiText[lang].bespokeParaibaAlt}" loading="eager">
      </figure>
    </section>
    <section class="container high-jewelry-invitation">
      <figure class="high-jewelry-photo">
        <img src="assets/images/bespoke/custom-blue-rings.webp" alt="${uiText[lang].blueRingsAlt}" loading="lazy">
      </figure>
      <div class="high-jewelry-copy"><p class="bespoke-invitation"><strong><em>${t.bespokeMeaning}</em></strong></p></div>
    </section>
    <figure class="container high-jewelry-editorial high-jewelry-photo">
      <img src="assets/images/bespoke/custom-portrait.webp" alt="${uiText[lang].bespokePortraitAlt}" loading="lazy">
      <figcaption class="editorial-note">${lang === "ko" ? t.bespokeEditorial : `<em>${t.bespokeEditorial}</em>`}</figcaption>
    </figure>
    <section class="container high-jewelry-process">
      <h2 class="high-jewelry-process-title">${t.bespokeProcessTitle}</h2>
      <div class="steps">
        ${t.steps.map(([h, p], i) => `<div class="step"><figure class="step-visual"><img class="step-illustration" src="assets/images/bespoke/bespoke-process-${i + 1}.webp" alt="${uiText[lang].processAlts[i]}" loading="lazy"></figure><h3>${h}</h3><p>${p}</p></div>`).join("")}
      </div>
      <div class="split">
        <h2>${t.diamondTitle}</h2>
        <div>
          <p>${t.diamondText}</p>
          <p>${t.bespokeStandardsSecond}</p>
          <a class="button fill" href="#contact">${t.bespokeCTA}</a>
        </div>
      </div>
    </section>
    </article>`;
}

export { bespokePage };
