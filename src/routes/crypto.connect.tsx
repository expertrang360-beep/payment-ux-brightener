import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Wallet, ShieldCheck, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/crypto/connect")({
  head: () => ({
    meta: [
      { title: "Connect Wallet · Payroxa" },
      { name: "description", content: "Connect Phantom, Solflare or Backpack to Payroxa." },
    ],
  }),
  component: ConnectWallet,
});

const wallets = [
  { name: "Phantom", desc: "Most popular Solana wallet", installed: true },
  { name: "Solflare", desc: "Web, mobile & hardware", installed: true },
  { name: "Backpack", desc: "xNFT-ready Solana wallet", installed: false },
  { name: "Ledger", desc: "Hardware wallet", installed: false },
];

function ConnectWallet() {
  return (
    <AppShell>
      <header className="flex items-center gap-3 px-5 pb-3 pt-6">
        <Link to="/crypto" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <ArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Connect a wallet</h1>
          <p className="text-xs text-muted-foreground">Bring your own self-custody wallet</p>
        </div>
      </header>

      <section className="px-5 pb-6">
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-primary" />
          <p className="text-xs leading-relaxed text-foreground">
            Payroxa never has access to your seed phrase. Connections happen through the wallet's own signer.
          </p>
        </div>

        <div className="space-y-3">
          {wallets.map((w) => (
            <button
              key={w.name}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition hover:border-primary"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{w.name}</p>
                <p className="text-[11px] text-muted-foreground">{w.desc}</p>
              </div>
              {w.installed ? (
                <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[10px] font-semibold text-success">
                  <Check className="h-3 w-3" /> Detected
                </span>
              ) : (
                <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                  Install
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          By connecting, you agree to Payroxa's Terms and confirm you own the wallet.
        </p>
      </section>
    </AppShell>
  );
}
