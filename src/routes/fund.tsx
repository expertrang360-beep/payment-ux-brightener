import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Building2, Landmark, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/fund")({
  head: () => ({
    meta: [
      { title: "Fund Wallet · Payroxa" },
      { name: "description", content: "Add money to your Payroxa wallet via card, bank transfer or USSD." },
    ],
  }),
  component: FundPage,
});

const methods = [
  { icon: CreditCard, title: "Debit / Credit card", desc: "Instant · 1.5% fee", tag: "Fastest" },
  { icon: Building2, title: "Bank transfer", desc: "Dedicated account · Free", tag: "Free" },
  { icon: Landmark, title: "USSD", desc: "*737# from your bank", tag: null },
];

function FundPage() {
  return (
    <AppShell>
      <PageHeader title="Fund your wallet" subtitle="Choose how you'd like to add money" />

      <div className="px-5">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <p className="text-xs text-muted-foreground">Amount to add</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-muted-foreground">₦</span>
            <input
              defaultValue="25,000"
              className="w-full bg-transparent text-4xl font-semibold tracking-tight text-foreground outline-none"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[5000, 10000, 25000, 50000, 100000].map((a, i) => (
              <button
                key={a}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  i === 2 ? "border-primary bg-primary-soft text-primary" : "border-border text-foreground"
                }`}
              >
                +₦{a.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Payment methods
        </p>
        <div className="space-y-2">
          {methods.map((m, i) => {
            const Icon = m.icon;
            return (
              <button
                key={m.title}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  i === 0 ? "border-primary bg-primary-soft/50" : "border-border bg-card"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{m.title}</p>
                    {m.tag && (
                      <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                        {m.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{m.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <button className="mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-primary">
          Fund ₦25,000
        </button>
      </div>
    </AppShell>
  );
}
