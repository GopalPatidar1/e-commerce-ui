"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";
import { register } from "@/lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await register({
        firstname,
        lastname,
        email,
        password,
      });

      console.log("Registration successful:", response);

      router.push("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join us and start shopping today."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="form-error">{error}</div>}

        <AuthInput
          label="First name"
          id="firstname"
          type="text"
          placeholder="John"
          autoComplete="firstname"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          required
        />

        <AuthInput
          label="Last name"
          id="lastname"
          type="text"
          placeholder="John"
          autoComplete="lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          required
        />

        <AuthInput
          label="Email address"
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <AuthInput
          label="Password"
          id="password"
          type="password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <p className="password-hint">
          Use at least 8 characters with a mix of letters and numbers.
        </p>

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}