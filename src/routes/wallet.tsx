import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Filter, Plus, Search, Smartphone, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { WalletCard } from "@/components/WalletCard";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet · Payroxa" },
      { name: "description", content: "View your Payroxa wallet balance, fund your account, transfer money and track every transaction." },
    ],
  }),
  component: WalletPage,
});

const history = [
  { day: "Today", items: [
    { t: "MTN Airtime", meta: "09:42 · Ref A72F", amount: -1000, icon: Smartphone },
    { t: "Ada Ibeh", meta: "08:11 · Transfer in", amount: 15000, icon: ArrowDownLeft },
  ]},
  { day: "Yesterday", items: [
    { t: "Wallet funding", meta: "18:11 · Card ****4423", amount: 50000, icon: Plus },
    { t: "IKEDC Electricity", meta: "12:04 · Token 8811", amount: -8500, icon: Zap },
    { t: "Transfer to Chidi", meta: "10:22 · Kuda Bank", amount: -12500, icon: ArrowUpRight },
  ]},
  { day: "This week", items: [
    { t: "Cashback reward", meta: "Mon · Loyalty tier", amount: 350, icon: ArrowDownLeft },
    { t: "DSTV Subscription", meta: "Mon · Compact+", amount: -19800, icon: Zap },
  ]},
];

function WalletPage() {
  return (
    <AppShell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Wallet</h1>
      </header>

      <section className="px-5"><WalletCard /></section>

      <section className="mt-5 px-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "Inflow", v: "₦65,350", d: "This month", c: "text-success" },
            { l: "Outflow", v: "₦41,800", d: "This month", c: "text-foreground" },
            { l: "Rewards", v: "₦1,240", d: "Earned", c: "text-primary" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-card p-3 shadow-soft">
              <p className="text-[11px] text-muted-foreground">{s.l}</p>
              <p className={`mt-1 text-sm font-semibold ${s.c}`}>{s.v}</p>
              <p className="text-[10px] text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold text-foreground">Transactions</h2>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground">
              <Search className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {history.map((group) => (
            <div key={group.day}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.day}
              </p>
              <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
                {group.items.map((t) => {
                  const Icon = t.icon;
                  const credit = t.amount > 0;
                  return (
                    <div key={t.t + t.meta} className="flex items-center gap-3 px-4 py-3">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${credit ? "bg-success/10 text-success" : "bg-secondary text-foreground"}`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{t.t}</p>
                        <p className="text-[11px] text-muted-foreground">{t.meta}</p>
                      </div>
                      <p className={`text-sm font-semibold ${credit ? "text-success" : "text-foreground"}`}>
                        {credit ? "+" : "-"}₦{Math.abs(t.amount).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
