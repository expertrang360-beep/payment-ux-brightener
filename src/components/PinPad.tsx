import { Delete } from "lucide-react";
import { useEffect } from "react";

export function PinPad({
  value,
  onChange,
  length = 4,
  label = "Enter transaction PIN",
  onComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  label?: string;
  onComplete?: (v: string) => void;
}) {
  useEffect(() => {
    if (value.length === length) onComplete?.(value);
  }, [value, length, onComplete]);

  const press = (d: string) => {
    if (value.length < length) onChange(value + d);
  };
  const back = () => onChange(value.slice(0, -1));

  return (
    <div>
      <p className="text-center text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-4 flex justify-center gap-3">
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full border-2 transition ${
              i < value.length ? "border-primary bg-primary" : "border-border bg-transparent"
            }`}
          />
        ))}
      </div>
      <div className="mx-auto mt-6 grid max-w-[280px] grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((k, i) =>
          k === "" ? (
            <span key={i} />
          ) : k === "del" ? (
            <button
              key={i}
              onClick={back}
              className="flex h-14 items-center justify-center rounded-2xl bg-secondary text-foreground transition hover:bg-accent"
              aria-label="Delete"
            >
              <Delete className="h-5 w-5" />
            </button>
          ) : (
            <button
              key={i}
              onClick={() => press(k)}
              className="h-14 rounded-2xl bg-secondary text-xl font-semibold text-foreground transition hover:bg-accent"
            >
              {k}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
