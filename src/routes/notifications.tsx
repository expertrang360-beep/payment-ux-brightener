import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, AlertTriangle, Gift, Zap, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · Payroxa" },
      { name: "description", content: "Stay on top of every transaction, reward and security alert on Payroxa." },
    ],
  }),
  component: NotificationsPage,
});

const groups = [
  {
    day: "Today",
    items: [
      { icon: CheckCircle2, tint: "bg-success/10 text-success", title: "Transfer successful", body: "₦12,500 sent to Ada Ibeh", time: "09:41", unread: true },
      { icon: Gift, tint: "bg-primary-soft text-primary", title: "You earned ₦350 cashback", body: "From your recent bill payment", time: "08:12", unread: true },
      { icon: ShieldAlert, tint: "bg-warning/10 text-warning", title: "New device login", body: "iPhone 15 Pro · Lagos, NG", time: "07:04", unread: false },
    ],
  },
  {
    day: "Yesterday",
    items: [
      { icon: Zap, tint: "bg-amber-500/10 text-amber-600", title: "Electricity token delivered", body: "IKEDC · 6543-8811-2210-0044", time: "12:04", unread: false },
      { icon: AlertTriangle, tint: "bg-destructive/10 text-destructive", title: "Failed transaction refunded", body: "₦2,000 returned to your wallet", time: "10:22", unread: false },
      { icon: Bell, tint: "bg-secondary text-foreground", title: "New: Virtual cards coming soon", body: "Join the waitlist from Rewards", time: "08:00", unread: false },
    ],
  },
];

function NotificationsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Notifications"
        subtitle="Recent activity and alerts"
        action={
          <button className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground">
            Mark all read
          </button>
        }
      />

      <div className="space-y-5 px-5">
        {groups.map((g) => (
          <section key={g.day}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.day}
            </p>
            <div className="space-y-2">
              {g.items.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.title + n.time}
                    className={`flex items-start gap-3 rounded-2xl border p-4 shadow-soft transition ${
                      n.unread ? "border-primary/25 bg-primary-soft/40" : "border-border bg-card"
                    }`}
                  >
                    <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${n.tint}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-foreground">{n.title}</p>
                        {n.unread && <span className="h-1.5 w-1.5 flex-none rounded-full bg-primary" />}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
