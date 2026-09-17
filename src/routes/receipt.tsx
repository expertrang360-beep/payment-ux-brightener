import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Copy, Download, Share2, Repeat, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/receipt")({
  head: () => ({
    meta: [
      { title: "Transaction Receipt · Payroxa" },
      { name: "description", content: "View, download and share your Payroxa transaction receipt." },
      { property: "og:title", content: "Transaction Receipt · Payroxa" },
      { property: "og:description", content: "View and share the details of a completed Payroxa transaction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReceiptPage,
});

const details = [
  ["Amount", "₦12,500.00"],
  ["Recipient", "Ada Okafor"],
  ["Bank", "GTBank · 0123456789"],
  ["Reference", "PYX-892310-4421"],
  ["Fee", "₦0.00"],
  ["Date", "8 Jul 2026 · 20:33"],
  ["Channel", "Wallet"],
];

function ReceiptPage() {
  const [copied, setCopied] = useState(false);
  const copyReference = async () => {
    await navigator.clipboard?.writeText("PYX-892310-4421");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const shareReceipt = async () => {
    const text = "Payroxa transfer receipt · ₦12,500.00 to Ada Okafor · PYX-892310-4421";
    if (navigator.share) await navigator.share({ title: "Payroxa receipt", text });
    else await navigator.clipboard?.writeText(text);
  };

  return (
    <AppShell>
      <PageHeader title="Receipt" subtitle="Transaction successful" />

      <section className="px-5">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card text-center shadow-card">
          <div className="h-1.5 bg-success" />
          <div className="p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Transfer Successful
          </p>
          <p className="mt-2 font-display text-4xl font-semibold text-foreground">₦12,500.00</p>
          <p className="mt-1 text-xs text-muted-foreground">To Ada Okafor · GTBank</p>

          <div className="mt-6 space-y-3 border-t border-dashed border-border/70 pt-5 text-left">
            {details.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="max-w-[62%] text-right font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-dashed border-border/70 pt-4 text-xs">
            <Button variant="secondary" onClick={copyReference} className="h-11 flex-col gap-0.5 px-2 text-[11px]">{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy ref"}</Button>
            <Button variant="secondary" onClick={shareReceipt} className="h-11 flex-col gap-0.5 px-2 text-[11px]"><Share2 /> Share</Button>
            <Button variant="secondary" onClick={() => window.print()} className="h-11 flex-col gap-0.5 px-2 text-[11px]"><Download /> Save PDF</Button>
          </div>
          <p aria-live="polite" className="sr-only">{copied ? "Reference copied" : ""}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Verified by Payroxa</div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Repeat className="h-4 w-4" /> Send again
          </Button>
          <Link
            to="/"
            className="flex items-center justify-center rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            Done
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
