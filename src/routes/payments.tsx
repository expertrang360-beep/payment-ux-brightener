import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Smartphone, Wifi, Zap, Tv, Ticket, Gift, Repeat, CreditCard,
  GraduationCap, Plane, Building2, Search, ChevronRight, Clock3, Star, X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments · Payroxa" },
      { name: "description", content: "Pay for airtime, data, electricity, cable TV, betting, gift cards and more with Payroxa." },
      { property: "og:title", content: "Payments · Payroxa" },
      { property: "og:description", content: "Pay bills, buy airtime and manage everyday payments with Payroxa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaymentsPage,
});

type ServiceItem = {
  icon: typeof Smartphone;
  label: string;
  tint: string;
  soon?: boolean;
  to?: "/airtime" | "/transfer";
};

const groups: { title: string; items: ServiceItem[] }[] = [
  {
    title: "Everyday",
    items: [
      { icon: Smartphone, label: "Airtime", tint: "bg-primary-soft text-primary", to: "/airtime" },
      { icon: Wifi, label: "Mobile Data", tint: "bg-emerald-500/10 text-emerald-600" },
      { icon: Zap, label: "Electricity", tint: "bg-amber-500/10 text-amber-600" },
      { icon: Tv, label: "Cable TV", tint: "bg-rose-500/10 text-rose-600" },
    ],
  },
  {
    title: "Entertainment",
    items: [
      { icon: Ticket, label: "Betting Wallets", tint: "bg-violet-500/10 text-violet-600" },
      { icon: Gift, label: "Gift Cards", tint: "bg-pink-500/10 text-pink-600" },
      { icon: Repeat, label: "Airtime-to-Cash", tint: "bg-cyan-500/10 text-cyan-600" },
      { icon: Wifi, label: "Internet ISPs", tint: "bg-indigo-500/10 text-indigo-600" },
    ],
  },
  {
    title: "Coming soon",
    items: [
      { icon: CreditCard, label: "Virtual Cards", tint: "bg-slate-500/10 text-slate-600", soon: true },
      { icon: GraduationCap, label: "Education", tint: "bg-slate-500/10 text-slate-600", soon: true },
      { icon: Plane, label: "Travel", tint: "bg-slate-500/10 text-slate-600", soon: true },
      { icon: Building2, label: "Government", tint: "bg-slate-500/10 text-slate-600", soon: true },
    ],
  },
];

function PaymentsPage() {
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(() => groups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
  })).filter((group) => group.items.length > 0), [query]);

  return (
    <AppShell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">What would you like to pay for?</p>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services or billers"
            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          {query && <button aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"><X className="h-4 w-4" /></button>}
        </div>
      </header>

      <div className="space-y-6 px-5 pt-2">
        {!query && <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="text-[13px] font-semibold text-foreground">Quick access</h2><span className="text-[11px] text-muted-foreground">Based on recent payments</span></div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/airtime" className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft transition hover:border-primary/40"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary"><Smartphone className="h-4 w-4" /></span><p className="mt-3 text-sm font-semibold text-foreground">MTN Airtime</p><p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground"><Clock3 className="h-3 w-3" /> Last paid today</p></Link>
            <button className="rounded-2xl border border-border/70 bg-card p-4 text-left shadow-soft transition hover:border-primary/40"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success"><Zap className="h-4 w-4" /></span><p className="mt-3 text-sm font-semibold text-foreground">IKEDC</p><p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground"><Star className="h-3 w-3" /> Saved biller</p></button>
          </div>
        </section>}
        {filteredGroups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </h2>
            <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
              {g.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  item.to ? <Link
                    key={item.label}
                    to={item.to}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition ${
                      i !== 0 ? "border-t border-border/60" : ""
                    } hover:bg-secondary/60`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.tint}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                    {item.soon ? (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Soon
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Link> : <button
                    key={item.label}
                    disabled={item.soon}
                    className={cn("flex w-full items-center gap-3 px-4 py-3.5 text-left transition", i !== 0 && "border-t border-border/60", item.soon ? "opacity-60" : "hover:bg-secondary/60")}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.tint}`}><Icon className="h-[18px] w-[18px]" /></span>
                    <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                    {item.soon ? <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">Soon</span> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
        {filteredGroups.length === 0 && <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center"><p className="text-sm font-semibold text-foreground">No service found</p><p className="mt-1 text-xs text-muted-foreground">Try a service name like airtime or electricity.</p></div>}
      </div>
    </AppShell>
  );
}
