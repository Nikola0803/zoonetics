# Canis Continuum

A standalone, dog-first longevity and peptide research storefront concept spun out from the EVLV platform.

## Status

- Independent Git repository on `codex/pet-peptides-launch`
- Premium launch homepage implemented
- Original generated imagery stored in `public/images/canis/`
- Existing CRM, catalog, checkout, account, affiliate, and attribution code retained for later activation
- Search indexing intentionally disabled until veterinary, legal, claims, and product reviews are complete

The current public surface is an educational pre-launch concept. It deliberately does not sell or dose compounds.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## CRM activation

Copy `.env.example` to `.env.local` and configure the existing CRM variables. Register the pet brand as a separate CRM store/brand and use its own `CRM_STORE_DOMAIN`, API key, tracking key, payment destinations, sender identity, and public origin. See `docs/PET-CRM-HANDOFF.md` before enabling commerce.

## Working brand

“Canis Continuum” is a design-stage name, not a cleared trademark. Replace the name and metadata once naming clearance is complete.
