import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, User, Phone } from "lucide-react";
import { AuthLayout, Field, TextInput, PrimaryButton } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Create account · Payroxa" },
      { name: "description", content: "Create your Payroxa account in minutes and start powering your payments." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your Payroxa account"
      subtitle="Join thousands using Payroxa to move money smarter."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <Field label="Full name">
          <TextInput leading={<User className="h-4 w-4" />} placeholder="Olamide Adeyemi" />
        </Field>
        <Field label="Email address">
          <TextInput leading={<Mail className="h-4 w-4" />} placeholder="you@payroxa.com" />
        </Field>
        <Field label="Phone number">
          <TextInput leading={<Phone className="h-4 w-4" />} placeholder="+234 8•• ••• ••••" />
        </Field>
        <Field label="Password" hint="Min. 8 characters">
          <TextInput type="password" leading={<Lock className="h-4 w-4" />} placeholder="Create a password" />
        </Field>

        <label className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed text-muted-foreground">
          <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-[color:var(--primary)]" defaultChecked />
          <span>
            I agree to Payroxa's{" "}
            <a className="font-medium text-primary">Terms of Service</a> and{" "}
            <a className="font-medium text-primary">Privacy Policy</a>.
          </span>
        </label>

        <PrimaryButton type="submit">Create account</PrimaryButton>
      </form>
    </AuthLayout>
  );
}
