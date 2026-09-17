import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, Fingerprint } from "lucide-react";
import { AuthLayout, Field, TextInput, PrimaryButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Payroxa" },
      { name: "description", content: "Sign in to your Payroxa account to manage your wallet, pay bills and send money." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to Payroxa"
      subtitle="Enter your credentials to continue where you left off."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-semibold text-primary">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <Field label="Email or phone">
          <TextInput leading={<Mail className="h-4 w-4" />} placeholder="you@payroxa.com" />
        </Field>
        <Field
          label="Password"
          hint={
            <Link to="/auth/forgot" className="text-primary">
              Forgot?
            </Link>
          }
        >
          <TextInput type="password" leading={<Lock className="h-4 w-4" />} placeholder="••••••••" />
        </Field>

        <PrimaryButton type="submit">Sign in</PrimaryButton>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
        >
          <Fingerprint className="h-4 w-4 text-primary" />
          Use biometrics
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-[11px] text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        Protected by 256-bit encryption
        <div className="h-px flex-1 bg-border" />
      </div>
    </AuthLayout>
  );
}
