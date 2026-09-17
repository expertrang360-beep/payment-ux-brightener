import { createFileRoute } from "@tanstack/react-router";
import { Coins, Flame, Send, Copy, ExternalLink } from "lucide-react";
import { AdminPage, StatCard } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/token")({
  head: () => ({
    meta: [
      { title: "PRX Token · Payroxa Admin" },
      { name: "description", content: "Manage the Payroxa PRX SPL token — mint, distribution, top holders." },
    ],
  }),
  component: AdminToken,
});

const holders = [
  { rank: 1, addr: "TREAS…mint", label: "Treasury (mint auth)", pct: 82.4, amount: "412,000,000 PRX" },
  { rank: 2, addr: "REWRD…8k4a", label: "Rewards vault", pct: 6.1, amount: "30,500,000 PRX" },
  { rank: 3, addr: "LIQD…q92p", label: "Liquidity reserve", pct: 4.2, amount: "21,000,000 PRX" },
  { rank: 4, addr: "9xPq…44Zn", label: "Merchant · PayMart", pct: 0.42, amount: "2,100,000 PRX" },
  { rank: 5, addr: "3aBc…m9uL", label: "Olamide Adeyemi", pct: 0.12, amount: "610,240 PRX" },
];

function AdminToken() {
  return (
    <AdminPage
      title="PRX Token"
      subtitle="Payroxa Token · SPL on Solana"
      actions={
        <>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold">
            <Flame className="h-3.5 w-3.5" /> Burn
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            <Send className="h-3.5 w-3.5" /> Mint & distribute
          </button>
        </>
      }
    >
      <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-primary">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Payroxa Token</p>
              <p className="text-xs text-muted-foreground">Symbol PRX · 9 decimals · Devnet</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2">
            <code className="font-mono text-xs text-foreground">Prx1nT…notMintedYet…devNet</code>
            <button className="text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
            <button className="text-muted-foreground hover:text-foreground"><ExternalLink className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total supply" value="500,000,000" delta="fixed" tone="muted" />
        <StatCard label="Circulating" value="18,400,000" delta="3.68%" />
        <StatCard label="Holders" value="142,908" delta="+3.1%" />
        <StatCard label="Rewards / month" value="1.2M PRX" delta="+8.4%" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 text-sm font-semibold text-foreground">Quick mint</p>
          <form className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Destination wallet</label>
              <input placeholder="Solana address" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Amount (PRX)</label>
              <input placeholder="0.00" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Memo</label>
              <input placeholder="e.g. Referral bonus" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
              Sign & mint
            </button>
            <p className="text-[10px] text-muted-foreground">Requires 2-of-3 admin approval on mainnet.</p>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-foreground">Top holders</p>
          <div className="divide-y divide-border/60">
            {holders.map((h) => (
              <div key={h.rank} className="flex items-center gap-3 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-[11px] font-semibold text-muted-foreground">
                  #{h.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{h.label}</p>
                  <code className="text-[11px] text-muted-foreground">{h.addr}</code>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{h.amount}</p>
                  <p className="text-[11px] text-muted-foreground">{h.pct}% supply</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
