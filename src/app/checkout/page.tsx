"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_COST, ShippingProgressBar } from "@/components/layout/CartUpsellOffers";
import { getStoredUser } from "@/lib/auth";
import { PAYMENT_GATEWAYS, type PaymentGatewayId } from "@/lib/payment-config";
import { getStoredCouponCode, setStoredCouponCode } from "@/lib/referral";
import { useCouponValidation } from "@/lib/use-coupon-validation";
import { trackEvent } from "@/lib/pixel";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const CA_PROVINCES = ["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"];

const MEMO_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // avoids ambiguous 0/O/1/I/L
const RESERVATION_MS = 2 * 60 * 60 * 1000; // 2 hours

function generateMemo() {
  let code = "";
  for (let i = 0; i < 4; i++) code += MEMO_CHARS[Math.floor(Math.random() * MEMO_CHARS.length)];
  return code;
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState<"US" | "CA">("US");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [ruoAttestation, setRuoAttestation] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [couponCode, setCouponCode] = useState(() => getStoredCouponCode());

  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayId | null>(null);
  const [memo, setMemo] = useState(() => generateMemo());
  const [expiresAt, setExpiresAt] = useState(() => Date.now() + RESERVATION_MS);
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);
  const [handleCopied, setHandleCopied] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const idempotencyKey = useRef<string | null>(null);

  const cartItemsForCoupon = lines.map((l) => ({ slug: l.product.slug, quantity: l.qty }));
  // Prefer the signed-in account's email so a personal lifetime deal
  // previews immediately on page load; fall back to whatever the shopper
  // has typed into the email field so far (guest checkout).
  const storedUserEmail = getStoredUser()?.email;
  const couponCustomerEmail = storedUserEmail || email.trim() || undefined;
  const coupon = useCouponValidation(couponCode, cartItemsForCoupon, couponCustomerEmail);
  const discount = coupon.valid ? coupon.discountUsd : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_COST;
  const total = Math.max(0, subtotal - discount + shipping);
  const shippingComplete = Boolean(
    firstName.trim() && lastName.trim() && email.trim() && phone.trim() && address1.trim() && city.trim() && stateCode && zip.trim()
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lines.length > 0) trackEvent("begin_checkout");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) return;
    const timer = window.setTimeout(() => trackEvent("identify", { email: trimmed }), 800);
    return () => window.clearTimeout(timer);
  }, [email]);

  const remainingMs = expiresAt - now;
  const expired = remainingMs <= 0;
  const selectedGatewayInfo = PAYMENT_GATEWAYS.find((g) => g.id === selectedGateway) ?? null;

  function handleRegenerate() {
    setMemo(generateMemo());
    setExpiresAt(Date.now() + RESERVATION_MS);
  }

  async function handleCopyMemo() {
    try {
      await navigator.clipboard.writeText(memo);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, code is still visible to copy manually */
    }
  }

  async function handleCopyGatewayHandle() {
    if (!selectedGatewayInfo?.handle) return;
    try {
      await navigator.clipboard.writeText(selectedGatewayInfo.handle);
      setHandleCopied(true);
      window.setTimeout(() => setHandleCopied(false), 1800);
    } catch {
      /* clipboard unavailable, handle is still visible to copy manually */
    }
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGateway || expired || !shippingComplete || !ruoAttestation || placing) return;
    setPlacing(true);
    setCheckoutError("");

    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20_000);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey.current },
        signal: controller.signal,
        body: JSON.stringify({
          items: lines.map((l) => ({ slug: l.product.slug, quantity: l.qty })),
          paymentMethod: selectedGateway,
          paymentMemo: memo,
          couponCode: couponCode.trim() || undefined,
          // Same value doubles as the affiliate ?ref= candidate - the CRM's
          // order engine tries couponCode first, then affiliateRef, against
          // Affiliate.couponCode/slug (see order-engine.ts).
          affiliateRef: couponCode.trim() || undefined,
          // A real price-discount coupon (distinct from the affiliate
          // attribution code above) -- runCheckout() looks this up
          // separately and no-ops if it does not match a Coupon row, so
          // it is always safe to send even when the code above is really
          // just a referral code.
          discountCode: couponCode.trim() || undefined,
          customerNote: [
            `RUO attestation: purchaser confirmed laboratory/research use only at ${new Date().toISOString()}.`,
            orderNotes.trim() || undefined,
          ]
            .filter(Boolean)
            .join(" | "),
          ruoAttested: true,
          ruoAttestedAt: new Date().toISOString(),
          // The deployed CRM's checkout also requires a top-level customerEmail
          // for guest checkout (billing.email alone isn't enough there).
          customerEmail: email.trim(),
          billing: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address1: address1.trim(),
            city: city.trim(),
            state: stateCode,
            zip: zip.trim(),
            country,
          },
        }),
      });
      window.clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCheckoutError(typeof data.error === "string" ? data.error : "Checkout failed. No order was created.");
        return;
      }
      if (typeof data.receipt !== "string" || !data.receipt) {
        setCheckoutError("The order system returned an invalid confirmation. Please contact support before retrying.");
        return;
      }
      clearCart();
      router.push(`/order-success?receipt=${encodeURIComponent(data.receipt)}`);
    } catch (error) {
      setCheckoutError(
        error instanceof DOMException && error.name === "AbortError"
          ? "Checkout timed out. No order was confirmed. Please verify with support before retrying."
          : "Checkout could not reach the order system. No order was confirmed; please try again.",
      );
    } finally {
      setPlacing(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="bg-[#FBFCFF] px-5 py-28 text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.035em] text-[#17233B]">Your Cart Is Empty</h1>
        <p className="mt-3 text-sm font-medium text-[#17233B]/55">Explore the K9 research line before checking out.</p>
        <Link href="/shop" className="mt-7 inline-block rounded-full bg-[#17233B] px-7 py-3.5 text-[12px] font-extrabold text-white transition hover:bg-[#4F6EF7]">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F6FC] px-5 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1260px]">
      <div className="mb-10 flex flex-col gap-4 border-b border-[#17233B]/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#4F6EF7]">Secure Order</p><h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em] text-[#17233B] md:text-5xl">Complete Your Order.</h1></div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#17233B]/55"><span><i className="ri-shield-check-line mr-1.5 text-[#4F6EF7]" />Protected checkout</span><span><i className="ri-flask-line mr-1.5 text-[#4F6EF7]" />Lot-level COA</span><span><i className="ri-truck-line mr-1.5 text-[#4F6EF7]" />Tracked dispatch</span></div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_460px] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-[24px] border border-[#17233B]/10 bg-white p-6 shadow-[0_20px_60px_rgba(23,35,59,0.06)] md:p-8">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-charcoal/50">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First Name" required value={firstName} onChange={setFirstName} placeholder="John" />
              <Field label="Last Name" required value={lastName} onChange={setLastName} placeholder="Doe" />
              <Field label="Email Address" required type="email" value={email} onChange={setEmail} placeholder="you@lab.edu" className="sm:col-span-2" />
              <Field label="Phone Number" required type="tel" value={phone} onChange={setPhone} placeholder="+1 (555) 000-0000" className="sm:col-span-2" />
              <Field label="Street Address" required value={address1} onChange={setAddress1} placeholder="123 Research Blvd, Suite 100" className="sm:col-span-2" />

              <div>
                <label className="mb-2 block text-sm font-medium text-charcoal/70">
                  Country <span className="text-copper">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value as "US" | "CA");
                    setStateCode("");
                  }}
                  className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base text-charcoal outline-none focus:border-copper"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
              <Field label="City" required value={city} onChange={setCity} placeholder="Boston" />

              <div>
                <label className="mb-2 block text-sm font-medium text-charcoal/70">
                  {country === "US" ? "State" : "Province"} <span className="text-copper">*</span>
                </label>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base text-charcoal outline-none focus:border-copper"
                >
                  <option value="" disabled>
                    Select {country === "US" ? "state" : "province"}...
                  </option>
                  {(country === "US" ? US_STATES : CA_PROVINCES).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Postal / ZIP Code" required value={zip} onChange={setZip} placeholder="02110" maxLength={10} />
            </div>

            <label className="mt-6 flex items-start gap-3 rounded-lg border border-stone bg-ivory-soft p-4">
              <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-copper" />
              <span className="text-xs leading-relaxed text-charcoal/60">
                By checking this box, you agree to receive text messages from ZOONETICS at the number provided. Consent
                is not a condition to purchase. Message frequency varies. Message and data rates may apply. Reply
                STOP to cancel or HELP for help. View our{" "}
                <Link href="/privacy" className="text-copper hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-copper hover:underline">
                  Terms of Service
                </Link>
                .
              </span>
            </label>
          </section>

          <section className="rounded-[24px] border border-[#17233B]/10 bg-white p-6 shadow-[0_20px_60px_rgba(23,35,59,0.06)] md:p-8">
            <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-charcoal/50">
              Promo / Referral Code <span className="font-normal normal-case text-charcoal/40">(optional)</span>
            </label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                const next = e.target.value.toUpperCase();
                setCouponCode(next);
                setStoredCouponCode(next);
              }}
              placeholder="Enter a code"
              className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base uppercase tracking-wide text-charcoal outline-none placeholder:text-charcoal/40 placeholder:normal-case focus:border-copper"
            />
            {coupon.checking && <p className="mt-1.5 text-xs text-charcoal/40">Checking code...</p>}
            {!coupon.checking && coupon.valid && (
              <p className="mt-1.5 text-xs font-medium text-sage-deep">
                {couponCode.trim() ? "Code applied" : "Member reward applied"} -- {formatPrice(coupon.discountUsd)} off
                {coupon.flooredByMargin ? " (partial, discount limit reached)" : ""}
              </p>
            )}
          </section>

          <section className="rounded-[24px] border border-[#17233B]/10 bg-white p-6 shadow-[0_20px_60px_rgba(23,35,59,0.06)] md:p-8">
            <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-charcoal/50">
              Order Notes <span className="font-normal normal-case text-charcoal/40">(optional)</span>
            </label>
            <textarea
              maxLength={500}
              rows={4}
              placeholder="Any special instructions or notes..."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="w-full resize-none rounded-md border border-stone bg-white px-4 py-3.5 text-base text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper"
            />
            <p className="mt-1.5 text-right text-xs text-charcoal/40">{orderNotes.length}/500</p>
          </section>
        </div>

        <div className="h-fit space-y-6 lg:sticky lg:top-[106px]">
          <div className="rounded-[24px] border border-[#17233B]/10 bg-white p-6 shadow-[0_24px_70px_rgba(23,35,59,0.09)]">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal/50">Order Summary</h2>
            <ShippingProgressBar />
            <div className="space-y-5">
              {lines.map((line) => (
                <div key={`${line.product.id}-${line.packLabel}`} className="flex gap-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-white">
                    {line.product.image && <Image src={line.product.image} alt={line.product.name} width={120} height={150} className="h-full w-full object-cover" />}
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-semibold text-ivory">{line.qty}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-charcoal">{line.product.name}</p>
                    <p className="text-sm text-charcoal/50">{line.packLabel}</p>
                  </div>
                  <span className="text-base font-semibold text-charcoal">{formatPrice(line.qty * line.unitPrice)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-stone pt-5 text-base">
              <div className="flex items-center justify-between">
                <span className="text-charcoal/60">Subtotal</span>
                <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sage-deep">
                    Discount{couponCode.trim() ? ` (${couponCode.trim()})` : " (member reward)"}
                  </span>
                  <span className="font-medium text-sage-deep">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-charcoal/60">Shipping</span>
                <span className="font-medium text-charcoal">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-stone pt-3 text-lg">
                <span className="font-medium text-charcoal">Total</span>
                <span className="font-display text-xl font-semibold text-charcoal">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal/50">Payment Method</h2>
            {PAYMENT_GATEWAYS.length === 0 && (
              <div className="rounded-lg border border-copper/40 bg-copper/5 p-4 text-sm leading-relaxed text-charcoal/70">
                Checkout is temporarily unavailable while Warrior Distributions verifies its payment accounts. No payment destination will be shown until it is confirmed.
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {PAYMENT_GATEWAYS.map((gw) => {
                const active = selectedGateway === gw.id;
                return (
                  <button
                    key={gw.id}
                    type="button"
                    onClick={() => {
                      setSelectedGateway(gw.id);
                      setHandleCopied(false);
                    }}
                    aria-pressed={active}
                    className={`relative flex flex-col items-center gap-2.5 rounded-xl border p-4 transition ${
                      active ? "border-[#4F6EF7] bg-[#EEF2FF]" : "border-[#17233B]/10 bg-white hover:border-[#4F6EF7]/50"
                    }`}
                  >
                    {active && <i className="ri-checkbox-circle-fill absolute right-2.5 top-2.5 text-base text-copper" />}
                    <i className={`${gw.icon} text-3xl ${active ? "text-copper" : "text-charcoal/40"}`} />
                    <span className={`text-sm font-medium ${active ? "text-copper" : "text-charcoal/60"}`}>{gw.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedGatewayInfo && (
              <div className="mt-4 rounded-lg border border-stone bg-ivory-soft p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-charcoal/70">
                  <i className={`${selectedGatewayInfo.icon} text-copper`} /> Send your {selectedGatewayInfo.label} payment to
                </p>
                {selectedGatewayInfo.handle ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="flex h-12 flex-1 items-center truncate rounded-md border border-copper/40 bg-white px-4 font-mono text-base text-copper">
                        {selectedGatewayInfo.handle}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyGatewayHandle}
                        className="h-12 shrink-0 whitespace-nowrap rounded-md border border-stone px-4 text-sm font-medium text-charcoal/70 transition hover:border-copper hover:text-copper"
                      >
                        {handleCopied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-md border border-stone/80 bg-white/70 px-3.5 py-3">
                      <i className="ri-shield-check-line text-base text-sage-deep" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal/40">Recipient</p>
                        <p className="mt-0.5 text-sm font-semibold text-charcoal">{selectedGatewayInfo.recipient}</p>
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-charcoal/50">{selectedGatewayInfo.handleNote}</p>
                  </>
                ) : (
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-charcoal/60">
                    <i className="ri-mail-send-line mt-0.5 shrink-0 text-copper" />
                    We&rsquo;ll email your {selectedGatewayInfo.label} payment details right after you place this
                    order, along with your memo code below.
                  </p>
                )}
              </div>
            )}

            <div className="mt-4 rounded-lg border border-copper/30 bg-copper/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-charcoal">Payment Memo</label>
                {!expired ? (
                  <span className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-charcoal/50">
                    <i className="ri-time-line" /> Reserved {formatCountdown(remainingMs)}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-red-600">
                    <i className="ri-error-warning-line" /> Reservation expired
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-14 flex-1 items-center justify-center rounded-md border bg-white font-mono text-2xl tracking-[0.4em] ${
                    expired ? "border-stone text-charcoal/30" : "border-copper/40 text-copper"
                  }`}
                >
                  {memo}
                </span>
                <button
                  type="button"
                  onClick={handleCopyMemo}
                  disabled={expired}
                  className="h-14 shrink-0 whitespace-nowrap rounded-md border border-stone px-5 text-sm font-medium text-charcoal/70 transition hover:border-copper hover:text-copper disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-charcoal/50">
                Include this exact code in your {selectedGateway ? PAYMENT_GATEWAYS.find((g) => g.id === selectedGateway)?.label : "payment"} note
                so we can match your payment and dispatch faster. Your items are held for 2 hours. After that, stock
                releases back to general inventory.
              </p>
              {expired && (
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="mt-3 rounded-md border border-copper/40 bg-copper/10 px-4 py-2.5 text-sm font-medium text-copper transition hover:bg-copper/20"
                >
                  <i className="ri-refresh-line mr-1.5" /> Generate New Code
                </button>
              )}
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-stone bg-ivory-soft p-4">
            <input
              type="checkbox"
              checked={ruoAttestation}
              onChange={(e) => setRuoAttestation(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-copper"
            />
            <span className="text-xs leading-relaxed text-charcoal/60">
              I confirm I am purchasing these products exclusively for laboratory, analytical, or in-vitro research
              use by qualified personnel, not for human or animal consumption, administration, or any diagnostic
              or therapeutic purpose, in accordance with the{" "}
              <Link href="/ruo" className="text-copper hover:underline">
                Research Use Only Policy
              </Link>
              . I understand this order and its attestation are retained as part of the order record.
            </span>
          </label>

          <button
            type="submit"
            disabled={!selectedGateway || expired || !shippingComplete || !ruoAttestation || placing}
            className="w-full rounded-full bg-[#17233B] py-5 text-sm font-extrabold text-white transition hover:bg-[#4F6EF7] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {placing ? "Placing Order..." : `Confirm Order (${formatPrice(total)})`}
          </button>
          {checkoutError && (
            <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
              {checkoutError}
            </p>
          )}
        </div>
      </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  maxLength,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-charcoal/70">
        {label} {required && <span className="text-copper">*</span>}
      </label>
      <input
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper"
      />
    </div>
  );
}
