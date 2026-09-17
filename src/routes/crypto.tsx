import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Coins, ArrowUpRight, ArrowDownLeft, Send, QrCode, History, ExternalLink,
  Sparkles, ShieldCheck, TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/crypto")({
  head: () => ({
    meta: [
      { title: "Crypto Wallet · Payroxa" },
      { name: "description", content: "Your Payroxa Solana wallet — hold SOL, earn PRX rewards and send crypto anywhere." },
    ],
  }),
  component: CryptoPage,
});

const holdings = [
  { sym: "PRX", name: "Payroxa Token", amount: "12,480.24", value: "$1,872.04", change: "+4.2%", tint: "bg-gradient-primary text-primary-foreground" },
  { sym: "SOL", name: "Solana", amount: "0.4218", value: "$68.12", change: "+1.8%", tint: "bg-violet-500/15 text-violet-500" },
  { sym: "USDC", name: "USD Coin", amount: "24.00", value: "$24.00", change: "0.0%", tint: "bg-blue-500/15 text-blue-500" },
];

const activity = [
  { t: "Received PRX reward", meta: "From Treasury · 12s ago", amount: "+50 PRX", credit: true },
  { t: "Sent SOL", meta: "To 9x1P…H4qA · 4m ago", amount: "-0.02 SOL", credit: false },
  { t: "Received PRX", meta: "From Ada Ibeh · 1h ago", amount: "+1,200 PRX", credit: true },
  { t: "Swap PRX → USDC", meta: "Jupiter · 3h ago", amount: "-500 PRX", credit: false },
];

function CryptoPage() {
  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pb-4 pt-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Crypto</h1>
          <p className="mt-1 text-sm text-muted-foreground">Solana wallet · Devnet</p>
        </div>
        <Link
          to="/crypto/history"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <History className="h-[18px] w-[18px]" />
        </Link>
      </header>

      {/* Portfolio card */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy p-5 text-white shadow-primary">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/40 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

          <div className="relative">
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">Portfolio value</p>
            <p className="mt-2 text-[32px] font-semibold leading-none tracking-tight">$1,964.16</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 font-semibold text-success">
                <TrendingUp className="h-3 w-3" /> +3.9% today
              </span>
              <span className="text-white/60">≈ ₦2,948,240</span>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-mono">
              <span className="truncate">9xPq3f…Kq22Zn</span>
              <ExternalLink className="ml-auto h-3 w-3" />
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-3 gap-2">
            <Link to="/crypto/send" className="flex items-center justify-center gap-1.5 rounded-xl bg-white/15 py-2.5 text-xs font-semibold backdrop-blur-sm">
              <Send className="h-3.5 w-3.5" /> Send
            </Link>
            <Link to="/crypto/receive" className="flex items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-xs font-semibold text-primary">
              <QrCode className="h-3.5 w-3.5" /> Receive
            </Link>
            <Link to="/crypto/connect" className="flex items-center justify-center gap-1.5 rounded-xl bg-white/15 py-2.5 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Swap
            </Link>
          </div>
        </div>
      </section>

      {/* PRX rewards */}
      <section className="mt-6 px-5">
        <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
            <Coins className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Earn PRX every payment</p>
            <p className="text-[11px] text-muted-foreground">
              Get up to 5% cashback in Payroxa Tokens on bills & transfers.
            </p>
          </div>
          <button className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
            Learn more
          </button>
        </div>
      </section>

      {/* Holdings */}
      <section className="mt-6 px-5">
        <SectionHeader title="Your assets" />
        <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
          {holdings.map((h) => (
            <div key={h.sym} className="flex items-center gap-3 px-4 py-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${h.tint}`}>
                {h.sym.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{h.name}</p>
                <p className="text-[11px] text-muted-foreground">{h.amount} {h.sym}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{h.value}</p>
                <p className={`text-[11px] ${h.change.startsWith("+") ? "text-success" : "text-muted-foreground"}`}>
                  {h.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section className="mt-6 px-5">
        <SectionHeader title="Recent activity" action={<Link to="/crypto/history">View all</Link>} />
        <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
          {activity.map((a) => (
            <div key={a.t} className="flex items-center gap-3 px-4 py-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${a.credit ? "bg-success/10 text-success" : "bg-secondary text-foreground"}`}>
                {a.credit ? <ArrowDownLeft className="h-[18px] w-[18px]" /> : <ArrowUpRight className="h-[18px] w-[18px]" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{a.t}</p>
                <p className="text-[11px] text-muted-foreground">{a.meta}</p>
              </div>
              <p className={`text-sm font-semibold ${a.credit ? "text-success" : "text-foreground"}`}>
                {a.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* External wallet */}
      <section className="mt-6 px-5">
        <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Connect Phantom or Solflare</p>
            <p className="text-[11px] text-muted-foreground">
              Use your own self-custody wallet with Payroxa.
            </p>
          </div>
          <Link to="/crypto/connect" className="rounded-full bg-primary-soft px-3 py-1.5 text-[11px] font-semibold text-primary">
            Connect
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
