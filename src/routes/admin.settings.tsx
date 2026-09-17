import { createFileRoute } from "@tanstack/react-router";
import { Save, KeyRound, Webhook, Building2, Percent } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Payroxa Admin" },
      { name: "description", content: "Configure Payroxa platform settings — fees, providers, roles and compliance." },
    ],
  }),
  component: AdminSettings,
});

const sections = [
  {
    icon: Building2,
    title: "Organisation",
    fields: [
      { label: "Platform name", value: "Payroxa" },
      { label: "Support email", value: "help@payroxa.com" },
      { label: "Regulator ID", value: "CBN-PSSP-00218" },
    ],
  },
  {
    icon: Percent,
    title: "Fees & limits",
    fields: [
      { label: "Wallet-to-wallet fee", value: "₦0.00" },
      { label: "Bank transfer fee", value: "₦25.00" },
      { label: "Tier 2 daily limit", value: "₦5,000,000" },
    ],
  },
];

const toggles = [
  { title: "Maintenance mode", desc: "Show a maintenance page to end users.", on: false },
  { title: "Signups open", desc: "Allow new customer registrations.", on: true },
  { title: "Card funding", desc: "Enable card top-ups via gateway.", on: true },
  { title: "Auto-flag > ₦1M", desc: "Send large transfers to compliance queue.", on: true },
];

const roles = [
  { role: "Super admin", who: "3 members", perm: "Full access" },
  { role: "Compliance", who: "6 members", perm: "Users, transactions, alerts" },
  { role: "Support", who: "18 members", perm: "Users (read), tickets" },
  { role: "Finance", who: "4 members", perm: "Ledger, settlements, exports" },
];

function AdminSettings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Platform configuration and access control</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
          <Save className="h-3.5 w-3.5" /> Save changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
              </div>
              <div className="space-y-3">
                {s.fields.map((f) => (
                  <div key={f.label}>
                    <label className="text-[11px] font-medium text-muted-foreground">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <p className="mb-4 text-sm font-semibold text-foreground">Feature flags</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {toggles.map((t) => (
            <div key={t.title} className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{t.title}</p>
                <p className="text-[11px] text-muted-foreground">{t.desc}</p>
              </div>
              <span
                className={`relative flex h-5 w-9 flex-none items-center rounded-full p-0.5 transition ${
                  t.on ? "bg-primary" : "bg-secondary"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full bg-white shadow-soft transition ${t.on ? "ml-auto" : ""}`}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <KeyRound className="h-4 w-4 text-primary" /> Roles & permissions
          </p>
          <div className="divide-y divide-border/60">
            {roles.map((r) => (
              <div key={r.role} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.role}</p>
                  <p className="text-[11px] text-muted-foreground">{r.perm}</p>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">{r.who}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Webhook className="h-4 w-4 text-primary" /> Webhooks & API
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Live API base</label>
              <input
                readOnly
                defaultValue="https://api.payroxa.com/v1"
                className="mt-1 w-full rounded-lg border border-border bg-secondary/60 px-3 py-2 font-mono text-xs text-foreground outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Webhook signing secret</label>
              <input
                readOnly
                defaultValue="whsec_•••••••••••••••••••••••••••"
                className="mt-1 w-full rounded-lg border border-border bg-secondary/60 px-3 py-2 font-mono text-xs text-foreground outline-none"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Rotate keys every 90 days. Compliance is notified automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
