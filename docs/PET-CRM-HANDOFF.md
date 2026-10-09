# Pet brand CRM handoff

The EVLV application layer was copied intact so its integration surface remains available without modifying the EVLV repository. Do not point this project at the EVLV production brand record.

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

1. Create a new CRM organization/brand record for the pet storefront.
2. Issue a pet-brand API key and tracking key; never reuse EVLV production credentials.
3. Set a new `CRM_STORE_DOMAIN` and public site URL.
4. Create dog-specific product records, SKUs, lots, COAs, inventory, pricing, and media.
5. Review every inherited transactional email and customer-facing route for EVLV naming before enabling it.
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
