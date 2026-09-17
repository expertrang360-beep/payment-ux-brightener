import { createFileRoute } from "@tanstack/react-router";
import { Search, Download, ArrowUpDown } from "lucide-react";

export const Route = createFileRoute("/admin/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions · Payroxa Admin" },
      { name: "description", content: "Investigate every Payroxa transaction — filter by status, service, amount and channel." },
    ],
  }),
  component: AdminTransactions,
});

const kpis = [
  { l: "Volume today", v: "₦482.6M", d: "+12.4% vs yesterday", up: true },
  { l: "Success rate", v: "99.58%", d: "Above SLA (99.4%)", up: true },
  { l: "Avg. settlement", v: "1.8s", d: "Card gateway", up: true },
  { l: "Chargebacks", v: "9", d: "Awaiting review", up: false },
];

const rows = [
  { id: "TXN-8842011", user: "Olamide Adeyemi", channel: "Card · Verve", type: "Wallet funding", amount: 50000, status: "Successful", time: "09:42:11" },
  { id: "TXN-8842010", user: "Ada Ibeh", channel: "Wallet", type: "Transfer · Payroxa", amount: 15000, status: "Successful", time: "09:41:58" },
  { id: "TXN-8842009", user: "Chidi Okoro", channel: "Bank · Kuda", type: "Transfer · NIP", amount: 12500, status: "Pending", time: "09:39:44" },
  { id: "TXN-8842008", user: "Fatima Yusuf", channel: "Biller · IKEDC", type: "Electricity", amount: 8500, status: "Successful", time: "09:36:02" },
  { id: "TXN-8842007", user: "Tolu James", channel: "Biller · Bet9ja", type: "Betting fund", amount: 5000, status: "Failed", time: "09:34:20" },
  { id: "TXN-8842006", user: "Ngozi E.", channel: "Airtime · MTN", type: "Airtime", amount: 500, status: "Successful", time: "09:31:12" },
  { id: "TXN-8842005", user: "Bello Ibrahim", channel: "Bank · GTB", type: "Transfer · NIP", amount: 220000, status: "Reversed", time: "09:29:44" },
  { id: "TXN-8842004", user: "Chinedu O.", channel: "Card · Mastercard", type: "Wallet funding", amount: 100000, status: "Successful", time: "09:27:00" },
];

const statusStyles: Record<string, string> = {
  Successful: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
  Reversed: "bg-secondary text-foreground",
};

function AdminTransactions() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Transactions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Live ledger — auto-refresh every 30s</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-xl font-semibold text-foreground">{k.v}</p>
            <p className={`mt-1 text-[11px] ${k.up ? "text-success" : "text-destructive"}`}>{k.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/60 p-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search TXN reference, user, biller…"
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </div>
          {["All", "Successful", "Pending", "Failed", "Reversed"].map((t, i) => (
            <button
              key={t}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                i === 0 ? "border-primary bg-primary-soft text-primary" : "border-border bg-background text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Reference</th>
                <th className="px-3 py-3 font-medium">User</th>
                <th className="px-3 py-3 font-medium">Channel</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 text-right font-medium">
                  <span className="inline-flex items-center gap-1">Amount <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 pr-5 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border/60 transition hover:bg-secondary/40">
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-primary">{r.id}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">{r.user}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">{r.channel}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-foreground">{r.type}</td>
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
    </div>
  );
}
