import { locationRoute, routePath } from "./urls.js";
import { setLanguage } from "./language.js";

function bindLanguageEvents(render) {
  document.querySelectorAll("[data-lang]").forEach(
    (b) =>
      (b.onclick = (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const current = locationRoute(location);
        setLanguage(b.dataset.lang);
        window.history.pushState(null, "", routePath(current.route, b.dataset.lang) + (current.query ? `?${current.query}` : ""));
        render();
        document.querySelector(`[data-lang="${b.dataset.lang}"]`)?.focus({ preventScroll: true });
      }),
  );

}

export { bindLanguageEvents };
