import { useState } from "react";
import { Check, ChevronDown, Search, X, Landmark } from "lucide-react";

export const NG_BANKS = [
  { code: "044", name: "Access Bank", color: "bg-orange-500" },
  { code: "058", name: "Guaranty Trust Bank", color: "bg-red-600" },
  { code: "057", name: "Zenith Bank", color: "bg-red-700" },
  { code: "011", name: "First Bank of Nigeria", color: "bg-blue-800" },
  { code: "033", name: "United Bank for Africa", color: "bg-rose-600" },
  { code: "070", name: "Fidelity Bank", color: "bg-violet-700" },
  { code: "232", name: "Sterling Bank", color: "bg-amber-500" },
  { code: "050", name: "Ecobank Nigeria", color: "bg-sky-700" },
  { code: "50211", name: "Kuda Microfinance Bank", color: "bg-fuchsia-600" },
  { code: "999992", name: "Opay Digital Services", color: "bg-emerald-600" },
  { code: "50515", name: "Moniepoint MFB", color: "bg-blue-600" },
  { code: "100004", name: "PalmPay", color: "bg-purple-600" },
  { code: "215", name: "Unity Bank", color: "bg-green-700" },
  { code: "032", name: "Union Bank", color: "bg-blue-900" },
  { code: "221", name: "Stanbic IBTC Bank", color: "bg-blue-700" },
];

export type Bank = (typeof NG_BANKS)[number];

export function BankSelect({
  value,
  onChange,
}: {
  value: Bank | null;
  onChange: (b: Bank) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = NG_BANKS.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 text-left transition hover:border-primary/50"
      >
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white ${value?.color ?? "bg-secondary text-muted-foreground"}`}
        >
          {value ? value.name.slice(0, 2).toUpperCase() : <Landmark className="h-4 w-4" />}
        </span>
        <span className="flex-1">
          <span className="block text-[11px] text-muted-foreground">Recipient bank</span>
          <span className="block text-sm font-semibold text-foreground">
            {value?.name ?? "Select bank"}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-md rounded-t-3xl bg-background pb-8 pt-4 shadow-card">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <div className="flex items-center justify-between px-5 pb-3">
              <h3 className="text-base font-semibold text-foreground">Select bank</h3>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mx-5 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search 200+ banks"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <ul className="mt-3 max-h-[55vh] overflow-y-auto px-2">
              {filtered.map((b) => {
                const active = value?.code === b.code;
                return (
                  <li key={b.code}>
                    <button
                      onClick={() => {
                        onChange(b);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-secondary"
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-bold text-white ${b.color}`}
                      >
                        {b.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">{b.name}</span>
                      {active && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No banks match "{q}"
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
