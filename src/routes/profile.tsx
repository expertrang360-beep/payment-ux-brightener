import { createFileRoute } from "@tanstack/react-router";
import {
  Bell, ChevronRight, Fingerprint, HelpCircle, KeyRound, LogOut,
  Moon, ShieldCheck, Smartphone, UserCog,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · Payroxa" },
      { name: "description", content: "Manage your Payroxa account, security, notifications and preferences." },
    ],
  }),
  component: ProfilePage,
});

const groups: { title: string; items: { icon: React.ComponentType<{className?: string}>; label: string; hint?: string; toggle?: boolean }[] }[] = [
  {
    title: "Account",
    items: [
      { icon: UserCog, label: "Personal information" },
      { icon: ShieldCheck, label: "KYC & Verification", hint: "Tier 2" },
      { icon: Smartphone, label: "Device management" },
    ],
  },
  {
    title: "Security",
    items: [
      { icon: KeyRound, label: "Transaction PIN" },
      { icon: Fingerprint, label: "Biometric login", toggle: true },
      { icon: ShieldCheck, label: "Login history" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", toggle: true },
      { icon: Moon, label: "Dark mode", toggle: true },
      { icon: HelpCircle, label: "Help & Support" },
    ],
  },
];

function ProfilePage() {
  return (
    <AppShell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
      </header>

      <section className="px-5">
        <div className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-soft">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary">
            OA
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-foreground">Olamide Adeyemi</p>
            <p className="truncate text-xs text-muted-foreground">olamide@payroxa.com</p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
              <ShieldCheck className="h-3 w-3" /> Verified · Tier 2
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-6 px-5">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </h2>
            <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
              {g.items.map((it, i) => {
                const Icon = it.icon;
                return (
                  <button
                    key={it.label}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-secondary/60 ${
                      i !== 0 ? "border-t border-border/60" : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground">
                      <Icon className="h-[17px] w-[17px]" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">{it.label}</span>
                    {it.hint && (
                      <span className="text-[11px] font-medium text-muted-foreground">{it.hint}</span>
                    )}
                    {it.toggle ? (
                      <span className="relative flex h-5 w-9 items-center rounded-full bg-primary p-0.5">
                        <span className="ml-auto h-4 w-4 rounded-full bg-white shadow-soft" />
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 py-3.5 text-sm font-semibold text-destructive transition hover:bg-destructive/10">
          <LogOut className="h-4 w-4" /> Log out
        </button>

        <p className="pb-4 text-center text-[11px] text-muted-foreground">
          Payroxa v1.0 · Powering Every Payment
        </p>
      </div>
    </AppShell>
  );
}
