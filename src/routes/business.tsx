import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight, Building2, Link2, Receipt, Users, Wallet,
  TrendingUp, ChevronRight, ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Payroxa Business · Accept payments in minutes" },
      { name: "description", content: "Open a Payroxa Business account to collect payments, issue payment links, manage staff and reconcile in real time." },
      { property: "og:title", content: "Payroxa Business · Accept payments in minutes" },
      { property: "og:description", content: "Collect payments, issue links, manage staff and reconcile in real time with Payroxa Business." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BusinessPage,
});

const features = [
  { icon: Link2, label: "Payment Links", desc: "Share a link, get paid anywhere." },
  { icon: Receipt, label: "Invoices", desc: "Send branded invoices with reminders." },
  { icon: Users, label: "Staff & Roles", desc: "Add teammates with permissions." },
  { icon: Wallet, label: "Settlements", desc: "Auto-settle to your bank T+1." },
];

const stats = [
  { label: "This week", value: "₦4.28M", trend: "+18%" },
  { label: "Customers", value: "1,204", trend: "+42" },
  { label: "Success rate", value: "99.4%", trend: "▲" },
];

function BusinessPage() {
  return (
    <AppShell>
      <PageHeader title="Payroxa Business" subtitle="For merchants & teams." />

      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy p-5 text-white shadow-primary">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/40 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Building2 className="h-3 w-3" /> Merchant Suite
            </span>
            <h2 className="mt-3 text-xl font-semibold leading-snug">
              Everything you need to run and grow your business.
            </h2>
            <p className="mt-2 text-xs text-white/70">
              Accept payments online and in-store, manage staff, and reconcile daily — all in one dashboard.
            </p>
            <button className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              Open Business Account <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card p-3 shadow-soft">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{s.value}</p>
              <p className="mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-semibold text-success">
                <TrendingUp className="h-2.5 w-2.5" /> {s.trend}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <h2 className="mb-3 text-[15px] font-semibold text-foreground">Features</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, label, desc }) => (
            <button key={label} className="rounded-2xl bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <h2 className="mb-3 text-[15px] font-semibold text-foreground">Get started</h2>
        <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
          {[
            "Verify your business (CAC or BVN)",
            "Add your settlement account",
            "Invite your team and set roles",
            "Start collecting payments",
          ].map((step, i) => (
            <div key={step} className={`flex items-center gap-3 px-4 py-3.5 ${i !== 0 ? "border-t border-border/60" : ""}`}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                {i + 1}
              </span>
              <p className="flex-1 text-sm text-foreground">{step}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 px-5">
        <div className="flex items-start gap-3 rounded-2xl bg-primary-soft p-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-primary" />
          <p className="text-xs leading-relaxed text-foreground">
            <span className="font-semibold">PCI-DSS certified · </span>
            Bank-grade encryption, fraud monitoring and 24/7 uptime.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
