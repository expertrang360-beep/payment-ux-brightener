import type { ReactNode } from "react";

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
      {action && <div className="text-xs font-medium text-primary">{action}</div>}
    </div>
  );
}
