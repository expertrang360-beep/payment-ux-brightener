import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · Payroxa Admin" },
      { name: "description", content: "Deep analytics for growth, retention, revenue and service performance across Payroxa." },
    ],
  }),
  component: AdminAnalytics,
});

function Line({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min || 1)) * 100;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L100,100 L0,100 Z`} fill="url(#grad)" />
      <path d={d} fill="none" stroke="var(--primary)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function AdminAnalytics() {
  const growth = [10, 14, 12, 18, 22, 20, 28, 30, 34, 40, 44, 52, 58, 70];
  const revenue = [30, 32, 40, 42, 38, 48, 55, 60, 58, 68, 74, 80, 78, 92];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Growth, retention and service performance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">New signups</p>
              <p className="text-[11px] text-muted-foreground">Last 14 days</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
              <TrendingUp className="h-3 w-3" /> +24%
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-foreground">3,204</p>
          <Line points={growth} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Revenue</p>
              <p className="text-[11px] text-muted-foreground">Last 14 days</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
              <TrendingUp className="h-3 w-3" /> +18%
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-foreground">₦42.8M</p>
          <Line points={revenue} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Retention (D30)</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">68.4%</p>
          <p className="text-[11px] text-success">+2.1 pts vs prior cohort</p>
          <div className="mt-4 flex gap-1">
            {[80, 76, 70, 68, 65, 62, 60, 58, 56, 54, 52, 50].map((v, i) => (
              <div key={i} className="flex-1 rounded-sm bg-primary" style={{ height: v / 2, opacity: 0.35 + i * 0.05 }} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Top services</p>
          <div className="mt-3 space-y-3">
            {[
              { l: "Airtime · MTN", v: "₦12.4M", up: true },
              { l: "Electricity · IKEDC", v: "₦8.1M", up: true },
              { l: "Data · Airtel", v: "₦6.9M", up: true },
              { l: "Betting · Bet9ja", v: "₦4.2M", up: false },
              { l: "Cable · DSTV", v: "₦3.8M", up: true },
            ].map((s) => (
              <div key={s.l} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{s.l}</span>
                <span className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground">{s.v}</span>
                  {s.up ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Regions</p>
          <div className="mt-3 space-y-3">
            {[
              { l: "Lagos", v: 46 },
              { l: "Abuja (FCT)", v: 18 },
              { l: "Rivers", v: 12 },
              { l: "Kano", v: 9 },
              { l: "Others", v: 15 },
            ].map((r) => (
              <div key={r.l}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-foreground">{r.l}</span>
                  <span className="font-semibold text-muted-foreground">{r.v}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
