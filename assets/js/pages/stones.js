import { stoneGuide } from "../content/stones.js";
import { lang } from "../core/language.js";

function stonePage() {
  const g = stoneGuide[lang];
  return `<article class="stone-guide standard-guide container">
      <section class="standard-opening">
        <div>
          <span class="eyebrow">${g.eyebrow}</span>
          <h2>${g.title}</h2>
          <p>${g.lead}</p>
        </div>
        <figure class="standard-feature">
          <img src="assets/images/bespoke/custom-blue-rings.webp" alt="${lang === "ko" ? "유색보석 반지 세 점의 에디토리얼 연출 이미지" : "Editorial visualization of three colored gemstone rings"}" loading="eager">
          <figcaption><em>${g.visualNote}</em></figcaption>
        </figure>
      </section>
      <section class="standard-selection">
        <span class="eyebrow">${g.selectionLabel}</span>
        <h2>${g.selection}</h2>
        ${g.selectionParagraphs.map(p => `<p>${p}</p>`).join("")}
        <figure class="standard-selection-visual">
          <img src="assets/images/guides/gem-selection-illustration.png" alt="${lang === "ko" ? "원석을 루페로 직접 살펴보며 여러 보석을 비교하는 장면의 일러스트" : "Illustration of a gemstone being examined with a loupe alongside individually selected stones"}" loading="lazy">
          <figcaption>${lang === "ko" ? "원석 선별 과정을 표현한 연출 일러스트" : "Editorial illustration of the stone selection process"}</figcaption>
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
          <img src="assets/images/guides/diamond-pair-editorial.webp" alt="${lang === "ko" ? "나란히 놓인 두 다이아몬드 연출 이미지" : "Editorial visualization of two diamonds side by side"}" loading="lazy">
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
