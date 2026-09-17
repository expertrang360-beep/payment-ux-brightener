import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/crypto/history")({
  head: () => ({
    meta: [
      { title: "Crypto History · Payroxa" },
      { name: "description", content: "Full on-chain transaction history for your Payroxa Solana wallet." },
    ],
  }),
  component: CryptoHistory,
});

const groups = [
  {
    day: "Today",
    items: [
      { t: "Received PRX reward", meta: "5s7f…kQ2m", amount: "+50 PRX", credit: true, time: "09:42" },
      { t: "Sent SOL", meta: "9zPq…7Ndx", amount: "-0.02 SOL", credit: false, time: "09:12" },
    ],
  },
  {
    day: "Yesterday",
    items: [
      { t: "Received PRX", meta: "3aBc…m9uL", amount: "+1,200 PRX", credit: true, time: "22:04" },
      { t: "Swap PRX → USDC", meta: "Jupiter", amount: "-500 PRX", credit: false, time: "18:33" },
      { t: "Received USDC", meta: "Jupiter", amount: "+74.20 USDC", credit: true, time: "18:33" },
    ],
  },
  {
    day: "This week",
    items: [
      { t: "PRX cashback · Airtime", meta: "Treasury", amount: "+5 PRX", credit: true, time: "Mon" },
      { t: "Sent PRX", meta: "PayMart", amount: "-800 PRX", credit: false, time: "Sun" },
    ],
  },
];

function CryptoHistory() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 px-5 pb-3 pt-6">
        <Link to="/crypto" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">On-chain history</h1>
          <p className="text-xs text-muted-foreground">Solana Devnet</p>
        </div>
      </header>

      <section className="space-y-5 px-5 pb-6">
        {groups.map((g) => (
          <div key={g.day}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.day}</p>
            <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
              {g.items.map((a) => (
                <div key={a.t + a.time} className="flex items-center gap-3 px-4 py-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${a.credit ? "bg-success/10 text-success" : "bg-secondary text-foreground"}`}>
                    {a.credit ? <ArrowDownLeft className="h-[18px] w-[18px]" /> : <ArrowUpRight className="h-[18px] w-[18px]" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{a.t}</p>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <span className="font-mono">{a.meta}</span>
                      <ExternalLink className="h-3 w-3" />
                      <span className="ml-1">· {a.time}</span>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${a.credit ? "text-success" : "text-foreground"}`}>
                    {a.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
