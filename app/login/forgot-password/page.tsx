// app/forgot-password/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Key } from "lucide-react";

/**
 * Single-page Forgot & Reset password UI
 * - Step 1: enter email -> send reset link
 * - Step 2: paste token (or use token in ?token=...) + choose new password -> update password
 *
 * Replace the mocked fetch calls with your real backend endpoints.
 */

export default function ForgotAndResetPage() {
  const router = useRouter();
  const search = useSearchParams();
  const tokenFromQuery = search?.get("token") ?? "";

  // Request-reset state
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  // Reset state
  const [token, setToken] = useState(tokenFromQuery || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  // If token present in query, enable reset section immediately
  useEffect(() => {
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [tokenFromQuery]);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  // Send reset link (Step 1)
  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSendMessage(null);

    if (!email.trim()) {
      setSendError("Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      setSendError("Enter a valid email address.");
      return;
    }

    setSending(true);
    try {
      // === Replace this with your backend endpoint ===
      // const res = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({ email: email.trim() })
      // });
      // if (!res.ok) throw new Error(await res.text());

      // Mock network delay for UI demo
      await new Promise((r) => setTimeout(r, 900));
      // For security, don't reveal whether email exists
      setSendMessage(
        "If an account exists for this email, a password reset link has been sent. Check your inbox and spam folder."
      );
      setEmailSent(true);
      // keep email field if you want; clearing may be nicer:
      // setEmail('');
    } catch (err: any) {
      console.error(err);
      setSendError("Failed to send reset link. Try again later.");
    } finally {
      setSending(false);
    }
  };

  // Reset password (Step 2)
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetMessage(null);

    if (!token.trim()) {
      setResetError("Reset token is required. Use the link from your email or paste the token here.");
      return;
    }
    if (!password || !confirmPassword) {
      setResetError("Please fill both password fields.");
      return;
    }
    if (password.length < 6) {
      setResetError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    setResetting(true);
    try {
      // === Replace with your backend endpoint ===
      // const res = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({ token: token.trim(), password })
      // });
      // if (!res.ok) throw new Error(await res.text());

      // Mock network delay for UI demo
      await new Promise((r) => setTimeout(r, 900));

      setResetMessage("Password updated successfully — you will be redirected to sign in.");
      setPassword("");
      setConfirmPassword("");
      // Redirect after short delay so user can read message
      setTimeout(() => router.push("/login"), 1400);
    } catch (err: any) {
      console.error(err);
      setResetError("Failed to reset password. Token may be invalid or expired.");
    } finally {
      setResetting(false);
    }
  };

  // Whether the reset form should be enabled: token present OR after sending email
  const resetEnabled = Boolean(token.trim()) || emailSent;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center pt-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-3">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold">Forgot / Reset Password</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Step 1: Send reset link */}
            <section className="mb-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-indigo-50 p-2">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Request password reset</h4>
                  <p className="text-xs text-gray-600">Enter your email and we'll send a secure reset link.</p>
                </div>
              </div>

              <form onSubmit={handleSendLink} className="mt-4 space-y-3">
                {sendMessage && <div className="text-sm text-green-700">{sendMessage}</div>}
                {sendError && <div className="text-sm text-red-600">{sendError}</div>}

                <div>
                  <label htmlFor="fp-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    id="fp-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <Button type="submit" disabled={sending}>
                    {sending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                    {sending ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            </section>

            <hr className="my-4" />

            {/* Step 2: Reset password */}
            <section>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-50 p-2">
                  <Key className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Create new password</h4>
                  <p className="text-xs text-gray-600">
                    Paste your token (from email) below — or if you just sent a link, paste the token you received.
                  </p>
                </div>
              </div>

              <form onSubmit={handleReset} className="mt-4 space-y-3">
                {resetMessage && <div className="text-sm text-green-700">{resetMessage}</div>}
                {resetError && <div className="text-sm text-red-600">{resetError}</div>}

                <div>
                  <label htmlFor="rp-token" className="block text-sm font-medium text-gray-700 mb-1">Reset token</label>
                  <Input
                    id="rp-token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste token here (or use link with ?token=...)"
                    required
                    disabled={!resetEnabled}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="rp-password" className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                    <Input
                      id="rp-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                      required
                      disabled={!resetEnabled}
                    />
                  </div>

                  <div>
                    <label htmlFor="rp-confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                    <Input
                      id="rp-confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                      disabled={!resetEnabled}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500">
                    {resetEnabled ? "" : "Send a reset link first or provide a token."}
                  </div>

                  <div>
                    <Button type="submit" disabled={!resetEnabled || resetting}>
                      {resetting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                      {resetting ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </div>
              </form>
            </section>

            <div className="mt-6 text-center text-sm">
              <button className="text-indigo-600 hover:underline" onClick={() => router.push("/login")}>Back to Sign In</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
