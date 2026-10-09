"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TRADE_PLANS, TRADE_POLICY_VERSION, type TradePlanId } from "@/lib/trade/config";
import type { TradeApplication } from "@/lib/trade/types";
import { trackTradeEvent } from "@/lib/trade/analytics";

const STEPS = ["Identity", "Business", "Channels", "Customers", "Starting level", "Standards", "Review"];
const STORAGE_KEY = "evlv_trade_application_draft";

const emptyApplication = (plan: TradePlanId): TradeApplication => ({
  legalName: "", email: "", phone: "", country: "United States", state: "", businessName: "", entityType: "", taxIdentifier: "", resaleCertificateStatus: "", website: "", socialProfiles: "", salesChannels: [], monthlyCustomerVolume: "", customerTypes: [], requestedPlan: plan, marketingApproach: "", attestResearchOnly: false, attestPolicies: false, consentContact: false, policyVersion: TRADE_POLICY_VERSION, source: "trade_application", utm: {}, startedAt: new Date().toISOString(),
});

export function TradeApplicationForm() {
  const searchParams = useSearchParams();
  const queryPlan = searchParams.get("plan") as TradePlanId | null;
  const initialPlan = TRADE_PLANS.some((plan) => plan.id === queryPlan) ? queryPlan! : "growth";
  const [form, setForm] = useState<TradeApplication>(() => emptyApplication(initialPlan));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ id: string; demo: boolean } | null>(null);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    const utm = Object.fromEntries([...searchParams.entries()].filter(([key]) => key.startsWith("utm_")));
    if (saved) {
      try { setForm({ ...emptyApplication(initialPlan), ...JSON.parse(saved), utm }); } catch { /* ignore invalid local draft */ }
    } else {
      setForm((current) => ({ ...current, requestedPlan: initialPlan, utm }));
    }
    trackTradeEvent("trade_apply_started", { requestedPlan: initialPlan });
  }, [initialPlan, searchParams]);

  useEffect(() => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form)); }, [form]);

  const selectedPlan = useMemo(() => TRADE_PLANS.find((plan) => plan.id === form.requestedPlan)!, [form.requestedPlan]);
  const set = <K extends keyof TradeApplication>(key: K, value: TradeApplication[K]) => setForm((current) => ({ ...current, [key]: value }));
  const toggle = (key: "salesChannels" | "customerTypes", value: string) => set(key, form[key].includes(value) ? form[key].filter((item) => item !== value) : [...form[key], value]);

  function validate(currentStep: number) {
    const next: Record<string, string> = {};
    if (currentStep === 0) {
      if (!form.legalName.trim()) next.legalName = "Enter your legal name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number.";
      if (!form.country) next.country = "Select a country.";
      if (!form.state.trim()) next.state = "Enter your state or region.";
    }
    if (currentStep === 1) {
      if (!form.businessName.trim()) next.businessName = "Enter your business or organization name.";
      if (!form.entityType) next.entityType = "Select an entity type.";
      if (!form.resaleCertificateStatus) next.resaleCertificateStatus = "Select a resale certificate status.";
    }
    if (currentStep === 2) {
      if (!form.salesChannels.length) next.salesChannels = "Select at least one sales channel.";
      if (form.website && !/^https?:\/\//i.test(form.website)) next.website = "Include https:// in the website URL.";
    }
    if (currentStep === 3) {
      if (!form.monthlyCustomerVolume) next.monthlyCustomerVolume = "Select an estimated monthly volume.";
      if (!form.customerTypes.length) next.customerTypes = "Select at least one customer type.";
    }
    if (currentStep === 4 && form.marketingApproach.trim().length < 40) next.marketingApproach = "Please provide at least 40 characters about your marketing approach.";
    if (currentStep === 5) {
      if (!form.attestResearchOnly) next.attestResearchOnly = "This confirmation is required.";
      if (!form.attestPolicies) next.attestPolicies = "Agreement to the program standards is required.";
      if (!form.consentContact) next.consentContact = "Contact consent is required to process the application.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextStep() {
    if (!validate(step)) return;
    trackTradeEvent("trade_apply_step_completed", { step: step + 1, stepName: STEPS[step] });
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    if (![0, 1, 2, 3, 4, 5].every(validate)) return;
    setSubmitting(true); setSubmitError("");
    try {
      const response = await fetch("/api/trade/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "The application could not be submitted.");
      setResult({ id: data.applicationId, demo: Boolean(data.demo) });
      sessionStorage.removeItem(STORAGE_KEY);
      trackTradeEvent("trade_application_submitted", { requestedPlan: form.requestedPlan, demo: Boolean(data.demo) });
    } catch (error) { setSubmitError(error instanceof Error ? error.message : "The application could not be submitted."); }
    finally { setSubmitting(false); }
  }

  if (result) return <SuccessState id={result.id} demo={result.demo} />;

  return (
    <div className="container-altr py-10 md:py-16">
      <div className="mb-10 flex items-center justify-between gap-4"><Link href="/trade" className="text-sm font-semibold text-sage-deep">← EVLV Trade</Link><span className="text-xs uppercase tracking-[.18em] text-charcoal/45">Application · {Math.round(((step + 1) / STEPS.length) * 100)}%</span></div>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-14">
        <aside><p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-deep">Application progress</p><ol className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-1">{STEPS.map((label, index) => <li key={label}><button type="button" disabled={index > step} onClick={() => index <= step && setStep(index)} className={`flex w-full items-center gap-3 rounded-md p-2 text-left text-sm ${index === step ? "bg-white font-semibold text-charcoal" : index < step ? "text-sage-deep" : "text-charcoal/35"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${index <= step ? "border-sage-deep" : "border-stone"}`}>{index < step ? "✓" : index + 1}</span><span>{label}</span></button></li>)}</ol><p className="mt-7 hidden text-xs leading-5 text-charcoal/45 lg:block">Your draft is kept only in this browser tab until you submit or close it. Sensitive application details are never sent to analytics.</p></aside>
        <main className="rounded-md border border-stone bg-white p-6 shadow-[0_20px_70px_rgba(14,17,19,.06)] sm:p-9 lg:p-12">
          {step === 0 && <StepIdentity form={form} set={set} errors={errors} />}
          {step === 1 && <StepBusiness form={form} set={set} errors={errors} />}
          {step === 2 && <StepChannels form={form} set={set} toggle={toggle} errors={errors} />}
          {step === 3 && <StepCustomers form={form} set={set} toggle={toggle} errors={errors} />}
          {step === 4 && <StepPlan form={form} set={set} selectedPlan={selectedPlan} errors={errors} />}
          {step === 5 && <StepStandards form={form} set={set} errors={errors} />}
          {step === 6 && <StepReview form={form} selectedPlan={selectedPlan} onEdit={setStep} />}
          {submitError && <p role="alert" className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">{submitError}</p>}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-stone pt-6 sm:flex-row sm:justify-between"><button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded-md border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal disabled:invisible">Back</button>{step < STEPS.length - 1 ? <button type="button" onClick={nextStep} className="rounded-md bg-charcoal px-7 py-3 text-sm font-semibold text-white hover:bg-sage-deep">Continue</button> : <button type="button" disabled={submitting} onClick={submit} className="rounded-md bg-sage-deep px-7 py-3 text-sm font-semibold text-white disabled:opacity-50">{submitting ? "Submitting…" : "Submit application"}</button>}</div>
        </main>
      </div>
    </div>
  );
}

type Setter = <K extends keyof TradeApplication>(key: K, value: TradeApplication[K]) => void;
type Toggle = (key: "salesChannels" | "customerTypes", value: string) => void;
const Heading = ({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) => <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-deep">{eyebrow}</p><h1 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-charcoal/60">{body}</p></div>;

function Field({ label, value, onChange, error, required, type = "text", placeholder, autoComplete }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; type?: string; placeholder?: string; autoComplete?: string }) { const id = label.toLowerCase().replace(/\W+/g, "-"); return <label className="block" htmlFor={id}><span className="mb-2 block text-sm font-medium">{label}{required && <span className="text-sage-deep"> *</span>}</span><input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="w-full rounded-md border border-stone bg-ivory-soft px-4 py-3 text-base outline-none transition focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/15" />{error && <span id={`${id}-error`} className="mt-1.5 block text-xs text-red-700">{error}</span>}</label>; }
function SelectField({ label, value, onChange, options, error, required }: { label: string; value: string; onChange: (value: string) => void; options: string[]; error?: string; required?: boolean }) { return <label className="block"><span className="mb-2 block text-sm font-medium">{label}{required && <span className="text-sage-deep"> *</span>}</span><select value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} className="w-full rounded-md border border-stone bg-ivory-soft px-4 py-3 text-base outline-none focus:border-sage-deep"><option value="">Select one</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{error && <span className="mt-1.5 block text-xs text-red-700">{error}</span>}</label>; }
function ChoiceGrid({ label, choices, selected, onToggle, error }: { label: string; choices: string[]; selected: string[]; onToggle: (value: string) => void; error?: string }) { return <fieldset><legend className="mb-3 text-sm font-medium">{label} <span className="text-sage-deep">*</span></legend><div className="grid gap-2 sm:grid-cols-2">{choices.map((choice) => <label key={choice} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm ${selected.includes(choice) ? "border-sage-deep bg-sage-deep/[.06]" : "border-stone"}`}><input type="checkbox" checked={selected.includes(choice)} onChange={() => onToggle(choice)} className="h-4 w-4 accent-[#203a37]" />{choice}</label>)}</div>{error && <p className="mt-2 text-xs text-red-700">{error}</p>}</fieldset>; }

function StepIdentity({ form, set, errors }: { form: TradeApplication; set: Setter; errors: Record<string, string> }) { return <><Heading eyebrow="Step 1 of 7" title="Who is applying?" body="Use the applicant details EVLV should use for review and follow-up." /><div className="grid gap-5 sm:grid-cols-2"><Field label="Legal name" required value={form.legalName} onChange={(v) => set("legalName", v)} error={errors.legalName} autoComplete="name" /><Field label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" /><Field label="Phone" type="tel" required value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" /><SelectField label="Country" required value={form.country} onChange={(v) => set("country", v)} options={["United States", "Canada", "United Kingdom", "Other"]} error={errors.country} /><Field label="State or region" required value={form.state} onChange={(v) => set("state", v)} error={errors.state} autoComplete="address-level1" /></div></>; }
function StepBusiness({ form, set, errors }: { form: TradeApplication; set: Setter; errors: Record<string, string> }) { return <><Heading eyebrow="Step 2 of 7" title="Tell us about the business." body="EVLV uses this information to assess entity and resale-documentation readiness." /><div className="grid gap-5 sm:grid-cols-2"><Field label="Business or organization name" required value={form.businessName} onChange={(v) => set("businessName", v)} error={errors.businessName} autoComplete="organization" /><SelectField label="Entity type" required value={form.entityType} onChange={(v) => set("entityType", v)} options={["LLC", "Corporation", "Partnership", "Sole proprietor", "Nonprofit", "Research organization", "Other"]} error={errors.entityType} /><Field label="EIN or tax identifier" value={form.taxIdentifier} onChange={(v) => set("taxIdentifier", v)} placeholder="If applicable" /><SelectField label="Resale certificate status" required value={form.resaleCertificateStatus} onChange={(v) => set("resaleCertificateStatus", v)} options={["Current and available", "Application in progress", "Not required in my jurisdiction", "Not yet obtained"]} error={errors.resaleCertificateStatus} /></div><p className="mt-5 rounded-md bg-ivory-soft p-4 text-xs leading-5 text-charcoal/55">Tax identifiers are collected only for application review and are excluded from analytics. Confirm production data-handling requirements with counsel before launch.</p></>; }
function StepChannels({ form, set, toggle, errors }: { form: TradeApplication; set: Setter; toggle: Toggle; errors: Record<string, string> }) { return <><Heading eyebrow="Step 3 of 7" title="Where do you sell?" body="Share the channels EVLV should evaluate. A website is not required for every qualified model." /><div className="space-y-6"><ChoiceGrid label="Current sales channels" choices={["B2B direct sales", "Owned ecommerce site", "Physical retail or laboratory supply", "Marketplace", "Research events or conferences", "Other"]} selected={form.salesChannels} onToggle={(v) => toggle("salesChannels", v)} error={errors.salesChannels} /><div className="grid gap-5 sm:grid-cols-2"><Field label="Website" value={form.website} onChange={(v) => set("website", v)} placeholder="https://" error={errors.website} /><Field label="Social profiles" value={form.socialProfiles} onChange={(v) => set("socialProfiles", v)} placeholder="Links or handles" /></div></div></>; }
function StepCustomers({ form, set, toggle, errors }: { form: TradeApplication; set: Setter; toggle: Toggle; errors: Record<string, string> }) { return <><Heading eyebrow="Step 4 of 7" title="Describe your research market." body="Help EVLV understand the organizations and qualified customers your operation serves." /><div className="space-y-6"><SelectField label="Estimated monthly research-customer volume" required value={form.monthlyCustomerVolume} onChange={(v) => set("monthlyCustomerVolume", v)} options={["Fewer than 10", "10–25", "26–75", "76–150", "More than 150", "Pre-launch"]} error={errors.monthlyCustomerVolume} /><ChoiceGrid label="Primary customer types" choices={["Independent laboratories", "Academic research groups", "Biotechnology organizations", "Specialty research suppliers", "Qualified commercial research customers", "Other"]} selected={form.customerTypes} onToggle={(v) => toggle("customerTypes", v)} error={errors.customerTypes} /></div></>; }
function StepPlan({ form, set, selectedPlan, errors }: { form: TradeApplication; set: Setter; selectedPlan: (typeof TRADE_PLANS)[number]; errors: Record<string, string> }) { return <><Heading eyebrow="Step 5 of 7" title="Choose a starting level." body="This is a request, not a commitment. Final access and eligible SKUs depend on review and the current partner price chart." /><div className="grid gap-3 sm:grid-cols-2">{TRADE_PLANS.map((plan) => <label key={plan.id} className={`cursor-pointer rounded-md border p-5 ${form.requestedPlan === plan.id ? "border-sage-deep bg-sage-deep/[.06]" : "border-stone"}`}><input className="sr-only" type="radio" name="plan" value={plan.id} checked={form.requestedPlan === plan.id} onChange={() => set("requestedPlan", plan.id)} /><span className="flex items-center justify-between"><span className="font-display text-xl font-medium">{plan.name}</span><span className="text-sm text-sage-deep">${plan.openingOrder.toLocaleString()}</span></span><span className="mt-3 block text-sm leading-6 text-charcoal/55">{plan.useCase}</span></label>)}</div><label className="mt-7 block"><span className="mb-2 block text-sm font-medium">How will you market EVLV? <span className="text-sage-deep">*</span></span><textarea rows={5} value={form.marketingApproach} onChange={(e) => set("marketingApproach", e.target.value)} className="w-full resize-y rounded-md border border-stone bg-ivory-soft px-4 py-3 text-base outline-none focus:border-sage-deep" placeholder="Describe your channels, customer acquisition approach, and how you will maintain research-only positioning." />{errors.marketingApproach && <span className="mt-1.5 block text-xs text-red-700">{errors.marketingApproach}</span>}<span className="mt-1 block text-right text-xs text-charcoal/40">{form.marketingApproach.length} characters</span></label><p className="sr-only">Selected plan: {selectedPlan.name}</p></>; }
function StepStandards({ form, set, errors }: { form: TradeApplication; set: Setter; errors: Record<string, string> }) { return <><Heading eyebrow="Step 6 of 7" title="Confirm the operating standard." body={`These acknowledgements will be stored with policy version ${form.policyVersion} and a submission timestamp.`} /><div className="space-y-4"><Attestation checked={form.attestResearchOnly} onChange={(v) => set("attestResearchOnly", v)} error={errors.attestResearchOnly}>I confirm the catalog will not be marketed for human or veterinary use, dosing, treatment, disease, weight loss, anti-aging, bodybuilding, or other personal outcomes.</Attestation><Attestation checked={form.attestPolicies} onChange={(v) => set("attestPolicies", v)} error={errors.attestPolicies}>I agree to follow the approved-claims, brand, suggested-pricing/MAP where applicable, disclosure, documentation, and resale policies provided with an approved account.</Attestation><Attestation checked={form.consentContact} onChange={(v) => set("consentContact", v)} error={errors.consentContact}>I consent to EVLV contacting me about this application and requesting additional verification.</Attestation></div><p className="mt-6 text-xs leading-5 text-charcoal/45">EVLV Trade does not pay recruitment commissions, use downlines or uplines, require recurring purchases, or guarantee income. Resellers earn through their own retail activity.</p></>; }
function Attestation({ checked, onChange, error, children }: { checked: boolean; onChange: (value: boolean) => void; error?: string; children: React.ReactNode }) { return <label className={`flex cursor-pointer items-start gap-4 rounded-md border p-4 ${error ? "border-red-300" : checked ? "border-sage-deep bg-sage-deep/[.05]" : "border-stone"}`}><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#203a37]" /><span><span className="text-sm leading-6 text-charcoal/70">{children}</span>{error && <span className="mt-1 block text-xs text-red-700">{error}</span>}</span></label>; }
function StepReview({ form, selectedPlan, onEdit }: { form: TradeApplication; selectedPlan: (typeof TRADE_PLANS)[number]; onEdit: (step: number) => void }) { const sections = [["Applicant", `${form.legalName} · ${form.email} · ${form.phone}`, 0], ["Business", `${form.businessName} · ${form.entityType} · ${form.resaleCertificateStatus}`, 1], ["Channels", form.salesChannels.join(", "), 2], ["Research market", `${form.monthlyCustomerVolume} monthly · ${form.customerTypes.join(", ")}`, 3], ["Requested level", `${selectedPlan.name} · $${selectedPlan.openingOrder.toLocaleString()} opening order`, 4], ["Standards", `All required acknowledgements accepted · policy ${form.policyVersion}`, 5]] as const; return <><Heading eyebrow="Step 7 of 7" title="Review and submit." body="Check the application before sending it for review. Submission is not approval and no review timeline is promised." /><div className="divide-y divide-stone border-y border-stone">{sections.map(([label, value, target]) => <div key={label} className="grid gap-2 py-4 sm:grid-cols-[140px_1fr_auto] sm:items-start"><p className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">{label}</p><p className="text-sm leading-6 text-charcoal/70">{value || "Not provided"}</p><button type="button" onClick={() => onEdit(target)} className="justify-self-start text-xs font-semibold text-sage-deep underline underline-offset-4">Edit</button></div>)}</div><div className="mt-6 rounded-md bg-ivory-soft p-5"><p className="text-sm font-medium">Marketing approach</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-charcoal/60">{form.marketingApproach}</p></div></>; }
function SuccessState({ id, demo }: { id: string; demo: boolean }) { return <div className="container-altr flex min-h-[70vh] items-center justify-center py-16"><div className="max-w-2xl rounded-md border border-stone bg-white p-8 text-center shadow-[0_20px_70px_rgba(14,17,19,.06)] sm:p-12"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-deep text-xl text-white">✓</span><p className="mt-7 text-xs font-semibold uppercase tracking-[.2em] text-sage-deep">Application {demo ? "preview complete" : "submitted"}</p><h1 className="mt-3 font-display text-4xl font-medium tracking-tight">Your application is ready for review.</h1>{demo ? <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">This localhost preview is not connected to the EVLV CRM. Your submission was validated but was not stored or sent. Production launch requires the documented CRM endpoint.</p> : <p className="mt-5 text-base leading-7 text-charcoal/60">EVLV will review the information and contact you if clarification or verification is needed. Approval is not automatic.</p>}<p className="mt-5 text-xs text-charcoal/40">Reference {id}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/trade" className="rounded-md bg-charcoal px-6 py-3 text-sm font-semibold text-white">Return to EVLV Trade</Link><Link href="/account?tab=wholesale" className="rounded-md border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal">Open partner account</Link></div></div></div>; }
