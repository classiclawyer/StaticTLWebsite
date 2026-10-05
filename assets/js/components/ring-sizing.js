import { ringIds, ringCopy } from "../content/catalog.js";
import { lang } from "../core/language.js";

function ringSizing(n, index, selected = "consult", showDialog = true) {
  if (!ringIds.has(n)) return "";
  const t = ringCopy[lang], id = index === undefined ? `ring-size-${n}` : `cart-ring-size-${index}`;
  return `<div class="ring-sizing">
      <div class="ring-size-heading">
        <label for="${id}">${t.label}</label
        ><button
          type="button"
          data-size-guide
          aria-label="${t.guide}"
          aria-haspopup="dialog"
          aria-controls="ring-size-dialog"
        >
          ${index === undefined ? `${t.guide} ↗` : "?"}
        </button>
      </div>
      <select id="${id}" name="${id}" ${index === undefined ? "" : `data-cart-ring-size="${index}"`}>
        <option value="consult" ${selected === "consult" ? "selected" : ""}>${t.unsure}</option>
        ${Array.from({ length: 29 }, (_, i) => 44 + i)
          .map((mm) => `<option value="${mm}" ${selected === mm ? "selected" : ""}>${mm} mm</option>`)
          .join("")}
      </select>
      <p class="ring-size-note">${t.note}</p>
    </div>
    ${showDialog ? ringSizeDialog() : ""}`;
}

function ringSizeDialog() {
  const t = ringCopy[lang],
    chart = Array.from({ length: 13 }, (_, i) => 44 + i * 2).map((mm) => `<tr><td>${mm} mm</td><td>${(mm / Math.PI).toFixed(1)} mm</td></tr>`).join("");
  return `    <dialog class="ring-size-dialog" id="ring-size-dialog" aria-labelledby="ring-size-title">
      <button class="dialog-close" type="button" data-close-size-guide aria-label="${t.close}">
        ×
      </button>
      <h2 id="ring-size-title">${t.title}</h2>
      <p>${t.intro}</p>
      <span class="ring-guide-visual"
        ><img
          class="ring-diagram-photo"
          src="assets/images/guides/ring-measure-guide.webp"
          alt="${lang === "ko" ? "손 전체와 종이 띠, 자를 이용해 손가락 둘레를 재는 두 단계 그림" : "A full hand with a paper strip around the ring finger, then the strip measured against a ruler"}"
          loading="lazy"
      /></span>
      <ol>
        ${t.steps.map((x) => `<li>${x}</li>`).join("")}
      </ol>
      <table>
        <thead>
          <tr>
            <th>${t.circ}</th>
            <th>${t.diam}</th>
          </tr>
        </thead>
        <tbody>
          ${chart}
        </tbody>
      </table>
      <p>${t.foot}</p>
      <p class="guide-source">
        ${t.source}
        <a
          href="https://www.gia.edu/quality-assurance-benchmark/accurate-determination-finger-ring-size"
          target="_blank"
          rel="noopener"
          >GIA ↗</a
        >
      </p>
    </dialog>`;
}

export { ringSizing, ringSizeDialog };
