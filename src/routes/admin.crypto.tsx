import { createFileRoute } from "@tanstack/react-router";
import { Coins, Wallet as WalletIcon, ArrowUpRight, Flame, Activity, TrendingUp } from "lucide-react";
import { AdminPage, StatCard } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/crypto")({
  head: () => ({
    meta: [
      { title: "Crypto Overview · Payroxa Admin" },
      { name: "description", content: "Solana wallet fleet, PRX token supply and on-chain activity across the Payroxa ecosystem." },
    ],
  }),
  component: AdminCryptoOverview,
});

const flow = [
  { label: "Rewards distributed", value: "824,120 PRX", delta: "+12.4%" },
  { label: "PRX transferred", value: "1.42M PRX", delta: "+6.8%" },
  { label: "SOL gas spent", value: "38.42 SOL", delta: "-3.1%", tone: "destructive" as const },
  { label: "Failed on-chain tx", value: "0.08%", delta: "-0.02%" },
];

const recent = [
  { sig: "5s7f…kQ2m", type: "PRX Transfer", from: "Olamide A.", to: "9x1P…H4qA", amount: "1,200 PRX", time: "12s" },
  { sig: "3aBc…m9uL", type: "Reward Mint", from: "Treasury", to: "Ada Ibeh", amount: "50 PRX", time: "34s" },
  { sig: "9zPq…7Ndx", type: "SOL Transfer", from: "Chidi O.", to: "2f9d…88Sw", amount: "0.24 SOL", time: "1m" },
  { sig: "7wYx…3JbT", type: "Freeze", from: "Admin", to: "Suspicious wallet", amount: "—", time: "3m" },
  { sig: "1kVn…5Hpr", type: "PRX Transfer", from: "Fatima Y.", to: "PayMerchant", amount: "800 PRX", time: "5m" },
];

function AdminCryptoOverview() {
  return (
    <AdminPage
      title="Crypto Overview"
      subtitle="Solana fleet health · PRX + SOL activity"
      actions={
        <>
          <span className="rounded-full bg-warning/15 px-3 py-1 text-[11px] font-semibold text-warning">
            Devnet
          </span>
          <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium">Export</button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total wallets" value="142,908" delta="+3.1%" icon={WalletIcon} />
        <StatCard label="PRX in circulation" value="18.4M" delta="+2.2%" icon={Coins} />
        <StatCard label="Treasury balance" value="481.6M PRX" delta="mint auth" tone="muted" icon={Flame} />
        <StatCard label="On-chain tx (24h)" value="24,120" delta="+11.8%" icon={Activity} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Token flow · last 7 days</p>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
              <TrendingUp className="h-3 w-3" /> +14.2%
            </span>
          </div>
          <div className="space-y-3">
            {flow.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.label}</p>
                  <p className="mt-0.5 text-base font-semibold text-foreground">{r.value}</p>
                </div>
                <span className={`text-[11px] font-semibold ${r.tone === "destructive" ? "text-destructive" : "text-success"}`}>
                  {r.delta}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 text-sm font-semibold text-foreground">Wallet provisioning</p>
          <div className="space-y-4">
            {[
              { l: "Turnkey sub-orgs", v: "142,908", d: "auto-created at signup" },
              { l: "Frozen wallets", v: "12", d: "compliance action" },
              { l: "External linked", v: "3,204", d: "Phantom · Solflare · Backpack" },
              { l: "Pending provision", v: "0", d: "backlog clear" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.l}</p>
                  <p className="text-[11px] text-muted-foreground">{r.d}</p>
                </div>
                <p className="font-semibold text-foreground">{r.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <p className="text-sm font-semibold text-foreground">Live on-chain activity</p>
          <button className="text-xs font-semibold text-primary">Open explorer</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2 font-medium">Signature</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">From</th>
                <th className="px-3 py-2 font-medium">To</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
                <th className="px-3 py-2 pr-5 font-medium">Ago</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.sig} className="border-t border-border/60">
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-primary">{r.sig}</td>
                  <td className="px-3 py-3 text-foreground">{r.type}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r.from}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r.to}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-foreground">{r.amount}</td>
                  <td className="whitespace-nowrap px-3 py-3 pr-5 text-muted-foreground">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  );
}
