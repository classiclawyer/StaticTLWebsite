# Atelier Tamara de Launay static website

A build-free static website. `index.html` is the entry point; CSS and JavaScript are separate so the page remains easy to edit and deploy.

## Structure

- `index.html` — document shell, navigation and mount point
- `assets/css/site.css` — visual styles
- `assets/js/site.js` — content, translations, routing and interactions
- `assets/images/brand/` — logo and favicon
- `assets/images/collection/` — collection photographs
- `assets/images/bespoke/` — bespoke photographs and process images
- `assets/images/portraits/` — founder portraits
- `assets/images/guides/` — illustrations and sizing guide

## Local preview

Serve the repository root with a static server, for example `python3 -m http.server 8000`, and open `http://localhost:8000`. Hash routes work without server rewrites. Vercel can deploy the repository root as a static site with no build command or backend.

## Editing

Keep filenames and references in sync when adding images. Content and language strings live in `assets/js/site.js`. No secrets or private customer data belong in this repository. The current inquiry flow is client-side and hands the customer off to Instagram; it does not submit data to a server. Review legal copy, product details and links before public launch.
