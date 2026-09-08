import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthShellProps) {
  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="brand-content">
          <div className="brand-logo">E</div>

          <h1>Everything you need, in one place.</h1>

          <p>
            Shop smarter, discover better products, and manage your
            orders effortlessly.
          </p>

          <div className="brand-features">
            <div>
              <span>✓</span>
              Secure checkout
            </div>

            <div>
              <span>✓</span>
              Fast delivery
            </div>

            <div>
              <span>✓</span>
              Easy order management
            </div>
          </div>
        </div>
      </section>

      <section className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}

          <div className="auth-footer">
            <span>{footerText}</span>{" "}
            <Link href={footerLinkHref}>{footerLinkText}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}