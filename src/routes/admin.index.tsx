import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight, ArrowDownRight, Users, Wallet, ArrowLeftRight, AlertTriangle,
  MoreHorizontal, TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard · Payroxa" },
      { name: "description", content: "Payroxa administrative dashboard — monitor volume, users and system health in real time." },
    ],
  }),
  component: AdminDashboard,
});

const stats = [
  { label: "Wallet volume (24h)", value: "₦482.6M", delta: "+12.4%", up: true, icon: Wallet },
  { label: "Active users", value: "142,908", delta: "+3.1%", up: true, icon: Users },
  { label: "Transactions", value: "38,201", delta: "+8.7%", up: true, icon: ArrowLeftRight },
  { label: "Failure rate", value: "0.42%", delta: "-0.08%", up: false, icon: AlertTriangle },
];

const recent = [
  { id: "TXN-8842011", user: "Olamide A.", type: "Airtime · MTN", amount: 1000, status: "Successful", time: "09:42" },
  { id: "TXN-8842010", user: "Ada Ibeh", type: "Wallet funding", amount: 50000, status: "Successful", time: "09:41" },
  { id: "TXN-8842009", user: "Chidi O.", type: "Transfer · Kuda", amount: 12500, status: "Pending", time: "09:39" },
  { id: "TXN-8842008", user: "Fatima Y.", type: "Electricity · IKEDC", amount: 8500, status: "Successful", time: "09:36" },
  { id: "TXN-8842007", user: "Tolu J.", type: "Betting · Bet9ja", amount: 5000, status: "Failed", time: "09:34" },
];

const statusStyles: Record<string, string> = {
  Successful: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
};

function Sparkbars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-16 items-end gap-1.5">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-primary/80"
          style={{ height: `${(v / max) * 100}%`, opacity: 0.4 + (i / data.length) * 0.6 }}
        />
      ))}
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time view of Payroxa operations</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button className="rounded-lg border border-border bg-card px-3 py-1.5 font-medium">Today</button>
          <button className="rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground">7 days</button>
          <button className="rounded-lg border border-border bg-card px-3 py-1.5 font-medium">30 days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.delta}
                </span>
              </div>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Transaction volume</p>
              <p className="text-[11px] text-muted-foreground">Last 14 days · Naira millions</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
              <TrendingUp className="h-3 w-3" /> +18.4%
            </div>
          </div>
          <Sparkbars data={[42, 38, 55, 60, 48, 72, 68, 82, 76, 90, 88, 104, 98, 118]} />
          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Jun 24</span><span>Jun 28</span><span>Jul 1</span><span>Jul 4</span><span>Today</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Revenue mix</p>
          <p className="text-[11px] text-muted-foreground">By service · this month</p>
          <div className="mt-4 space-y-3">
            {[
              { l: "Airtime & Data", v: 42, c: "bg-primary" },
              { l: "Bills", v: 28, c: "bg-emerald-500" },
              { l: "Transfers", v: 18, c: "bg-amber-500" },
              { l: "Gift cards", v: 8, c: "bg-violet-500" },
              { l: "Others", v: 4, c: "bg-slate-400" },
            ].map((r) => (
              <div key={r.l}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-foreground">{r.l}</span>
                  <span className="font-semibold text-muted-foreground">{r.v}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${r.c}`} style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Recent transactions</p>
            <button className="text-xs font-semibold text-primary">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2 font-medium">Reference</th>
                  <th className="px-3 py-2 font-medium">User</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 text-right font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 pr-5 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-t border-border/60">
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-muted-foreground">{r.id}</td>
                    <td className="px-3 py-3 font-medium text-foreground">{r.user}</td>
                    <td className="px-3 py-3 text-muted-foreground">{r.type}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-foreground">
                      ₦{r.amount.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 pr-5 text-muted-foreground">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Compliance alerts</p>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {[
              { t: "3 flagged transactions", d: "Above ₦1M threshold", tone: "destructive" },
              { t: "12 KYC re-verifications", d: "Due this week", tone: "warning" },
              { t: "Chargeback opened", d: "TXN-8841902 · GTBank", tone: "warning" },
              { t: "Rate limits normal", d: "All gateways healthy", tone: "success" },
            ].map((a) => (
              <div key={a.t} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 h-2 w-2 flex-none rounded-full ${
                    a.tone === "destructive"
                      ? "bg-destructive"
                      : a.tone === "warning"
                        ? "bg-warning"
                        : "bg-success"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{a.t}</p>
                  <p className="text-[11px] text-muted-foreground">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
