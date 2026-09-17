import { createFileRoute } from "@tanstack/react-router";
import {
  Globe, Moon, Bell, Fingerprint, ShieldCheck, CreditCard, Landmark,
  MessageSquare, Trash2, ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Payroxa" },
      { name: "description", content: "Manage your Payroxa preferences, security, and connected accounts." },
    ],
  }),
  component: SettingsPage,
});

const groups = [
  {
    title: "General",
    items: [
      { icon: Globe, label: "Language", hint: "English" },
      { icon: Landmark, label: "Currency", hint: "NGN · ₦" },
      { icon: Moon, label: "Appearance", hint: "System" },
    ],
  },
  {
    title: "Security",
    items: [
      { icon: Fingerprint, label: "Biometric login", toggle: true, on: true },
      { icon: ShieldCheck, label: "Two-factor authentication", toggle: true, on: true },
      { icon: ShieldCheck, label: "Trusted devices" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Push notifications", toggle: true, on: true },
      { icon: MessageSquare, label: "SMS alerts", toggle: true, on: false },
      { icon: MessageSquare, label: "Email receipts", toggle: true, on: true },
    ],
  },
  {
    title: "Linked",
    items: [
      { icon: CreditCard, label: "Cards & Banks" },
      { icon: Landmark, label: "Beneficiaries" },
    ],
  },
];

type Item = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
  toggle?: boolean;
  on?: boolean;
};

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`relative flex h-5 w-9 items-center rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-border"}`}>
      <span className={`h-4 w-4 rounded-full bg-white shadow-soft transition-all ${on ? "ml-auto" : ""}`} />
    </span>
  );
}

function Row({ it }: { it: Item }) {
  const Icon = it.icon;
  return (
    <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-secondary/60">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground">
        <Icon className="h-[17px] w-[17px]" />
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">{it.label}</span>
      {it.hint && <span className="text-[11px] font-medium text-muted-foreground">{it.hint}</span>}
      {it.toggle ? <Toggle on={it.on} /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
}

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Settings" />

      <div className="space-y-6 px-5">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </h2>
            <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
              {g.items.map((it) => <Row key={it.label} it={it as Item} />)}
            </div>
          </section>
        ))}

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 py-3.5 text-sm font-semibold text-destructive">
          <Trash2 className="h-4 w-4" /> Close account
        </button>
      </div>
    </AppShell>
  );
}
