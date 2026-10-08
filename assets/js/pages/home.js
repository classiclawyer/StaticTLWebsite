import { copy } from "../content/site.js";
import { lang } from "../core/language.js";

function homePage() {
  const t = copy[lang];
  return `<section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">${t.homeEyebrow}</div>
        <h1>${t.heroTitle}</h1>
        <p class="hero-statement">${t.heroStatement}</p>
        <p class="hero-statement">${t.homeCollectionText}</p>
        <div class="actions">
          <a class="button fill" href="#collection">${t.homeDiscover}</a><a class="button" href="#bespoke">${t.homeCommission}</a>
        </div>
      </div>
      <figure class="hero-image">
        <img
          src="assets/images/home/opening-collection.webp"
          alt="${lang === "ko" ? "아홉 작품으로 구성된 오프닝 컬렉션의 연출 이미지" : "Editorial visualization of the nine-piece opening collection"}"
          loading="eager"
        />
      </figure>
    </section>
    <section class="home-feature home-feature-story home-reveal">
      <div class="home-feature-copy">
        <span class="eyebrow">${t.homeCommitmentLabel}</span>
        <h2>${t.introTitle}</h2>
        <p class="intro">${t.intro}</p>
        <p>${t.homeCommitmentSecond}</p>
        <p>${t.homeCommitmentThird}</p>
        <div class="actions"><a class="button" href="#story">${t.homeStoryLink}</a>${t.homeStorySuffix ? `<span>${t.homeStorySuffix}</span>` : ""}<a class="button" href="#stones">${t.homeStandardLink}</a></div>
      </div>
      <figure class="home-feature-image home-image-branded">
        <img
          src="assets/images/home/pink-pear-ring.webp"
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
          >${t.homeBespokeLabel}</span
        >
        <h2>${t.homeBespoke}</h2>
        <p>${t.homeBespokeText}</p>
        <p>${t.homeBespokeSecond}</p>
        <p>${t.homeBespokeThird}</p>
        <div class="actions"><a class="button" href="#bespoke">${t.homeCommission}</a></div>
      </div>
    </section>`;
}

export { homePage };
