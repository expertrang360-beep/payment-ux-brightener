import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, Shield, Smartphone, Wifi, Zap, Tv, Ticket, Gift as GiftIcon,
  ArrowUpRight, ArrowDownLeft, ChevronRight, Sparkles, Users, Repeat, Coins, CarFront,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { WalletCard } from "@/components/WalletCard";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Payroxa — Powering Every Payment" },
      { name: "description", content: "Payroxa is Africa's premium payments and wallet platform. Fund your wallet, pay bills, buy airtime, and earn rewards." },
      { property: "og:title", content: "Payroxa — Powering Every Payment" },
      { property: "og:description", content: "Payroxa is Africa's premium payments and wallet platform. Fund your wallet, pay bills, buy airtime, and earn rewards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Smartphone, label: "Airtime", tint: "bg-blue-500/10 text-blue-600" },
  { icon: Wifi, label: "Data", tint: "bg-emerald-500/10 text-emerald-600" },
  { icon: Zap, label: "Electricity", tint: "bg-amber-500/10 text-amber-600" },
  { icon: Tv, label: "Cable TV", tint: "bg-rose-500/10 text-rose-600" },
  { icon: Ticket, label: "Betting", tint: "bg-violet-500/10 text-violet-600" },
  { icon: GiftIcon, label: "Gift Cards", tint: "bg-pink-500/10 text-pink-600" },
  { icon: Repeat, label: "Airtime-2-Cash", tint: "bg-cyan-500/10 text-cyan-600" },
  { icon: Sparkles, label: "More", tint: "bg-slate-500/10 text-slate-600" },
];

const quickActions = [
  { icon: ArrowUpRight, label: "Send", to: "/transfer" as const },
  { icon: ArrowDownLeft, label: "Receive", to: "/fund" as const },
  { icon: Smartphone, label: "Airtime", to: "/airtime" as const },
  { icon: Zap, label: "Bills", to: "/payments" as const },
];

const transactions = [
  { title: "MTN Airtime", meta: "Today · 09:42", amount: -1000, status: "Successful", icon: Smartphone },
  { title: "Wallet funding", meta: "Yesterday · 18:11", amount: 50000, status: "Credit", icon: ArrowDownLeft },
  { title: "IKEDC Electricity", meta: "Yesterday · 12:04", amount: -8500, status: "Successful", icon: Zap },
  { title: "Transfer to Ada", meta: "Mon · 20:33", amount: -12500, status: "Successful", icon: ArrowUpRight },
];

function Home() {
  return (
    <AppShell>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pb-4 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
            OA
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Good morning,</p>
            <p className="text-[15px] font-semibold text-foreground">Olamide A.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
          </Link>
        </div>
      </header>

      {/* Wallet */}
      <section className="px-5">
        <WalletCard />
      </section>

      {/* Quick actions */}
      <section className="mt-5 px-5">
        <div className="grid grid-cols-4 gap-2 rounded-2xl bg-secondary/70 p-3">
          {quickActions.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center gap-1.5 rounded-xl py-2 text-[11px] font-medium text-foreground transition hover:bg-background"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-soft">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Mobility */}
      <section className="mt-5 px-5">
        <Link to="/mobility" className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:border-primary/40">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <CarFront className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-foreground">Payroxa Mobility</span>
            <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">Book rides, deliveries, and logistics</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>
      </section>

      {/* Services */}
      <section className="mt-7 px-5">
        <SectionHeader title="Services" action={<Link to="/payments">See all</Link>} />
        <div className="grid grid-cols-4 gap-3">
          {services.map(({ icon: Icon, label, tint }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-2.5 text-[11px] font-medium text-foreground shadow-soft transition hover:-translate-y-0.5"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}>
                <Icon className="h-[19px] w-[19px]" />
              </span>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Crypto banner */}
      <section className="mt-7 px-5">
        <Link to="/crypto" className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-primary">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Coins className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">New · Crypto</p>
            <p className="mt-0.5 text-sm font-semibold">Your Payroxa Solana wallet is live</p>
            <p className="text-[11px] text-white/70">Earn PRX on every payment.</p>
          </div>
          <ChevronRight className="h-4 w-4 flex-none text-white/80" />
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        </Link>
      </section>

      {/* Promo banner */}
      <section className="mt-4 px-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-5 text-white">
          <div className="relative max-w-[65%]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
              New · Business
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-snug">
              Open a Payroxa Business account
            </h3>
            <p className="mt-1 text-xs text-white/70">
              Collect payments, issue links, and manage staff.
            </p>
            <Link to="/business" className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground">
              Get started <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/40 blur-2xl" />
        </div>
      </section>

      {/* Transactions */}
      <section className="mt-7 px-5">
        <SectionHeader title="Recent transactions" action={<Link to="/wallet">View all</Link>} />
        <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
          {transactions.map((t) => {
            const Icon = t.icon;
            const credit = t.amount > 0;
            return (
              <div key={t.title} className="flex items-center gap-3 px-4 py-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${credit ? "bg-success/10 text-success" : "bg-secondary text-foreground"}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground">{t.meta}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${credit ? "text-success" : "text-foreground"}`}>
                    {credit ? "+" : "-"}₦{Math.abs(t.amount).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{t.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Referral */}
      <section className="mt-6 px-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Invite friends, earn ₦500</p>
            <p className="text-[11px] text-muted-foreground">
              4 of 10 referrals completed this month.
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[40%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Security tip */}
      <section className="mt-4 px-5">
        <div className="flex items-start gap-3 rounded-2xl bg-success/5 p-4">
          <Shield className="mt-0.5 h-4 w-4 flex-none text-success" />
          <p className="text-xs leading-relaxed text-foreground">
            <span className="font-semibold">Security tip · </span>
            Payroxa will never ask for your PIN or OTP. Enable biometric login for
            faster, safer access.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
