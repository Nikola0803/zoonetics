# EVLV Trade implementation

## Routes

- `/trade` — public acquisition page, plan economics, calculator, qualification, responsible-marketing standard, and FAQ.
- `/trade/apply` — seven-step application. Drafts remain in the current browser tab through `sessionStorage` and are removed after submission.
- `/trade/portal` — legacy URL that redirects to the authenticated, per-user wholesale panel at `/account?tab=wholesale`.
- `POST /api/trade/applications` — server-validated, rate-limited submission adapter.

## Configuration

Plans and discounts live in `src/lib/trade/config.ts`. Product eligibility is deliberately separate from plan-level discounts: the future CRM response must remain the source of truth for Partner Selection List membership, SKU-specific wholesale cost, minimum quantity, stock state, and suggested/MAP pricing where applicable.

The application captures lifecycle-compatible data for `started`, `submitted`, `under_review`, `needs_information`, `approved`, `declined`, and `suspended`. It also sends policy version, timestamps, source, UTM fields, geography, requested plan, channels, and acknowledgements.

## CRM connection required before production

The existing server-only `CRM_API_URL`, `CRM_ORG_API_KEY`, and `CRM_STORE_DOMAIN` variables are reused. When configured, the application adapter sends validated records to:

`POST {CRM_API_URL}/api/store/trade/applications`

That endpoint must return a JSON response containing a stable `applicationId` and initial `status`. It should store acknowledgements with their policy version and timestamp, prevent duplicate submissions as appropriate, and never include tax identifiers in analytics or routine request logs.

When CRM variables are absent, development uses an explicit preview adapter: fields are validated, but the submission is not persisted or transmitted. The success screen states this clearly and uses a `preview-*` reference. Production fails closed with a service-unavailable response and never fabricates a successful application.

Partner access uses the existing account/CRM token pattern. The storefront dashboard sends the current account token to the server-side CRM adapter, which must resolve the customer and authorize approved-partner access before returning any data. Do not send the complete wholesale catalog to unauthenticated clients and hide it with CSS. Required modules are application status, level, eligible catalog, per-SKU economics, inventory sync, batch/COA library, order builder, order history, reorder suggestions, approved assets, policies, education, and support.

## Analytics and privacy

Trade events use the existing CRM pixel wrapper. Events contain only step numbers, plan IDs, placement, and calculator scenario metadata. Names, emails, phone numbers, tax IDs, URLs, marketing text, and application answers are not emitted.

## Production launch checklist

1. Have qualified U.S. counsel review the reseller agreement, earnings representations, pricing/MAP language, tax treatment, distribution restrictions, disclosures, and policy version.
2. Implement and test the CRM application endpoint, reviewer workflow, access provisioning, and audit history.
3. Add server-side approved-partner authorization for every portal and wholesale-data request.
4. Connect the Partner Selection List to the existing product/inventory adapter, including SKU exclusions, minimums, and stock.
5. Confirm retention, encryption, access, and redaction rules for tax identifiers and applicant data.
6. Replace preview portal states with real loading, empty, error, and suspended states.
7. Run accessibility, narrow-iPhone Safari, security, rate-limit, analytics, and legal-copy reviews in production-like staging.
