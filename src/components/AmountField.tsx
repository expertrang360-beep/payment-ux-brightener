import { useState } from "react";

export function AmountField({
  defaultValue = "0",
  label = "Amount",
  hint,
  quickAmounts = [1000, 5000, 10000, 25000, 50000],
}: {
  defaultValue?: string;
  label?: string;
  hint?: string;
  quickAmounts?: number[];
}) {
  const [value, setValue] = useState(defaultValue);

  const format = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    if (!digits) return "0";
    return Number(digits).toLocaleString("en-NG");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-muted-foreground">₦</span>
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(format(e.target.value))}
          className="w-full bg-transparent text-4xl font-semibold tracking-tight text-foreground outline-none"
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {quickAmounts.map((a) => (
          <button
            key={a}
            onClick={() => setValue(a.toLocaleString("en-NG"))}
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary-soft hover:text-primary"
          >
            +₦{a.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}
