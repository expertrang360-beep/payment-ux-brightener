import { createFileRoute } from "@tanstack/react-router";
import { Network, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/network")({
  head: () => ({
    meta: [
      { title: "Network · Payroxa Admin" },
      { name: "description", content: "Switch Solana network environment and monitor RPC health." },
    ],
  }),
  component: AdminNetwork,
});

const networks = [
  { id: "devnet", name: "Devnet", desc: "Development & internal QA", slot: "298,412,004", tps: 2812, active: true },
  { id: "testnet", name: "Testnet", desc: "Staging & load testing", slot: "271,908,224", tps: 1994, active: false },
  { id: "mainnet-beta", name: "Mainnet Beta", desc: "Production traffic", slot: "312,224,908", tps: 3410, active: false },
];

function AdminNetwork() {
  return (
    <AdminPage
      title="Network Settings"
      subtitle="Solana RPC environment & health"
      actions={
        <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
          Save changes
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {networks.map((n) => (
          <label
            key={n.id}
            className={`cursor-pointer rounded-2xl border p-5 shadow-soft transition ${
              n.active ? "border-primary bg-primary-soft/40 ring-2 ring-primary/20" : "border-border bg-card"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Network className="h-4 w-4" />
              </span>
              <input
                type="radio"
                name="net"
                defaultChecked={n.active}
                className="h-4 w-4 accent-[color:var(--primary)]"
              />
            </div>
            <p className="text-base font-semibold text-foreground">{n.name}</p>
            <p className="text-[11px] text-muted-foreground">{n.desc}</p>
            <div className="mt-4 space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Slot</span><span className="font-mono text-foreground">{n.slot}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">TPS</span><span className="font-mono text-foreground">{n.tps}</span></div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Health</span>
                <span className="flex items-center gap-1 font-semibold text-success">
                  <CheckCircle2 className="h-3 w-3" /> Healthy
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 text-sm font-semibold text-foreground">RPC endpoint</p>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Primary RPC URL</label>
              <input
                defaultValue="https://api.devnet.solana.com"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Fallback RPC</label>
              <input
                defaultValue="https://devnet.helius-rpc.com/?api-key=•••••"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">Commitment level</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                <option>confirmed</option>
                <option>finalized</option>
                <option>processed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 text-sm font-semibold text-foreground">Turnkey signer</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Organization</p>
                <p className="text-[11px] text-muted-foreground">org_2f8Kd…payroxa</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
                <CheckCircle2 className="h-3 w-3" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Sub-org policy</p>
                <p className="text-[11px] text-muted-foreground">Per-user isolation, 2-of-3 admin</p>
              </div>
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-[11px] text-foreground">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none text-warning" />
              Switching to Mainnet requires compliance sign-off and rotates the PRX mint authority. Two admins must approve.
            </div>
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
