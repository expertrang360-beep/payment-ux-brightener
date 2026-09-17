import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Monitor, Smartphone, Copy, Check } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";
import { emailTemplates } from "@/emails/templates";

export const Route = createFileRoute("/admin/emails")({
  head: () => ({
    meta: [
      { title: "Email Templates · Payroxa Admin" },
      {
        name: "description",
        content:
          "Preview and manage Payroxa's branded email templates — authentication, receipts, security alerts and lifecycle messages.",
      },
      { property: "og:title", content: "Email Templates · Payroxa Admin" },
      {
        property: "og:description",
        content: "Branded transactional and authentication email designs for Payroxa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminEmails,
});

const categories = ["Authentication", "Transactional", "Lifecycle"] as const;

function AdminEmails() {
  const [activeId, setActiveId] = useState(emailTemplates[0].id);
  const [wide, setWide] = useState(true);
  const [copied, setCopied] = useState(false);
  const active = emailTemplates.find((t) => t.id === activeId)!;

  const copy = async () => {
    await navigator.clipboard.writeText(active.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <AdminPage
      title="Email Templates"
      subtitle="Branded HTML for every message Payroxa sends"
      actions={
        <>
          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            <button
              onClick={() => setWide(true)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${wide ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
            >
              <Monitor className="h-3.5 w-3.5" /> Desktop
            </button>
            <button
              onClick={() => setWide(false)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${!wide ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Mobile
            </button>
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-primary"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy HTML"}
          </button>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-5">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {cat}
              </p>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                {emailTemplates
                  .filter((t) => t.category === cat)
                  .map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveId(t.id)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                        i ? "border-t border-border/60" : ""
                      } ${t.id === activeId ? "bg-primary-soft" : "hover:bg-secondary/60"}`}
                    >
                      <span
                        className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg ${
                          t.id === activeId
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Mail className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {t.name}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {t.subject}
                        </span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </aside>

        <section className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
          <div className="mb-4 space-y-1 border-b border-border pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Subject
            </p>
            <p className="text-sm font-semibold text-foreground">{active.subject}</p>
            <p className="text-xs text-muted-foreground">{active.preheader}</p>
          </div>
          <div className="flex justify-center">
            <iframe
              key={active.id + String(wide)}
              title={`${active.name} email preview`}
              srcDoc={active.html}
              className="h-[760px] w-full rounded-xl border border-border bg-[#F1F5F9]"
              style={{ maxWidth: wide ? "100%" : 400 }}
            />
          </div>
        </section>
      </div>
    </AdminPage>
  );
}
