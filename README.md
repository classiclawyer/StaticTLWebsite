# Atelier Tamara de Launay static website

A static website generated from shared English and Korean content modules. Public pages contain their text, navigation, and metadata in the initial HTML; JavaScript adds saved selections, language switching, sharing, animations, and inquiries.

## Structure

- `index.html` — shared document template
- `scripts/build.mjs` — renders existing page modules to `dist/en/` and `dist/ko/`
- `scripts/check-build.mjs` — validates generated content, links, metadata, schema and sitemap
- `assets/js/content/seo.js` — canonical production origin and page descriptions
- `assets/js/core/urls.js`, `metadata.js` — shared localized URL and metadata helpers
- `vercel.json` — builds and serves `dist/`
- `styles/` and `styles/order.json` — ordered source modules, bundled into one generated stylesheet
- `assets/js/site.js` — startup and navigation listeners
- `assets/js/content/en.js`, `ko.js` — general page copy and navigation labels
- `assets/js/content/` — catalog, legal, cart, sharing and stone-guide content
- `assets/js/pages/` — one rendering function per page
- `assets/js/components/` — product cards, option groups, navigation, images, sharing panels and ring sizing
- `assets/js/features/` — cart, wishlist, sharing and inquiry submission
- `assets/js/core/` — routing, language, browser storage and event binding
- `assets/images/brand/` — logo and favicon
- `assets/images/collection/` — collection photographs
- `assets/images/bespoke/` — bespoke photographs and process images
- `assets/images/portraits/` — founder portraits
- `assets/images/guides/` — illustrations and sizing guide

## Local preview

Use Node.js 22 or later. No third-party build dependencies are required.

```sh
npm run build
npm test
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000/en/` or `/ko/`. Rebuild after changing source content. Vercel uses `npm run build` and serves `dist/`, with directory URLs ending in `/`. The source `index.html` is a template; preview the generated output rather than the repository root.

## Editing

All nine product records live in `assets/js/content/collection.json`, sorted by numeric `id`. `content/products.js` loads this JSON and exposes the shared products array. Keep existing IDs: links, saved bag selections and wishlists use them. Images remain in `assets/images/collection/`.

Catalog keys mirror the Google Sheet: `Product`, `Lab-eur`, `Lab-krw`, `Nat-eur`, `Nat-krw`, `one liner`, `description`, `one liner kr`, `description kr`, `name kr`, `category`, `diamond-color`, `center-stone`, `melee-count`, `melee-stone`, `gold`, `gold-purity`, `gold-color`, and `image`, plus `id`. The internal lab-cost column is excluded. Prices are numeric EUR/KRW amounts; diamond weights are numeric ct and gold weight is numeric g. Empty strings mean missing information. Center and mêlée weights remain separate; no total weight or stone count is inferred. Categories come directly from the sheet and `ring` enables bag ring sizing.

Cards start with the lab price. Product details and bag items show the price for their selected diamond origin, in KRW for Korean and EUR otherwise. No temporary USD prices remain. Price formatting and translated display fields are adapted in `components/products.js`. Shared interface copy remains in `content/catalog.js`.

Keep filenames and references in sync when adding images. Edit general text in `content/en.js` and `content/ko.js`; keep their keys aligned. Feature-specific translations live beside the related data in `content/catalog.js`, `legal.js`, `cart.js`, `sharing.js` and `stones.js`. Shared editorial labels, image descriptions and interface translations live in `content/ui.js`.

Change page markup in `pages/` and reusable markup in `components/`. Pure `core/render-page.js` functions receive language and visitor data explicitly and return HTML without browser globals. Browser interaction handlers live in feature modules, attached by `core/events.js`. Use explicit imports rather than adding global variables. Language changes go through `setLanguage()`; storage helpers retain the existing saved cart and wishlist keys. Keep comments to brief explanations of non-obvious behavior.

No secrets or private customer data belong in this repository. The contact and cart inquiry forms submit to Formspree (`https://formspree.io/f/mdekydbn`) using `features/inquiry.js`. Formspree stores submissions and can email notifications to the account's verified target address. Instagram is an optional contact link. Keep the Formspree target email verified, monitor spam and submission limits, and never place API keys or private customer data in this repository. Review legal copy, product details and links before public launch.

## Refactor checks

Check every navigation route and all nine product pages in both languages. Verify language persistence, diamond origin after reload, cart add/remove, wishlist toggling, shared links and the mobile menu. Compare desktop and mobile layouts against the base branch. Keep CSS rules in order: later rules currently override earlier styles.

Use mocked responses for routine form regression checks so they do not send real inquiries. A mocked success confirms browser behavior, not email delivery.

## Form smoke test

On a preview branch, submit one clearly marked test inquiry from each form in both languages. Confirm the success message appears only after Formspree accepts it, the submitted fields appear in Formspree, and notification email arrives at the verified target address. Test a simulated network failure to confirm the form preserves typed content and shows an error. The site does not take orders or payment.

## Discoverability

The build uses the same page functions and content records as the browser, with empty visitor state. It does not copy customer bags, wishlists, or inquiries into generated HTML. Keep copy in the existing content modules; do not edit generated files. There are no French pages.

Canonical routes are `/en/` and `/ko/`, followed by `story/`, `collection/`, `bespoke/`, `stones/`, `contact/`, `legal/`, or stable `piece-1/` through `piece-9/`. Language links retain the current page. Direct localized URLs determine the language even when a different language was saved previously. Old `#collection`, `#piece-1?o=natural`, and shared bag/wishlist URLs still open through the compatibility router. Root visitors get crawlable English HTML and JavaScript restores their saved language.

Set the production origin in `assets/js/content/seo.js` when the custom domain is ready. Titles, descriptions, canonical links, reciprocal EN/KO hreflang links, Open Graph, Twitter cards, and JSON-LD are generated per page and updated during browser navigation. Product schema describes catalog pieces without inventing stock, reviews, or checkout offers. Bags and wishlists use `noindex,follow` and stay outside the sitemap. `robots.txt` permits crawling and points to the generated sitemap.

The static build checks all 32 public pages, language alternates, product schema, and utility-page indexing rules. Also verify the Vercel preview at direct localized URLs with JavaScript disabled and confirm navigation, language switching, natural/lab pricing, saved selections, and mocked forms with JavaScript enabled. After merging, check the actual production responses, then submit the sitemap in Search Console as part of launch.

References: [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions), [Vercel project configuration](https://vercel.com/docs/project-configuration).

## Stage 5: production hardening

All generated pages have one main heading, a bilingual skip-to-content link, descriptive image alternatives and intrinsic image dimensions. Navigation exposes the current page; keyboard navigation moves focus into the new content, language switching retains focus, and Escape closes the mobile menu. Ring-size help uses a native modal dialog. Reduced-motion settings suppress shared animations. Long headings wrap at narrow phone widths and source links stay visibly underlined.

The original gemstone-selection PNG is preserved; pages use a WebP derivative (227,554 bytes versus 2,568,192 bytes, about 91% smaller). Existing catalog/editorial WebP images are retained. Main visuals have high fetch priority, other editorial images stay lazy-loaded, and font origins are preconnected. Dimensions live in content/images.js; update them when replacing images.

Vercel response headers restrict scripts to this origin, allow the existing Google Fonts and Formspree dependencies, disallow framing and embedded objects, disable unused camera/microphone/location permissions, and prevent MIME sniffing. Vercel's existing HSTS remains unchanged. When adding a new external service or a future 3D viewer, review these allowlists. [CSP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).

If a JavaScript enhancement fails to load, the static content and normal page links remain usable and the mobile menu still opens. Failed or timed-out inquiries preserve typed content and announce an error. Native required-field validation remains in place.

Run npm run build then npm test: permanent checks cover all 36 pages, local links and assets, heading/alt/dimension checks, metadata, schema and independent rendering. Vercel runs these checks before publishing each deployment. Browser QA additionally covers enforced CSP, accessibility scans, six viewport widths in both languages, keyboard controls, ring sizing, forms with mocked errors/success, and startup failure. Automated accessibility checks are useful regression coverage; they do not replace a screen-reader review or testing on physical phones. No real inquiry is sent by automated tests.

Before launch, check the merged production response headers and page flows, complete the real Formspree delivery smoke test, and confirm custom-domain redirects. Temporary migration, cleanup and local browser-audit scripts are not part of the published source.
