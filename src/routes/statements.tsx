import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Calendar, ChevronRight, Filter } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/statements")({
  head: () => ({
    meta: [
      { title: "Statements · Payroxa" },
      { name: "description", content: "Generate and download your Payroxa account statements." },
    ],
  }),
  component: StatementsPage,
});

const periods = ["Last 7 days", "Last 30 days", "Last 90 days", "This year", "Custom range"];
const files = [
  { label: "June 2026", size: "184 KB", date: "1 Jul 2026" },
  { label: "May 2026", size: "212 KB", date: "1 Jun 2026" },
  { label: "April 2026", size: "198 KB", date: "1 May 2026" },
  { label: "Q1 2026 · Summary", size: "512 KB", date: "5 Apr 2026" },
];

function StatementsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Statements"
        subtitle="Download your account activity."
        action={
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
            <Filter className="h-4 w-4" />
          </button>
        }
      />

      <section className="px-5">
        <div className="rounded-3xl bg-gradient-navy p-5 text-white shadow-primary">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Generate</p>
          <h2 className="mt-1 text-lg font-semibold">Custom statement</h2>
          <p className="mt-1 text-xs text-white/70">Choose a period and export as PDF or CSV.</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm backdrop-blur">
              <Calendar className="h-4 w-4 text-white/80" />
              <span className="flex-1">1 Jun 2026 – 30 Jun 2026</span>
              <ChevronRight className="h-4 w-4 text-white/70" />
            </div>
            <div className="flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/15 py-2.5 text-xs font-semibold backdrop-blur">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-xs font-semibold text-primary">
                <Download className="h-3.5 w-3.5" /> CSV
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
          Quick periods
        </h2>
        <div className="flex flex-wrap gap-2">
          {periods.map((p, i) => (
            <button
              key={p}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                i === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <h2 className="mb-3 text-[15px] font-semibold text-foreground">Recent statements</h2>
        <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-soft">
          {files.map((f) => (
            <button key={f.label} className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <FileText className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{f.label}</p>
                <p className="text-[11px] text-muted-foreground">Generated {f.date} · {f.size}</p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
