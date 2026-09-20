import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, ChevronRight, Search, LifeBuoy, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support · Payroxa" },
      { name: "description", content: "Reach the Payroxa team — 24/7 in-app chat, phone or email support." },
    ],
  }),
  component: SupportPage,
});

const faqs = [
  "How do I fund my wallet?",
  "Why did my transfer fail?",
  "How do I upgrade my KYC tier?",
  "Are there fees for bill payments?",
  "How do I enable biometric login?",
];

const channels = [
  { icon: MessageCircle, title: "Chat with us", desc: "Average reply · 2 min", tint: "bg-primary-soft text-primary" },
  { icon: Phone, title: "Call support", desc: "0700 PAYROXA · 24/7", tint: "bg-success/10 text-success" },
  { icon: Mail, title: "Email us", desc: "help@payroxa.com", tint: "bg-warning/10 text-warning" },
];

function SupportPage() {
  return (
    <AppShell>
      <PageHeader title="Help & Support" subtitle="We're here anytime you need us" />

      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-primary">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <LifeBuoy className="h-6 w-6" />
            <div>
              <p className="text-sm font-semibold">Need urgent help?</p>
              <p className="mt-1 text-xs text-white/80">
                For lost cards, suspicious activity or account access, tap chat below and select "Emergency".
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/mobility-support"
          className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Ride or delivery issue</p>
            <p className="text-[11px] text-muted-foreground">Instant triage and next steps</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>

        <div className="mt-5 space-y-2">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.title}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-soft"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.tint}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground">{c.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <div className="mt-7">
          <p className="mb-3 text-[15px] font-semibold text-foreground">Frequently asked</p>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search the help center"
              className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
            />
          </div>
          <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
            {faqs.map((q, i) => (
              <button
                key={q}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm text-foreground transition hover:bg-secondary/60 ${
                  i !== 0 ? "border-t border-border/60" : ""
                }`}
              >
                <span className="flex-1">{q}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
