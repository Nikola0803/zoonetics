# ZOONETICS

A dog-first K9 peptide storefront connected to the EVLV multi-brand command center.

## Status

- Independent ZOONETICS storefront repository
- Premium launch homepage implemented
- Original generated imagery stored in `public/images/canis/`
- CRM checkout, accounts, affiliate attribution, wholesale, newsletter, tracking, and catalog feeds are integrated

Commerce remains fail-closed until the production CRM and approved payment configuration are present.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## CRM activation

Copy `.env.example` to `.env.local` and configure the CRM variables. ZOONETICS is a separate brand inside the existing EVLV organization, selected with `CRM_STORE_DOMAIN=zoonetics.co`. It shares the organization API key but has its own tracking/form keys, sender identity, catalog mappings, customers, and order data. See `docs/PET-CRM-HANDOFF.md`.
