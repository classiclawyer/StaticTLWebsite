# Atelier Tamara de Launay static website

A build-free static website. `index.html` is the entry point; CSS and JavaScript are separate so the page remains easy to edit and deploy.

## Structure

- `index.html` — document shell, navigation and mount point
- `assets/css/site.css` — formatted visual styles, kept in their original cascade order
- `assets/js/site.js` — startup and navigation listeners
- `assets/js/content/en.js`, `ko.js` — general page copy and navigation labels
- `assets/js/content/` — catalog, legal, cart, sharing and stone-guide content
- `assets/js/pages/` — one rendering function per page
- `assets/js/components/` — product cards, option groups, buttons and ring sizing
- `assets/js/features/` — cart, wishlist, sharing and inquiry submission
- `assets/js/core/` — routing, language, browser storage and event binding
- `assets/images/brand/` — logo and favicon
- `assets/images/collection/` — collection photographs
- `assets/images/bespoke/` — bespoke photographs and process images
- `assets/images/portraits/` — founder portraits
- `assets/images/guides/` — illustrations and sizing guide

## Local preview

Serve the repository root with a static server, for example `python3 -m http.server 8000`, and open `http://localhost:8000`. Use HTTP rather than opening `index.html` directly: browser JavaScript modules require it. Hash routes work without server rewrites. Vercel can deploy the repository root as a static site with no build command or backend.

## Editing

All nine product records live in the exported `products` array in `assets/js/content/products.js`. Keep the existing numeric IDs: product links, saved bag selections and wishlists use them. The array order determines the listing order across the collection. Images remain in `assets/images/collection/`; each record stores its image path.

Required fields are `id`, `name`, `image`, `euro`, `krw`, `description-en`, `oneliner-en`, `description-kr`, `oneliner-kr`, `stone`, `gold`, and `count`. Prices are numeric starting prices. `temporary-usd` contains explicitly temporary USD catalog values requested for the preview. The renderer uses the language-specific EUR or KRW price when supplied, otherwise this clearly labeled USD placeholder. Remove the placeholder when real prices are entered. `stone` is the supplied total diamond weight in ct, `gold` is the gold weight in g, and `count` is the supplied number of stones. An empty string means the information is missing; EUR and KRW prices are currently empty. Do not infer exchange rates, missing weights, or stone counts.

Additional fields preserve existing information: `name-kr`, `gold-purity`, `center-stone`, `melee-stone`, `diamond-color`, `gold-color`, and `kind`. Center and melee weights remain separate when no total was supplied. `kind` identifies the jewelry type. Product-specific copy and specifications should be edited only here; `content/catalog.js` retains shared interface copy and derives its product lookup lists from this array. `components/products.js` renders the records for the collection, detail pages, bag and wishlist.

Keep filenames and references in sync when adding images. Edit general text in `content/en.js` and `content/ko.js`; keep their keys aligned. Feature-specific translations live beside the related data in `content/catalog.js`, `legal.js`, `cart.js`, `sharing.js` and `stones.js`. Shared editorial labels and source links live in `content/site.js`. Some short labels remain in their page or component templates.

Change page markup in `pages/` and reusable markup in `components/`. Interaction handlers are attached after each render in `core/events.js`. Use explicit imports rather than adding global variables. Language changes go through `setLanguage()`; storage helpers retain the existing saved cart and wishlist keys. Keep comments to brief explanations of non-obvious behavior.

No secrets or private customer data belong in this repository. The contact and cart inquiry forms submit to Formspree (`https://formspree.io/f/mdekydbn`) using `features/inquiry.js`. Formspree stores submissions and can email notifications to the account's verified target address. Instagram is an optional contact link. Keep the Formspree target email verified, monitor spam and submission limits, and never place API keys or private customer data in this repository. Review legal copy, product details and links before public launch.

## Refactor checks

Check every navigation route and all nine product pages in both languages. Verify language persistence, diamond origin after reload, cart add/remove, wishlist toggling, shared links and the mobile menu. Compare desktop and mobile layouts against the base branch. Keep CSS rules in order: later rules currently override earlier styles.

Use mocked responses for routine form regression checks so they do not send real inquiries. A mocked success confirms browser behavior, not email delivery.

## Form smoke test

On a preview branch, submit one clearly marked test inquiry from each form in both languages. Confirm the success message appears only after Formspree accepts it, the submitted fields appear in Formspree, and notification email arrives at the verified target address. Test a simulated network failure to confirm the form preserves typed content and shows an error. The site does not take orders or payment.
