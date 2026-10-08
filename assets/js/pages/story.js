import { uiText } from "../content/ui.js";
import { founderNote } from "../content/founder-note.js";
import { founderNoteKO } from "../content/founder-note-ko.js";
import { creativeDirection } from "../content/creative-direction.js";
import { creativeDirectionKO } from "../content/creative-direction-ko.js";

function storyPage(lang) {
  const team = lang === "ko" ? creativeDirectionKO : creativeDirection;
  const note = lang === "ko" ? founderNoteKO : founderNote;
  const visualEssay = `      <section class="container story-legacy-container"><div
        class="story-visual-essay"
        aria-label="${uiText[lang].selectionLabel}"
      >
        <figure class="story-selection-illustration">
          <img
            src="assets/images/guides/gem-selection-illustration.webp"
            alt="${uiText[lang].storySelectionAlt}"
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
          <span class="eyebrow">${uiText[lang].storyLabel}</span>
          <h2>${note.title}</h2>${opening
            .map((p) => `<p>${p}</p>`)
            .join("")}
        </div>
        <figure class="story-opening-photo">
          <img
            src="assets/images/portraits/tamara-story-portrait.jpg"
            alt="${uiText[lang].tamaraStoryAlt}"
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
            alt="${uiText[lang].storyParaibaAlt}"
            loading="lazy">
        </figure>
      </section>
      ${visualEssay}
      <figure class="container story-full-portrait">
        <img src="assets/images/bespoke/custom-portrait.webp"
          alt="${uiText[lang].storyPortraitAlt}"
          loading="lazy">
        <figcaption class="editorial-note">${uiText[lang].storyPortraitNote}</figcaption>
      </figure>
      <div class="container narrow story story-closing">
        ${note.closing.map((p) => `<p>${p}</p>`).join("")}
        <div class="sources founder-note-sources">
          ${note.footnotes.map((footnote) => `<p><small>${footnote.number} ${footnote.text} ${footnote.links.length === 1 ? uiText[lang].source : uiText[lang].sources} ${footnote.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join(", ")}.</small></p>`).join("")}
        </div>

      </div>
      <section class="brand-people" id="people">
        <div class="container">
          <div class="brand-people-heading">
            <span class="eyebrow">${team.eyebrow}</span>
            <h2>${team.title}</h2>
            <p>${team.lead}</p>
          </div>
          <div class="founders">
            <article>
              <figure class="founder-photo">
                <img
                  src="assets/images/portraits/tamara-portrait.jpg"
                  alt="${uiText[lang].tamaraPortraitAlt}"
                  loading="lazy"
                />
              </figure>
              <span class="eyebrow">${team.tamara.role}</span>
              <h3>${team.tamara.name}</h3>
              <p class="founder-tagline"><strong>${team.tamara.tagline}</strong></p>${team.tamara.paragraphs.map((p) => `<p>${p}</p>`).join("")}
            </article>
            <article>
              <figure class="founder-photo lionel">
                <img
                  src="assets/images/portraits/lionel-portrait-2026.jpg"
                  alt="Portrait of Lionel Philippe Delaunay"
                  loading="lazy"
                />
              </figure>
              <span class="eyebrow">${team.lionel.role}</span>
              <h3 class="lionel-name">${team.lionel.name}</h3>
              <p class="founder-tagline"><strong>${team.lionel.tagline}</strong></p>${team.lionel.paragraphs.map((p) => `<p>${p}</p>`).join("")}
            </article>
          </div>
          <div class="actions creative-direction-cta"><a class="button fill" href="#contact">${uiText[lang].consultationCTA}</a></div>
        </div>
      </section>
    </article>`;
}

export { storyPage };
