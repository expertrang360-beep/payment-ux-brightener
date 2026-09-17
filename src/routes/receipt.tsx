import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Copy, Download, Share2, Repeat } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/receipt")({
  head: () => ({
    meta: [
      { title: "Transaction Receipt · Payroxa" },
      { name: "description", content: "View, download and share your Payroxa transaction receipt." },
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
  return (
    <AppShell>
      <PageHeader title="Receipt" subtitle="Transaction successful" />

      <section className="px-5">
        <div className="rounded-3xl bg-card p-6 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Transfer Successful
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">₦12,500.00</p>
          <p className="mt-1 text-xs text-muted-foreground">To Ada Okafor · GTBank</p>

          <div className="mt-6 space-y-3 border-t border-dashed border-border/70 pt-5 text-left">
            {details.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-2 border-t border-dashed border-border/70 pt-4 text-xs">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-2.5 font-medium">
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-2.5 font-medium">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-2.5 font-medium">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card py-3 text-sm font-semibold text-foreground">
            <Repeat className="h-4 w-4" /> Send again
          </button>
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
