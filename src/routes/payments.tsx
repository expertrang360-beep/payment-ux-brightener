import { createFileRoute } from "@tanstack/react-router";
import {
  Smartphone, Wifi, Zap, Tv, Ticket, Gift, Repeat, CreditCard,
  GraduationCap, Plane, Building2, Search, ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments · Payroxa" },
      { name: "description", content: "Pay for airtime, data, electricity, cable TV, betting, gift cards and more with Payroxa." },
    ],
  }),
  component: PaymentsPage,
});

type ServiceItem = {
  icon: typeof Smartphone;
  label: string;
  tint: string;
  soon?: boolean;
};

const groups: { title: string; items: ServiceItem[] }[] = [
  {
    title: "Everyday",
    items: [
      { icon: Smartphone, label: "Airtime", tint: "bg-blue-500/10 text-blue-600" },
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
  return (
    <AppShell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">Bills, top-ups and more.</p>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search services or billers"
            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </header>

      <div className="space-y-6 px-5 pt-2">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </h2>
            <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
              {g.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    disabled={item.soon}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition ${
                      i !== 0 ? "border-t border-border/60" : ""
                    } ${item.soon ? "opacity-70" : "hover:bg-secondary/60"}`}
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
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
