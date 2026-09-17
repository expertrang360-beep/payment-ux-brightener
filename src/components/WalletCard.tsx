import { Eye, EyeOff, Plus, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function WalletCard({ balance = 248650.75 }: { balance?: number }) {
  const [hidden, setHidden] = useState(false);
  const formatted = new Intl.NumberFormat("en-NG", { minimumFractionDigits: 2 }).format(balance);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-primary">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/70">
            Wallet Balance
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[28px] font-semibold leading-none tracking-tight">
              {hidden ? "₦ ••••••" : `₦${formatted}`}
            </span>
            <button
              onClick={() => setHidden(!hidden)}
              className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10"
              aria-label={hidden ? "Show balance" : "Hide balance"}
            >
              {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1 text-xs text-white/60">Account · 8102 •• 4423</p>
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-3">
        <Link to="/fund" className="flex items-center justify-center gap-2 rounded-xl bg-white/15 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25">
          <Plus className="h-4 w-4" /> Fund Wallet
        </Link>
        <Link to="/transfer" className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-primary transition hover:bg-white/90">
          <ArrowUpRight className="h-4 w-4" /> Transfer
        </Link>
      </div>
    </div>
  );
}
