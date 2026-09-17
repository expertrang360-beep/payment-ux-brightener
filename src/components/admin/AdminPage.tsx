import type { ReactNode } from "react";

export function AdminPage({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export function StatCard({
  label, value, delta, tone = "success", icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "success" | "destructive" | "muted";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const toneCls =
    tone === "destructive" ? "text-destructive" : tone === "muted" ? "text-muted-foreground" : "text-success";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between">
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Icon className="h-4 w-4" />
          </span>
        )}
        {delta && <span className={`text-[11px] font-semibold ${toneCls}`}>{delta}</span>}
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  );
}
