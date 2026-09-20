import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Headphones,
  Loader2,
  MessageCircle,
  Sparkles,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { triageTripIssue, type TripIssueTriage } from "@/lib/trip-support.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mobility-support")({
  head: () => ({
    meta: [
      { title: "Trip help · Payroxa Mobility" },
      {
        name: "description",
        content:
          "Describe a ride, delivery or logistics problem and get an instant category, urgency and clear next steps from Payroxa.",
      },
      { property: "og:title", content: "Payroxa trip help" },
      {
        property: "og:description",
        content: "Instant help for ride and delivery issues, with suggested next steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TripSupportPage,
});

const contexts = ["Ride", "Delivery", "Logistics"] as const;

const examples = [
  "My courier marked the parcel delivered but nothing arrived at my address.",
  "The driver took a much longer route and I was charged more than the quote.",
  "I left my phone on the back seat of the Corolla after my trip this morning.",
];

const urgencyStyles: Record<TripIssueTriage["urgency"], string> = {
  low: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
};

function TripSupportPage() {
  const triage = useServerFn(triageTripIssue);
  const [context, setContext] = useState<(typeof contexts)[number]>("Ride");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TripIssueTriage | null>(null);

  const canSubmit = description.trim().length >= 10 && !loading;

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await triage({ data: { description: description.trim(), context } });
      setResult(data);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader title="Trip help" subtitle="Tell us what went wrong" back="/mobility" />

      <section className="px-5">
        <div className="flex items-start gap-3 rounded-2xl bg-primary-soft p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Instant issue assistant</p>
            <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
              Describe the problem in your own words. We sort it and suggest what to do next.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-foreground">What was it about?</p>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1">
            {contexts.map((item) => (
              <Button
                key={item}
                type="button"
                variant="ghost"
                onClick={() => setContext(item)}
                className={cn(
                  "h-10 px-2 text-xs text-muted-foreground shadow-none",
                  context === item && "bg-background text-primary shadow-soft hover:bg-background",
                )}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="issue" className="text-sm font-semibold text-foreground">
            Describe the issue
          </label>
          <textarea
            id="issue"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            maxLength={2000}
            placeholder="E.g. My package was picked up two hours ago and the courier is not moving."
            className="mt-2 w-full resize-none rounded-2xl border border-border bg-card p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {examples.map((example) => (
              <Button
                key={example}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto whitespace-normal px-3 py-1.5 text-left text-[11px] font-normal"
                onClick={() => setDescription(example)}
              >
                {example.slice(0, 38)}…
              </Button>
            ))}
          </div>
        </div>

        <Button className="mt-5 w-full" size="lg" disabled={!canSubmit} onClick={submit}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Reviewing your issue…
            </>
          ) : (
            <>
              <Bot className="h-4 w-4" /> Get help
            </>
          )}
        </Button>
        {description.trim().length > 0 && description.trim().length < 10 && (
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Add a few more words so we can understand the problem.
          </p>
        )}

        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
            <p className="text-xs leading-5 text-foreground">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
                  {result.category}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold capitalize",
                    urgencyStyles[result.urgency],
                  )}
                >
                  {result.urgency} urgency
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground">{result.summary}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <p className="text-sm font-semibold text-foreground">Suggested next steps</p>
              <ul className="mt-3 space-y-3">
                {result.next_steps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-foreground">
                      {index + 1}
                    </span>
                    <p className="text-xs leading-5 text-foreground">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            {result.refund_likely && (
              <div className="flex items-center gap-3 rounded-2xl bg-success/5 p-4">
                <Wallet className="h-5 w-5 shrink-0 text-success" />
                <p className="text-xs leading-5 text-foreground">
                  A refund to your Payroxa wallet is likely once this is reviewed.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild>
                <Link to="/support">
                  <Headphones className="h-4 w-4" /> Support
                </Link>
              </Button>
              <Button variant={result.contact_support ? "default" : "secondary"} asChild>
                <Link to="/support">
                  <MessageCircle className="h-4 w-4" /> Chat agent
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-secondary p-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              <p className="text-[11px] leading-4 text-muted-foreground">
                Suggestions are automated. A Payroxa agent can always review your case.
              </p>
            </div>
          </div>
        )}
      </section>
    </AppShell>
  );
}
