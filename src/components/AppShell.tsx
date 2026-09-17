import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CreditCard, Wallet, Gift, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
        <main className="flex-1 pb-28">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border/60 bg-background/95 backdrop-blur-lg">
          <ul className="flex items-stretch justify-between px-2 pb-3 pt-2">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to} className="flex-1">
                  <Link
                    to={to}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-colors",
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                        active && "bg-primary-soft",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
