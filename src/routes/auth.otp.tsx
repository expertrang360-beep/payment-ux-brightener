import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, PrimaryButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/auth/otp")({
  head: () => ({
    meta: [
      { title: "Verify OTP · Payroxa" },
      { name: "description", content: "Enter the one-time password sent to your device to verify your Payroxa account." },
    ],
  }),
  component: OtpPage,
});

function OtpPage() {
  return (
    <AuthLayout
      eyebrow="Verification"
      title="Enter the 6-digit code"
      subtitle="We sent a code to +234 8•• ••• 4423. It expires in 10 minutes."
      footer={
        <Link to="/auth/login" className="text-primary">
          Change number
        </Link>
      }
    >
      <div className="flex items-center justify-between gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <input
            key={i}
            inputMode="numeric"
            maxLength={1}
            defaultValue={i < 3 ? String(i + 1) : ""}
            className="h-14 w-full max-w-[52px] rounded-xl border border-border bg-card text-center text-lg font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/25"
          />
        ))}
      </div>

      <div className="mt-6">
        <PrimaryButton>Verify & continue</PrimaryButton>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Didn't get it? <button className="font-semibold text-primary">Resend in 42s</button>
      </p>
    </AuthLayout>
  );
}
