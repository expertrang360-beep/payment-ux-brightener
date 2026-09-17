import type { ReactNode } from "react";
import { X } from "lucide-react";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-md rounded-t-3xl bg-background pb-8 pt-4 shadow-card animate-in slide-in-from-bottom">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
        {title && (
          <div className="flex items-center justify-between px-5 pb-3">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="px-5">{children}</div>
      </div>
    </div>
  );
}
