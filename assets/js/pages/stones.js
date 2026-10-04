import { stoneGuide } from "../content/stones.js";
import { lang } from "../core/language.js";

function stonePage() {
  const g = stoneGuide[lang];
  return `<section class="page-hero stone-hero">
      <span class="eyebrow">${g.eyebrow}</span>
      <h1>${g.title}</h1>
      <p>${g.lead}</p>
    </section>
    <article class="stone-guide standard-guide container">
      <figure class="standard-feature">
        <img
          src="assets/images/bespoke/custom-blue-rings.webp"
          alt="${lang === "ko" ? "유색보석 반지 세 점의 에디토리얼 연출 이미지" : "Editorial visualization of three colored gemstone rings"}"
          loading="eager"
        />
        <figcaption>${g.visualNote}</figcaption>
      </figure>
      <section class="standard-selection">
        <span class="stone-index">01 / ${g.eyebrow}</span>
        <h2>${g.selection}</h2>
        <p>${g.selectionText}</p>
        <figure class="standard-selection-visual">
          <img
            src="assets/images/guides/gem-selection-illustration.png"
            alt="${lang === "ko" ? "원석을 루페로 직접 살펴보며 여러 보석을 비교하는 장면의 일러스트" : "Illustration of a gemstone being examined with a loupe alongside individually selected stones"}"
            loading="lazy"
          />
          <figcaption>
            ${lang === "ko" ? "원석 선별 과정을 표현한 연출 일러스트" : "Editorial illustration of the stone selection process"}
          </figcaption>
        </figure>
      </section>
      <section class="standard-commitment">
        <span class="stone-index">Atelier Tamara de Launay</span>
        <h2>${g.commitment}</h2>
        <div class="standard-cards">
          <div>
            <b>01</b>
            <h3>${g.curated}</h3>
            <p>${g.curatedText}</p>
          </div>
          <div>
            <b>02</b>
            <h3>${g.setting}</h3>
            <p>${g.settingText}</p>
          </div>
          <div>
            <b>03</b>
            <h3>${g.care}</h3>
            <p>${g.careText}</p>
          </div>
        </div>
      </section>
      <section class="standard-origin">
        <div>
          <span class="stone-index"
            >${lang === "ko" ? "선택의 자유" : "A choice that is yours"}</span
          >
          <h2>${g.origin}</h2>
          <p>${g.originText}</p>
        </div>
        <figure>
          <img
            src="assets/images/guides/diamond-pair-editorial.webp"
            alt="${lang === "ko" ? "나란히 놓인 두 다이아몬드 연출 이미지" : "Editorial visualization of two diamonds side by side"}"
            loading="lazy"
          />
          <figcaption>${g.visualNote}</figcaption>
        </figure>
      </section>
      <section class="stone-final">
        <h2>${g.closer}</h2>
        <p>${g.closerText}</p>
        <a class="button fill" href="#contact">${g.cta}</a>
      </section>
    </article>`;
}

export { stonePage };
