import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AuthLayout, Field, TextInput, PrimaryButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({
    meta: [
      { title: "Reset password · Payroxa" },
      { name: "description", content: "Reset your Payroxa password securely." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <AuthLayout
      eyebrow="Password reset"
      title="Forgot your password?"
      subtitle="Enter the email tied to your account and we'll send you a reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/auth/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <Field label="Email address">
          <TextInput leading={<Mail className="h-4 w-4" />} placeholder="you@payroxa.com" />
        </Field>
        <PrimaryButton>Send reset link</PrimaryButton>
      </form>
    </AuthLayout>
  );
}
