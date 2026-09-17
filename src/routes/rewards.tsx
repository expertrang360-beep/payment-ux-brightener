import { createFileRoute } from "@tanstack/react-router";
import { Copy, Gift, Sparkles, Trophy, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards · Payroxa" },
      { name: "description", content: "Earn cashback, unlock loyalty tiers and invite friends to earn with Payroxa Rewards." },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  return (
    <AppShell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Rewards</h1>
        <p className="mt-1 text-sm text-muted-foreground">Earn more every time you pay.</p>
      </header>

      {/* Tier card */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy p-5 text-white shadow-primary">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/40 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/60">Loyalty tier</p>
              <p className="text-lg font-semibold">Silver Member</p>
            </div>
          </div>
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span>1,240 pts</span>
              <span>2,500 pts · Gold</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[50%] rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-xs text-white/70">
              Earn 1,260 more points to unlock Gold benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Referral */}
      <section className="mt-6 px-5">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Refer & earn ₦500</p>
              <p className="text-[11px] text-muted-foreground">
                For every friend who joins and completes KYC.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary p-2">
            <code className="flex-1 truncate px-2 text-sm font-medium text-foreground">
              payroxa.com/r/OLAMIDE7
            </code>
            <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
        </div>
      </section>

      {/* Cashback offers */}
      <section className="mt-7 px-5">
        <h2 className="mb-3 text-[15px] font-semibold text-foreground">Cashback offers</h2>
        <div className="space-y-3">
          {[
            { t: "5% back on Electricity", d: "Ends this Sunday", icon: Sparkles, tint: "bg-amber-500/10 text-amber-600" },
            { t: "3% back on Data bundles", d: "All week", icon: Gift, tint: "bg-emerald-500/10 text-emerald-600" },
            { t: "Double points on Cable TV", d: "First 500 users", icon: Trophy, tint: "bg-violet-500/10 text-violet-600" },
          ].map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.t} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${o.tint}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{o.t}</p>
                  <p className="text-[11px] text-muted-foreground">{o.d}</p>
                </div>
                <button className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
                  Activate
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
