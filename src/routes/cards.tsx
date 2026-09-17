import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus, Snowflake, Eye, EyeOff, Settings2, Trash2, ShoppingBag,
  Plane, Wifi, ArrowUpRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Virtual Cards · Payroxa" },
      { name: "description", content: "Create and manage secure Payroxa virtual dollar and naira cards for online payments." },
    ],
  }),
  component: CardsPage,
});

const cards = [
  {
    id: "usd",
    label: "USD Virtual",
    number: "4539 •• •• 8821",
    balance: "$1,240.55",
    holder: "OLAMIDE ADEYEMI",
    exp: "08/29",
    gradient: "bg-gradient-primary",
  },
  {
    id: "ngn",
    label: "NGN Virtual",
    number: "5399 •• •• 2210",
    balance: "₦86,400.00",
    holder: "OLAMIDE ADEYEMI",
    exp: "11/27",
    gradient: "bg-gradient-navy",
  },
];

const merchants = [
  { name: "Amazon", meta: "Today · Retail", amount: "-$28.40", icon: ShoppingBag },
  { name: "Booking.com", meta: "Yesterday · Travel", amount: "-$142.00", icon: Plane },
  { name: "Cloudflare", meta: "Mon · Subscription", amount: "-$20.00", icon: Wifi },
];

function CardsPage() {
  const [active, setActive] = useState(cards[0]);
  const [hidden, setHidden] = useState(false);

  return (
    <AppShell>
      <PageHeader
        title="Virtual Cards"
        subtitle="Pay anywhere online, securely."
        action={
          <button className="flex h-10 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        }
      />

      <section className="px-5">
        <div className={`relative overflow-hidden rounded-3xl ${active.gradient} p-5 text-white shadow-primary`}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                {active.label}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-2xl font-semibold tracking-tight">
                  {hidden ? "•••••" : active.balance}
                </p>
                <button onClick={() => setHidden(!hidden)} className="rounded-full p-1 text-white/80 hover:bg-white/10">
                  {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <span className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              Visa
            </span>
          </div>
          <p className="relative mt-8 font-mono text-base tracking-[0.25em]">{active.number}</p>
          <div className="relative mt-4 flex items-end justify-between text-[11px] uppercase tracking-wider text-white/70">
            <div>
              <p>Card holder</p>
              <p className="mt-0.5 text-[13px] font-semibold text-white">{active.holder}</p>
            </div>
            <div className="text-right">
              <p>Expires</p>
              <p className="mt-0.5 text-[13px] font-semibold text-white">{active.exp}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`flex-1 rounded-xl border px-3 py-2.5 text-left text-xs transition ${
                active.id === c.id ? "border-primary bg-primary-soft" : "border-border bg-card"
              }`}
            >
              <p className="font-semibold text-foreground">{c.label}</p>
              <p className="text-[11px] text-muted-foreground">{c.number}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="grid grid-cols-4 gap-2 rounded-2xl bg-secondary/70 p-3 text-[11px] font-medium">
          {[
            { icon: ArrowUpRight, label: "Top up" },
            { icon: Snowflake, label: "Freeze" },
            { icon: Settings2, label: "Limits" },
            { icon: Trash2, label: "Delete" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center gap-1.5 rounded-xl py-2 hover:bg-background">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-soft">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <h2 className="mb-3 text-[15px] font-semibold text-foreground">Card activity</h2>
        <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
          {merchants.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.name} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-[11px] text-muted-foreground">{m.meta}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{m.amount}</p>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
