import type { ReactNode } from "react";

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-6 pb-10 pt-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-primary">
            <span className="text-sm font-bold">P</span>
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">Payroxa</span>
        </div>

        <div className="mt-10">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="mt-8 flex-1">{children}</div>

        {footer && <div className="pt-6 text-center text-xs text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

export function TextInput({
  leading,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  leading?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/25">
      {leading && <span className="text-muted-foreground">{leading}</span>}
      <input
        {...props}
        className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      {trailing}
    </div>
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
    >
      {children}
    </button>
  );
}
