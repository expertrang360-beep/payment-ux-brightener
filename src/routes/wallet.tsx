import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { WalletCard } from "@/components/WalletCard";
import { customerTransactions, TransactionList, type TransactionKind } from "@/components/TransactionList";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet · Payroxa" },
      { name: "description", content: "View your Payroxa wallet balance, fund your account, transfer money and track every transaction." },
      { property: "og:title", content: "Wallet & Transactions · Payroxa" },
      { property: "og:description", content: "Track wallet activity, incoming money, transfers, and bill payments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | TransactionKind>("All");
  const filtered = useMemo(() => customerTransactions.filter((item) => (filter === "All" || item.kind === filter) && `${item.title} ${item.meta} ${item.id}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

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
          <p className="text-xs text-muted-foreground">{filtered.length} records</p>
        </div>
        <div className="relative mb-3"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or reference" className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" />{query && <button aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-muted-foreground"><X className="h-4 w-4" /></button>}</div>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {(["All", "Money in", "Money out", "Bills"] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={cn("flex h-9 shrink-0 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold", filter === item ? "border-primary bg-primary-soft text-primary" : "border-border bg-card text-muted-foreground")}>{item === "All" && <SlidersHorizontal className="h-3.5 w-3.5" />}{item}</button>)}
        </div>
        <TransactionList items={filtered} />
      </section>
    </AppShell>
  );
}
