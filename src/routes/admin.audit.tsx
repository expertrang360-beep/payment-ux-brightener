import { createFileRoute } from "@tanstack/react-router";
import { ScrollText, Filter, Download } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log · Payroxa Admin" },
      { name: "description", content: "Immutable log of privileged actions across Payroxa — admin, custody and compliance." },
    ],
  }),
  component: AdminAudit,
});

const events = [
  { at: "09:44:22", actor: "ops@payroxa.com", action: "PRX mint", target: "REWRD…8k4a", meta: "+ 250,000 PRX · devnet", tone: "primary" },
  { at: "09:41:08", actor: "compliance@payroxa.com", action: "Wallet freeze", target: "7wYxT2…N3JbT9", meta: "Reason: OFAC flag", tone: "destructive" },
  { at: "09:32:47", actor: "system", action: "Wallet created", target: "8mZp1x…P2G4vk", meta: "User signup · bisi.a@payroxa.com", tone: "muted" },
  { at: "09:12:04", actor: "ops@payroxa.com", action: "Network switch", target: "devnet → devnet", meta: "No-op · verified", tone: "muted" },
  { at: "08:58:11", actor: "finance@payroxa.com", action: "Rewards config", target: "referral bonus", meta: "500 → 750 PRX", tone: "warning" },
  { at: "08:44:59", actor: "system", action: "Rate limit hit", target: "/crypto/send", meta: "user_1287 · 12 req/min", tone: "warning" },
];

const toneClass: Record<string, string> = {
  primary: "bg-primary-soft text-primary",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-warning/15 text-warning",
  muted: "bg-secondary text-muted-foreground",
};

function AdminAudit() {
  return (
    <AdminPage
      title="Audit Log"
      subtitle="Immutable record of privileged actions"
      actions={
        <>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </>
      }
    >
      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="divide-y divide-border/60">
          {events.map((e, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4">
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-primary-soft text-primary">
                <ScrollText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass[e.tone]}`}>
                    {e.action}
                  </span>
                  <span className="text-sm font-medium text-foreground">{e.target}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {e.meta} · by <span className="font-medium text-foreground">{e.actor}</span>
                </p>
              </div>
              <span className="whitespace-nowrap text-[11px] font-mono text-muted-foreground">{e.at}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminPage>
  );
}
