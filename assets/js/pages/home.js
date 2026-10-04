import { copy, labels } from "../content/site.js";
import { lang } from "../core/language.js";
import { button } from "../components/button.js";

function homePage() {
  const t = copy[lang],
    l = labels[lang];
  return `<section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">${t.homeEyebrow}</div>
        <h1>${t.heroTitle}</h1>
        <p class="hero-statement">${t.heroStatement}</p>
        <div class="actions">
          ${button("collection", "discover", true)}${button("bespoke", "begin")}
        </div>
      </div>
      <figure class="hero-image">
        <img
          src="assets/images/collection/collection-full-editorial.webp"
          alt="${lang === "ko" ? "아홉 작품으로 구성된 오프닝 컬렉션의 연출 이미지" : "Editorial visualization of the nine-piece opening collection"}"
          loading="eager"
        />
      </figure>
    </section>
    <p class="hero-disclosure">
      ${lang === "ko" ? "오프닝 컬렉션 · 연출 이미지" : "Opening collection · editorial visualization"}
    </p>
    <section class="home-feature home-feature-story home-reveal">
      <div class="home-feature-copy">
        <span class="eyebrow">Atelier Tamara de Launay</span>
        <h2>${t.introTitle}</h2>
        <p class="intro">${t.intro}</p>
        <div class="actions">${button("story", "story")}</div>
      </div>
      <figure class="home-feature-image">
        <img
          src="assets/images/collection/collection-8-editorial.webp"
          alt="${lang === "ko" ? "핑크 페어 다이아몬드 반지 연출 이미지" : "Editorial visualization of the pink pear diamond ring"}"
          loading="lazy"
        />
      </figure>
    </section>
    <section class="home-feature home-feature-bespoke home-reveal">
      <figure class="home-feature-image">
        <img
          src="assets/images/bespoke/custom-blue-rings.webp"
          alt="${lang === "ko" ? "유색 보석 반지 세 점의 맞춤제작 연출 이미지" : "Editorial visualization of three bespoke gemstone rings"}"
          loading="lazy"
        />
      </figure>
      <div class="home-feature-copy">
        <span class="eyebrow"
          >${{ en: "Bespoke", fr: "Sur mesure", ko: "1:1 맞춤제작" }[lang]}</span
        >
        <h2>${t.homeBespoke}</h2>
        <p>${t.homeBespokeText}</p>
        <div class="actions">${button("bespoke", "bespoke")}</div>
      </div>
    </section>`;
}

export { homePage };
