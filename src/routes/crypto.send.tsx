import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Coins, Send, ScanLine } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/crypto/send")({
  head: () => ({
    meta: [
      { title: "Send Crypto · Payroxa" },
      { name: "description", content: "Send PRX, SOL or USDC to any Solana wallet." },
    ],
  }),
  component: CryptoSend,
});

const assets = [
  { sym: "PRX", bal: "12,480.24" },
  { sym: "SOL", bal: "0.4218" },
  { sym: "USDC", bal: "24.00" },
];

function CryptoSend() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 px-5 pb-3 pt-6">
        <Link to="/crypto" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Send crypto</h1>
          <p className="text-xs text-muted-foreground">Solana Devnet · gas ≈ 0.000005 SOL</p>
        </div>
      </header>

      <section className="px-5 pb-6">
        <div className="rounded-2xl bg-card p-4 shadow-soft">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Asset</p>
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {assets.map((a, i) => (
              <button
                key={a.sym}
                className={`min-w-[110px] rounded-xl border p-3 text-left transition ${
                  i === 0 ? "border-primary bg-primary-soft/40 ring-2 ring-primary/20" : "border-border"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm font-semibold">{a.sym}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Bal {a.bal}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-card p-5 shadow-soft">
          <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Recipient</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5">
            <input
              placeholder="Solana address or .sol domain"
              className="flex-1 bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground"
            />
            <button className="text-muted-foreground"><ScanLine className="h-4 w-4" /></button>
          </div>

          <label className="mt-4 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Amount</label>
          <div className="mt-2 rounded-xl border border-border p-4">
            <div className="flex items-baseline gap-2">
              <input
                placeholder="0.00"
                className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none"
              />
              <span className="text-sm font-semibold text-muted-foreground">PRX</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">≈ $0.00 · ₦0.00</p>
          </div>
          <div className="mt-3 flex gap-2">
            {["25%", "50%", "Max"].map((c) => (
              <button key={c} className="flex-1 rounded-lg bg-secondary py-1.5 text-[11px] font-semibold">
                {c}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Memo (optional)</label>
          <input
            placeholder="Add a note"
            className="mt-2 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="mt-4 space-y-1.5 rounded-2xl border border-border/60 bg-card p-4 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">Network</span><span className="font-medium">Solana Devnet</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Network fee</span><span className="font-medium">~0.000005 SOL</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Arrival</span><span className="font-medium">~2 seconds</span></div>
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-primary">
          <Send className="h-4 w-4" /> Review & sign
        </button>
      </section>
    </AppShell>
  );
}
