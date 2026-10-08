import { copy } from "../content/site.js";
import { lang } from "../core/language.js";

function bespokePage() {
  const t = copy[lang];
  return `<article class="high-jewelry-page">
    <section class="container high-jewelry-opening">
      <div class="story high-jewelry-copy">
        <span class="eyebrow">${lang === "ko" ? "비스포크 하이 주얼리" : "Bespoke High Jewelry"}</span>
        <h2>${t.bespokeLead}</h2>
        <p>${t.bespokeText}</p>
      </div>
      <figure class="high-jewelry-photo">
        <img src="assets/images/bespoke/custom-paraiba-portrait.webp" alt="${lang === "ko" ? "청록색 보석 반지를 착용한 연출 사진" : "Editorial portrait with turquoise gemstone rings"}" loading="eager">
      </figure>
    </section>
    <section class="container high-jewelry-invitation">
      <figure class="high-jewelry-photo">
        <img src="assets/images/bespoke/custom-blue-rings.webp" alt="${lang === "ko" ? "금빛과 보라색 천 위의 파란 보석 반지 세 점" : "Three blue gemstone rings on gold and purple fabric"}" loading="lazy">
      </figure>
      <div class="high-jewelry-copy"><h2>${t.bespokeInvitationTitle}</h2><p class="bespoke-invitation">${lang === "ko" ? t.bespokeInvitation : `<em>${t.bespokeInvitation}</em>`}</p></div>
    </section>
    <figure class="container high-jewelry-editorial high-jewelry-photo">
      <img src="assets/images/bespoke/custom-portrait.webp" alt="${lang === "ko" ? "블루와 핑크 보석 반지를 착용한 연출 사진" : "Editorial portrait with blue and pink gemstone rings"}" loading="lazy">
      <figcaption class="editorial-note">${lang === "ko" ? t.bespokeEditorial : `<em>${t.bespokeEditorial}</em>`}</figcaption>
    </figure>
    <section class="container">
      <p class="bespoke-invitation"><strong><em>${t.bespokeMeaning}</em></strong></p>
      <h2>${t.bespokeProcessTitle}</h2>
      <div class="steps">
        ${t.steps.map(([h, p], i) => `<div class="step"><figure class="step-visual"><img class="step-illustration" src="assets/images/bespoke/bespoke-process-${i + 1}.webp" alt="${(lang === "ko" ? ["보석을 보여주며 1:1로 상담하는 장면", "보석과 반지 디자인을 스케치하는 장면", "세공사가 반지에 보석을 세팅하는 장면"] : ["Private conversation over gemstones and ideas", "A gemstone and ring design sketch", "A jeweler setting a gemstone by hand"])[i]}" loading="lazy"></figure><h3>${h}</h3><p>${p}</p></div>`).join("")}
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
