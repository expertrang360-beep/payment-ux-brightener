import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Smartphone, ChevronDown, Check, Loader2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/airtime")({
  head: () => ({
    meta: [
      { title: "Buy Airtime · Payroxa" },
      { name: "description", content: "Buy airtime for any Nigerian network instantly with Payroxa." },
      { property: "og:title", content: "Buy Airtime · Payroxa" },
      { property: "og:description", content: "Top up any Nigerian mobile number securely from your Payroxa wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AirtimePage,
});

const networks = [
  { name: "MTN", color: "bg-amber-400" },
  { name: "Airtel", color: "bg-rose-500" },
  { name: "Glo", color: "bg-emerald-500" },
  { name: "9mobile", color: "bg-teal-500" },
];

const amounts = [100, 200, 500, 1000, 2000, 5000];

function AirtimePage() {
  const navigate = useNavigate();
  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("1000");
  const [review, setReview] = useState(false);
  const [processing, setProcessing] = useState(false);
  const validPhone = phone.replace(/\D/g, "").length === 10;
  const total = Number(amount.replace(/\D/g, "")) || 0;

  return (
    <AppShell>
      <PageHeader title="Buy Airtime" subtitle="Top up instantly on any network" />

      <div className="space-y-5 px-5">
        <div>
          <p className="mb-2 text-xs font-medium text-foreground">Network</p>
          <div className="grid grid-cols-4 gap-2">
            {networks.map((n) => (
              <button
                key={n.name}
                onClick={() => setNetwork(n.name)}
                className={cn("relative flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition", network === n.name ? "border-primary bg-primary-soft" : "border-border bg-card")}
              >
                {network === n.name && <Check className="absolute right-1.5 top-1.5 h-3 w-3 text-primary" />}
                <span className={`h-8 w-8 rounded-full ${n.color}`} />
                <span className="text-[11px] font-semibold text-foreground">{n.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-foreground">Phone number</p>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground">
              🇳🇬 +234 <ChevronDown className="h-3 w-3" />
            </button>
            <div className="h-4 w-px bg-border" />
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <input
              inputMode="numeric"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="801 234 5678"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-foreground">Amount</p>
          <div className="rounded-xl border border-border bg-card px-3.5 py-3">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-muted-foreground">₦</span>
              <input
                inputMode="numeric"
                value={Number(amount || 0).toLocaleString("en-NG")}
                onChange={(event) => setAmount(event.target.value.replace(/\D/g, ""))}
                className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
              />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Wallet balance: ₦248,650.75
            </p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {amounts.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(String(a))}
                className={cn("rounded-xl border py-2 text-sm font-semibold transition", total === a ? "border-primary bg-primary-soft text-primary" : "border-border bg-card text-foreground")}
              >
                ₦{a.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-secondary p-4 text-xs">
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Cashback (Silver)</span>
             <span className="font-medium text-success">+₦{Math.max(1, Math.round(total * 0.01)).toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Fee</span>
            <span className="font-medium text-foreground">Free</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border/60 pt-2 text-sm">
            <span className="font-semibold text-foreground">Total</span>
             <span className="font-semibold text-foreground">₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <Button size="lg" disabled={!validPhone || total < 50} onClick={() => setReview(true)} className="w-full">Review payment</Button>
        {!validPhone && phone.length > 0 && <p className="-mt-3 text-xs text-destructive">Enter a valid 10-digit mobile number.</p>}
      </div>
      <BottomSheet open={review} onClose={() => !processing && setReview(false)} title="Confirm airtime purchase">
        {processing ? <div className="flex flex-col items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="mt-3 text-sm font-semibold">Processing payment…</p><p className="mt-1 text-xs text-muted-foreground">Please keep this screen open</p></div> : <>
          <div className="rounded-2xl bg-secondary p-5 text-center"><p className="text-xs text-muted-foreground">You will pay</p><p className="mt-1 font-display text-3xl font-semibold">₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p></div>
          <dl className="mt-4 space-y-3 rounded-2xl border border-border p-4 text-sm"><div className="flex justify-between"><dt className="text-muted-foreground">Network</dt><dd className="font-semibold">{network}</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Phone</dt><dd className="font-semibold">+234 {phone}</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Fee</dt><dd className="font-semibold text-success">Free</dd></div></dl>
          <Button size="lg" className="mt-5 w-full" onClick={() => { setProcessing(true); window.setTimeout(() => navigate({ to: "/receipt" }), 1200); }}>Pay from wallet</Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" /> Protected by Payroxa Safe</p>
        </>}
      </BottomSheet>
    </AppShell>
  );
}
