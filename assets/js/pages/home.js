import { uiText } from "../content/ui.js";
import { copy } from "../content/site.js";

function homePage(lang) {
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
          alt="${uiText[lang].openingCollectionAlt}"
          loading="eager"
        />
      </figure>
    </section>
    <section class="home-feature home-feature-story home-reveal">
      <div class="home-feature-copy">
        <span class="eyebrow">${t.homeCommitmentLabel}</span>
        <h2>${t.introTitle}</h2>
        <p>${t.intro}</p>
        <p><em>${t.homeCommitmentSecond}</em></p>
        <p><em>${t.homeCommitmentThird}</em></p>
        <div class="actions"><a class="button" href="#story">${t.homeStoryLink}${t.homeStorySuffix ? ` ${t.homeStorySuffix}` : ""}</a><a class="button" href="#stones">${t.homeStandardLink}</a></div>
      </div>
      <figure class="home-feature-image home-image-branded">
        <img
          src="assets/images/home/pink-pear-ring.webp"
          alt="${uiText[lang].pinkRingAlt}"
          loading="lazy"
        />
      </figure>
    </section>
    <section class="home-feature home-feature-bespoke home-reveal">
      <figure class="home-feature-image">
        <img
          src="assets/images/bespoke/custom-blue-rings.webp"
          alt="${uiText[lang].bespokeRingsAlt}"
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
