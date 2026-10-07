import { copy, brandStoryText } from "../content/site.js";
import { founderNote } from "../content/founder-note.js";
import { founderNoteKO } from "../content/founder-note-ko.js";
import { creativeDirection } from "../content/creative-direction.js";
import { lang } from "../core/language.js";

function storyPage() {
  const t = copy[lang];
  const note = lang === "ko" ? founderNoteKO : founderNote;
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
            <strong>${note.legacy}</strong>
          </p>
        </div>
      </div></section>
`;
  const opening = note.opening;
  const reflections = note.reflections;
  return `<article class="brand-story">
      <section class="container story-opening">
        <div class="story story-opening-copy">
          <span class="eyebrow">${lang === "ko" ? "브랜드 소개" : "Our Story"}</span>
          <h2>${note.title}</h2>${opening
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
      ${visualEssay}
      <figure class="container story-full-portrait">
        <img src="assets/images/bespoke/custom-portrait.webp"
          alt="${lang === "ko" ? "블루와 핑크 보석 반지를 착용한 비스포크 주얼리 연출 사진" : "Editorial portrait wearing blue and pink gemstone rings"}"
          loading="lazy">
        <figcaption class="editorial-note">${lang === "ko" ? "1:1 맞춤제작 주얼리의 가능성을 담은 연출 이미지" : "Editorial visions of what a private commission can become"}</figcaption>
      </figure>
      <div class="container narrow story story-closing">
        ${note.closing.map((p) => `<p>${p}</p>`).join("")}
        <div class="sources founder-note-sources">
          ${note.footnotes.map((footnote) => `<p><small>${footnote.number} ${footnote.text} ${lang === "ko" ? "출처:" : footnote.links.length === 1 ? "Source:" : "Sources:"} ${footnote.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join(", ")}.</small></p>`).join("")}
        </div>

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
