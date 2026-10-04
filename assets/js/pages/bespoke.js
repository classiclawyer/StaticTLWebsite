import { copy, labels, customEditorialNote } from "../content/site.js";
import { lang } from "../core/language.js";
import { button } from "../components/button.js";

function bespokePage() {
  const t = copy[lang],
    l = labels[lang];
  return `<section class="page-hero">
      <span class="eyebrow">${{ en: "Bespoke", fr: "Sur mesure", ko: "1:1 맞춤제작" }[lang]}</span>
      <h1>${l.bespoke}</h1>
      <p>${t.bespokeLead}</p>
    </section>
    <section
      class="bespoke-editorials"
      aria-label="${{ en: "High jewelry editorial", fr: "Visuels de haute joaillerie", ko: "1:1 맞춤제작 주얼리 연출 사진" }[lang]}"
    >
      <div class="bespoke-editorial-grid">
        <figure class="still-life">
          <img
            src="assets/images/bespoke/custom-blue-rings.webp"
            alt="${{ en: "Three blue gemstone rings on gold and purple fabric", fr: "Trois bagues à pierres bleues sur un tissu doré et violet", ko: "금빛과 보라색 천 위에 놓인 파란 보석 반지 세 점" }[lang]}"
            loading="eager"
          />
        </figure>
        <figure class="wide-portrait">
          <img
            src="assets/images/bespoke/custom-portrait.webp"
            alt="${{ en: "Editorial portrait with blue and pink gemstone rings", fr: "Portrait avec des bagues à pierres bleues et roses", ko: "파란색과 분홍색 보석 반지를 착용한 연출 사진" }[lang]}"
            loading="lazy"
          />
        </figure>
        <figure class="tall-portrait">
          <img
            src="assets/images/bespoke/custom-paraiba-portrait.webp"
            alt="${{ en: "Editorial portrait with turquoise gemstone rings", fr: "Portrait avec des bagues à pierres turquoise", ko: "청록색 보석 반지를 착용한 연출 사진" }[lang]}"
            loading="lazy"
          />
        </figure>
      </div>
      <p class="editorial-note">${customEditorialNote[lang]}</p>
    </section>
    <section class="container">
      <div class="split">
        <h2>${t.bespokeLead}</h2>
        <div>
          <p>${t.bespokeText}</p>
          <p class="bespoke-invitation">${t.bespokeInvitation}</p>
          <a class="stone-text-link" href="#stones">${l.stones} ↗</a>
          <p class="eyebrow">${t.por}</p>
        </div>
      </div>
      <div class="steps">
        ${t.steps.map(([h, p], i) => `<div class="step"><figure class="step-visual"><img class="step-illustration" src="assets/images/bespoke/bespoke-process-${i + 1}.webp" alt="${(lang === "ko" ? ["보석을 보여주며 1:1로 상담하는 장면", "보석과 반지 디자인을 스케치하는 장면", "세공사가 반지에 보석을 세팅하는 장면"] : ["Private conversation over gemstones and ideas", "A gemstone and ring design sketch", "A jeweler setting a gemstone by hand"])[i]}" loading="lazy"></figure><h3>${h}</h3><p>${p}</p></div>`).join("")}
      </div>
      <div class="split">
        <h2>${t.diamondTitle}</h2>
        <div>
          <p>${t.diamondText}</p>
          ${button("contact", "begin", true)}
        </div>
      </div>
    </section>`;
}

export { bespokePage };
