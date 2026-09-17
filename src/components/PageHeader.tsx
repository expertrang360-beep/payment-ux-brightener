import type { ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  back = true,
  action,
}: {
  title: string;
  subtitle?: string;
  back?: boolean | string;
  action?: ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="flex items-start gap-3 px-5 pb-4 pt-6">
      {back ? (
        typeof back === "string" ? (
          <Link
            to={back}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        ) : (
          <button
            onClick={() => router.history.back()}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )
      ) : null}
      <div className="min-w-0 flex-1 pt-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
