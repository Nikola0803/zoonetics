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
      <main className="flex min-h-screen items-center justify-center bg-[#101829] px-4">
        <div className="max-w-sm text-center">
          <p className="text-sm font-semibold text-red-400">Invalid reset link. Please request a new one.</p>
          <a href="/account" className="mt-4 inline-block text-sm font-bold text-[#A9C7FF] underline">Back to sign in</a>
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
      <main className="flex min-h-screen items-center justify-center bg-[#101829] px-4">
        <div className="max-w-sm text-center">
          <div className="mb-4 text-4xl text-[#A9C7FF]">&#10003;</div>
          <p className="text-base font-bold text-white">Password updated. Redirecting...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101829] px-4">
      <div className="w-full max-w-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#4F6EF7]">ZOONETICS Account</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-white">Set new password</h1>
        <p className="mt-2 text-sm text-white/60">Resetting password for <strong className="text-white/90">{email}</strong></p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-white/50">New password</span>
            <input
              required minLength={8} type="password" autoComplete="new-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#4F6EF7]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-white/50">Confirm new password</span>
            <input
              required minLength={8} type="password" autoComplete="new-password"
              value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#4F6EF7]"
            />
          </label>
          {error && <p className="rounded-lg bg-red-900/40 px-4 py-3 text-xs font-semibold text-red-300">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="h-12 w-full rounded-xl bg-[#17233B] text-sm font-bold text-white transition hover:bg-[#4F6EF7] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
        <a href="/account" className="mt-5 block text-center text-xs font-semibold text-white/40 hover:text-white/70 transition">Back to sign in</a>
      </div>
    </main>
  );
}
