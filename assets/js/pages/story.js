import { copy, brandStoryText, sourceLinks } from "../content/site.js";
import { founderNote } from "../content/founder-note.js";
import { creativeDirection } from "../content/creative-direction.js";
import { lang } from "../core/language.js";

function storyPage() {
  const t = copy[lang];
  const visualEssay = `      <section class="container story-legacy-container"><div
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
            ${lang === "ko" ? "한 알의 보석에서 시작해, 오래도록 간직할 작품으로 완성합니다." : `<strong>${founderNote.legacy}</strong>`}
          </p>
        </div>
      </div></section>
`;
  const opening = lang === "en" ? founderNote.opening : t.storyP.slice(0, 2);
  const reflections = lang === "en" ? founderNote.reflections : t.storyP.slice(2, 4);
  return `<article class="brand-story">
      <section class="container story-opening">
        <div class="story story-opening-copy">
          <span class="eyebrow">${lang === "ko" ? "브랜드 소개" : "Our Story"}</span>
          <h2>${lang === "ko" ? "창립자의 글" : founderNote.title}</h2>${opening
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
      ${lang === "ko" ? visualEssay : ""}
      <section class="container story-reflections">
        <div class="story story-reflections-copy">
          ${reflections.map((p) => `<p>${p}</p>`).join("")}
        </div>
        <figure class="story-reflections-photo">
          <img src="assets/images/bespoke/custom-paraiba-portrait.webp"
            alt="${lang === "ko" ? "청록색 보석 반지를 착용한 비스포크 주얼리 연출 사진" : "Editorial portrait wearing turquoise gemstone rings"}"
            loading="lazy">
        </figure>
      </section>
      ${lang === "en" ? visualEssay : ""}
      <figure class="container story-full-portrait">
        <img src="assets/images/bespoke/custom-portrait.webp"
          alt="${lang === "ko" ? "블루와 핑크 보석 반지를 착용한 비스포크 주얼리 연출 사진" : "Editorial portrait wearing blue and pink gemstone rings"}"
          loading="lazy">
        <figcaption class="editorial-note">${lang === "ko" ? "1:1 맞춤제작 주얼리의 가능성을 담은 연출 이미지" : "Editorial visions of what a private commission can become"}</figcaption>
      </figure>
      <div class="container narrow story story-closing">
        ${lang === "en" ? `
          ${founderNote.closing.map((p) => `<p>${p}</p>`).join("")}
          <div class="sources founder-note-sources">
            ${founderNote.footnotes.map((note) => `<p><small>${note.number} ${note.text} ${note.links.length === 1 ? "Source:" : "Sources:"} ${note.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join(", ")}.</small></p>`).join("")}
          </div>` : `
        <p>${t.storyP[4]}</p>
        <p class="quote">${t.statement}</p>
        <div class="sources">
          <strong>${t.sourceTitle}</strong>
          <ol>
            ${sourceLinks.map(([name, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`).join("")}
          </ol>
        </div>`}

      </div>
      <section class="brand-people" id="people">
        <div class="container">
          <div class="brand-people-heading">
            <span class="eyebrow">${lang === "en" ? creativeDirection.eyebrow : "Atelier Tamara de Launay"}</span>
            <h2>${lang === "en" ? creativeDirection.title : brandStoryText[lang].people}</h2>
            <p>${lang === "en" ? creativeDirection.lead : brandStoryText[lang].peopleLead}</p>
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
              <span class="eyebrow">${lang === "en" ? creativeDirection.tamara.role : t.tamaraRole}</span>
              <h3>${lang === "ko" ? "김태희 대표" : "Tamara T. H. Kim"}</h3>
              ${lang === "en" ? `<p class="founder-tagline"><strong>${creativeDirection.tamara.tagline}</strong></p>${creativeDirection.tamara.paragraphs.map((p) => `<p>${p}</p>`).join("")}` : `<p>${t.tamara}</p><p>${t.tamaraCareer}</p><p>${t.tamaraVision}</p>`}
            </article>
            <article>
              <figure class="founder-photo lionel">
                <img
                  src="assets/images/portraits/lionel-portrait-2026.jpg"
                  alt="Portrait of Lionel Philippe Delaunay"
                  loading="lazy"
                />
              </figure>
              <span class="eyebrow">${lang === "en" ? creativeDirection.lionel.role : t.lionelRole}</span>
              <h3 class="lionel-name">Lionel Philippe Delaunay</h3>
              ${lang === "en" ? `<p class="founder-tagline"><strong>${creativeDirection.lionel.tagline}</strong></p>${creativeDirection.lionel.paragraphs.map((p) => `<p>${p}</p>`).join("")}` : `<p>${t.lionel}</p><p>${t.lionelMore}</p>`}
            </article>
          </div>
          <div class="actions creative-direction-cta"><a class="button fill" href="#contact">${lang === "ko" ? "비스포크 상담 시작하기" : "Begin your bespoke consultation"}</a></div>
        </div>
      </section>
    </article>`;
}

export { storyPage };
