# Pet brand CRM handoff

ZOONETICS uses the same CRM organization as EVLV but has its own `Brand` record. The organization API key is intentionally shared; `CRM_STORE_DOMAIN=zoonetics.co` is what isolates every storefront request to the ZOONETICS workspace.

## Retained integration seams

- `src/lib/crm-proxy.ts`: server-only store scoping and authenticated CRM requests
- `src/lib/product-feed.ts`: live price, inventory, media, and product merging
- `src/app/api/checkout/route.ts`: order creation and receipt handling
- `src/app/api/auth/*`: customer registration, login, and session validation
- `src/app/api/account/*`: account and order-history requests
- `src/app/api/contact/route.ts` and `src/app/api/newsletter/route.ts`: support and marketing capture
- affiliate, attribution, coupon, wholesale, membership, and verification endpoints
- CRM pixel helpers and campaign attribution components

## Brand-isolation checklist

1. Run `npm run db:seed:zoonetics` in the CRM to create or update the ZOONETICS brand and product mappings.
2. Reuse the EVLV organization API key and use only the ZOONETICS tracking/form keys printed by the seed.
3. Set a new `CRM_STORE_DOMAIN` and public site URL.
4. Create dog-specific product records, SKUs, lots, COAs, inventory, pricing, and media.
5. Keep ZOONETICS sender details on the Brand record; brand-specific email styling can be completed after functional activation.
6. Configure new verified payment destinations and sender domains.
7. Keep `robots.index` disabled until legal, veterinary, and claims review is signed off.
8. Replace static EVLV catalog fallbacks before exposing `/shop`.

## Required pre-commerce review

- Veterinary review of all educational and safety content
- Jurisdiction-specific legal review of research compounds, marketing, fulfillment, and labeling
- Claims substantiation and testimonial policy
- Ad-platform and payment-provider acceptance
- Adverse-event and customer-support process
- Product liability, privacy, terms, refund, and consent documents

The launch homepage intentionally avoids dosing instructions, clinical outcome promises, and checkout links until this checklist is complete.
