import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Copy, Share2, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/crypto/receive")({
  head: () => ({
    meta: [
      { title: "Receive Crypto · Payroxa" },
      { name: "description", content: "Receive PRX, SOL or USDC to your Payroxa Solana wallet." },
    ],
  }),
  component: CryptoReceive,
});

function CryptoReceive() {
  const address = "9xPq3fRLKcQBwjTn8mVsHkq22ZnPayroxaDev1";
  return (
    <AppShell>
      <header className="flex items-center gap-3 px-5 pb-3 pt-6">
        <Link to="/crypto" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Receive crypto</h1>
          <p className="text-xs text-muted-foreground">Only send Solana assets to this address</p>
        </div>
      </header>

      <section className="px-5 pb-6">
        <div className="flex gap-2">
          {["SOL", "PRX", "USDC"].map((t, i) => (
            <button
              key={t}
              className={`flex-1 rounded-xl border p-2.5 text-sm font-semibold transition ${
                i === 0 ? "border-primary bg-primary-soft/40 text-primary" : "border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-center rounded-3xl bg-card p-6 shadow-soft">
          <div className="flex h-56 w-56 items-center justify-center rounded-2xl bg-secondary p-2">
            {/* faux QR */}
            <div
              className="h-full w-full rounded-xl bg-navy"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, white 2px, transparent 3px), radial-gradient(circle at 75% 25%, white 2px, transparent 3px), radial-gradient(circle at 25% 75%, white 2px, transparent 3px), repeating-conic-gradient(hsl(var(--navy)) 0 25%, white 0 50%)",
                backgroundSize: "16px 16px",
              }}
            />
          </div>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Your Solana address</p>
          <code className="mt-1 max-w-full break-all text-center font-mono text-xs text-foreground">
            {address}
          </code>
          <div className="mt-4 grid w-full grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground">
              <Copy className="h-3.5 w-3.5" /> Copy address
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-xs font-semibold">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-xs">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-none text-warning" />
          <p className="leading-relaxed text-foreground">
            Send only Solana-based tokens (SOL, PRX, USDC-SPL) to this address.
            Sending assets from other chains will result in permanent loss.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
