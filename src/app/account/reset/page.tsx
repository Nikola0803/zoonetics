"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveAuth } from "@/lib/auth";

export default function ResetPage() {
  return (
    <Suspense fallback={null}>
      <ResetPageInner />
    </Suspense>
  );
}

function ResetPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (!token || !email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F4EE] px-4">
        <div className="max-w-sm text-center">
          <p className="text-sm font-semibold text-red-600">Invalid reset link. Please request a new one.</p>
          <a href="/account" className="mt-4 inline-block text-sm font-bold text-[#2B1810] underline">Back to sign in</a>
        </div>
      </main>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Reset failed. The link may have expired.");
      saveAuth(data);
      setDone(true);
      setTimeout(() => router.push("/account"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F4EE] px-4">
        <div className="max-w-sm text-center">
          <div className="mb-4 text-4xl">&#10003;</div>
          <p className="text-base font-bold text-[#2B1810]">Password updated. Redirecting...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F4EE] px-4">
      <div className="w-full max-w-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#4F6EF7]">ZOONETICS Account</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-[#17233B]">Set new password</h1>
        <p className="mt-2 text-sm text-[#17233B]/60">Resetting password for <strong>{email}</strong></p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-[#17233B]/60">New password</span>
            <input
              required minLength={8} type="password" autoComplete="new-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#17233B]/14 bg-[#F6F8FC] px-4 text-sm font-semibold text-[#17233B] outline-none transition focus:border-[#4F6EF7]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-[#17233B]/60">Confirm new password</span>
            <input
              required minLength={8} type="password" autoComplete="new-password"
              value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#17233B]/14 bg-[#F6F8FC] px-4 text-sm font-semibold text-[#17233B] outline-none transition focus:border-[#4F6EF7]"
            />
          </label>
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="h-12 w-full rounded-xl bg-[#2B1810] text-sm font-bold text-[#F8F4EE] transition hover:bg-[#6B3E22] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
