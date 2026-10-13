"use client";

import { FormEvent, useState } from "react";

export default function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "Please try again.");

      setStatus("success");
      setMessage(
        typeof data?.couponCode === "string"
          ? `You are in. Your 10% off code is ${data.couponCode}.`
          : "You are in. Watch your inbox for the next field note."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <section id="newsletter" className="overflow-hidden bg-[#29446F] px-5 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">The ZOONETICS Field Notes</p>
          <h2 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.5rem,4vw,4.1rem)] font-extrabold leading-[0.96] tracking-[-0.05em]">
            Start With One Vial. Save 10%.
          </h2>
          <p className="mt-6 max-w-xl text-[16px] font-medium leading-7 text-white/68">
            New K9 research profiles, lot releases, owner stories and practical research notes. Plus 10% off your first order.
          </p>
        </div>

        <div className="lg:pb-2">
          {status === "success" ? (
            <div className="rounded-[22px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A9C7FF]">Welcome To The Pack</p>
              <p className="mt-3 text-lg font-bold leading-7 text-white">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[22px] border border-white/15 bg-[#081624]/35 p-3 backdrop-blur-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="home-newsletter-email">Email address</label>
                <input
                  id="home-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="min-h-14 flex-1 rounded-xl border border-white/10 bg-white px-5 text-[15px] font-semibold text-[#17233B] outline-none placeholder:text-[#17233B]/38 focus:border-[#A9C7FF]"
                />
                <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" type="text" name="website" />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="min-h-14 rounded-xl bg-white px-7 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#17233B] transition hover:bg-[#DDE7FF] disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "submitting" ? "Joining..." : "Join The List"}
                </button>
              </div>
              {status === "error" && <p className="px-2 pt-3 text-xs font-semibold text-[#FFD0C8]">{message}</p>}
              <p className="px-2 pt-3 text-[10px] font-medium text-white/42">No spam. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
