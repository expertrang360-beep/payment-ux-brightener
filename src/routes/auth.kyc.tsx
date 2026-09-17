import { createFileRoute } from "@tanstack/react-router";
import { Camera, IdCard, MapPin, Check } from "lucide-react";
import { AuthLayout, PrimaryButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/auth/kyc")({
  head: () => ({
    meta: [
      { title: "KYC Verification · Payroxa" },
      { name: "description", content: "Complete your KYC verification to unlock higher limits and full Payroxa features." },
    ],
  }),
  component: KycPage,
});

const steps = [
  { icon: IdCard, title: "Government ID", desc: "NIN, BVN or passport", done: true },
  { icon: Camera, title: "Selfie verification", desc: "Quick face match", done: true },
  { icon: MapPin, title: "Proof of address", desc: "Utility bill or bank statement", done: false },
];

function KycPage() {
  return (
    <AuthLayout
      eyebrow="Verification · Tier 2"
      title="Complete your KYC"
      subtitle="Upgrade to Tier 2 to unlock ₦5,000,000 daily limits and international transfers."
    >
      <div className="space-y-3">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  s.done ? "bg-success/10 text-success" : "bg-primary-soft text-primary"
                }`}
              >
                {s.done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-[11px] text-muted-foreground">{s.desc}</p>
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  s.done ? "text-success" : "text-primary"
                }`}
              >
                {s.done ? "Done" : "Start"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-primary-soft p-4 text-xs leading-relaxed text-foreground">
        Your documents are encrypted end-to-end and reviewed within 24 hours.
      </div>

      <div className="mt-6">
        <PrimaryButton>Continue to proof of address</PrimaryButton>
      </div>
    </AuthLayout>
  );
}
