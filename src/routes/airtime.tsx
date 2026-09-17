import { createFileRoute, Link } from "@tanstack/react-router";
import { Smartphone, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/airtime")({
  head: () => ({
    meta: [
      { title: "Buy Airtime · Payroxa" },
      { name: "description", content: "Buy airtime for any Nigerian network instantly with Payroxa." },
    ],
  }),
  component: AirtimePage,
});

const networks = [
  { name: "MTN", color: "bg-amber-400" },
  { name: "Airtel", color: "bg-rose-500" },
  { name: "Glo", color: "bg-emerald-500" },
  { name: "9mobile", color: "bg-teal-500" },
];

const amounts = [100, 200, 500, 1000, 2000, 5000];

function AirtimePage() {
  return (
    <AppShell>
      <PageHeader title="Buy Airtime" subtitle="Top up instantly on any network" />

      <div className="space-y-5 px-5">
        <div>
          <p className="mb-2 text-xs font-medium text-foreground">Network</p>
          <div className="grid grid-cols-4 gap-2">
            {networks.map((n, i) => (
              <button
                key={n.name}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition ${
                  i === 0 ? "border-primary bg-primary-soft" : "border-border bg-card"
                }`}
              >
                <span className={`h-8 w-8 rounded-full ${n.color}`} />
                <span className="text-[11px] font-semibold text-foreground">{n.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-foreground">Phone number</p>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground">
              🇳🇬 +234 <ChevronDown className="h-3 w-3" />
            </button>
            <div className="h-4 w-px bg-border" />
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="801 234 5678"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-foreground">Amount</p>
          <div className="rounded-xl border border-border bg-card px-3.5 py-3">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-muted-foreground">₦</span>
              <input
                defaultValue="1,000"
                className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
              />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Wallet balance: ₦248,650.75
            </p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {amounts.map((a, i) => (
              <button
                key={a}
                className={`rounded-xl border py-2 text-sm font-semibold transition ${
                  i === 2 ? "border-primary bg-primary-soft text-primary" : "border-border bg-card text-foreground"
                }`}
              >
                ₦{a.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-secondary p-4 text-xs">
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Cashback (Silver)</span>
            <span className="font-medium text-success">+₦10</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Fee</span>
            <span className="font-medium text-foreground">Free</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border/60 pt-2 text-sm">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-semibold text-foreground">₦1,000.00</span>
          </div>
        </div>

        <Link
          to="/"
          className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-primary"
        >
          Continue
        </Link>
      </div>
    </AppShell>
  );
}
