import { copy, brandStoryText, sourceLinks } from "../content/site.js";
import { lang } from "../core/language.js";

function storyPage() {
  const t = copy[lang];
  return `<article class="brand-story">
      <section class="container story-opening">
        <div class="story story-opening-copy">
          <span class="eyebrow">${lang === "ko" ? "창립자의 글" : "founder's note"}</span>${t.storyP
            .slice(0, 2)
            .map((p) => `<p>${p}</p>`)
            .join("")}
        </div>
        <figure class="story-opening-photo">
          <img
            src="assets/images/portraits/tamara-story-portrait.jpg"
            alt="${lang === "ko" ? "주얼리를 착용한 김태희 대표" : "Tamara wearing fine jewelry at afternoon tea"}"
            loading="eager"
          />
        </figure>
      </section>
      <section
        class="story-visual-essay"
        aria-label="${lang === "ko" ? "보석을 고르는 과정" : "The art of selecting a stone"}"
      >
        <figure class="story-selection-illustration">
          <img
            src="assets/images/guides/gem-selection-illustration.png"
            alt="${lang === "ko" ? "루페로 유색 보석을 살펴보는 일러스트" : "Illustration of a gemstone being studied through a loupe"}"
            loading="lazy"
          />
        </figure>
        <div class="story-visual-copy">
          <span class="eyebrow">Atelier Tamara de Launay</span>
          <p>
            ${lang === "ko" ? "한 알의 보석에서 시작해, 오래도록 간직할 작품으로 완성합니다." : "From the character of a stone to a piece worth keeping for generations."}
          </p>
        </div>
      </section>
      <figure class="story-wide-image">
        <img
          src="assets/images/collection/collection-full-editorial.webp"
          alt="${lang === "ko" ? "오프닝 컬렉션 아홉 작품의 연출 이미지" : "Editorial visualization of the nine-piece opening collection"}"
          loading="lazy"
        />
      </figure>
      <div class="container narrow story story-middle">
        ${t.storyP
          .slice(2, 4)
          .map((p) => `<p>${p}</p>`)
          .join("")}
      </div>
      <section
        class="story-editorial-portraits"
        aria-label="${lang === "ko" ? "비스포크 주얼리 연출 사진" : "Bespoke jewelry editorial portraits"}"
      >
        <figure class="story-editorial-wide">
          <img
            src="assets/images/bespoke/custom-portrait.webp"
            alt="${lang === "ko" ? "블루와 핑크 보석 반지를 착용한 비스포크 주얼리 연출 사진" : "Editorial portrait wearing blue and pink gemstone rings"}"
            loading="lazy"
          />
        </figure>
        <figure class="story-editorial-tall">
          <img
            src="assets/images/bespoke/custom-paraiba-portrait.webp"
            alt="${lang === "ko" ? "청록색 보석 반지를 착용한 비스포크 주얼리 연출 사진" : "Editorial portrait wearing turquoise gemstone rings"}"
            loading="lazy"
          />
        </figure>
        <p>
          ${lang === "ko" ? "1:1 맞춤제작 주얼리의 가능성을 담은 연출 이미지" : "Editorial visions of what a private commission can become"}
        </p>
      </section>
      <div class="container narrow story story-closing">
        <p>${t.storyP[4]}</p>
        <p class="quote">${t.statement}</p>
        <div class="sources">
          <strong>${t.sourceTitle}</strong>
          <ol>
            ${sourceLinks.map(([name, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`).join("")}
          </ol>
        </div>
      </div>
      <section class="brand-people" id="people">
        <div class="container">
          <div class="brand-people-heading">
            <span class="eyebrow">Atelier Tamara de Launay</span>
            <h2>${brandStoryText[lang].people}</h2>
            <p>${brandStoryText[lang].peopleLead}</p>
          </div>
          <div class="founders">
            <article>
              <figure class="founder-photo">
                <img
                  src="assets/images/portraits/tamara-portrait.jpg"
                  alt="${lang === "ko" ? "김태희 대표의 사진" : "Portrait of Tamara T. H. Kim"}"
                  loading="lazy"
                />
              </figure>
              <span class="eyebrow">${t.tamaraRole}</span>
              <h3>${lang === "ko" ? "김태희 대표" : "Tamara T. H. Kim"}</h3>
              <p>${t.tamara}</p>
              <p>${t.tamaraCareer}</p>
              <p>${t.tamaraVision}</p>
            </article>
            <article>
              <figure class="founder-photo lionel">
                <img
                  src="assets/images/portraits/lionel-portrait-2026.jpg"
                  alt="Portrait of Lionel Paul Philippe Delaunay"
                  loading="lazy"
                />
              </figure>
              <span class="eyebrow">${t.lionelRole}</span>
              <h3>Lionel Paul Philippe Delaunay</h3>
              <p>${t.lionel}</p>
              <p>${t.lionelMore}</p>
            </article>
          </div>
        </div>
      </section>
    </article>`;
}

export { storyPage };
