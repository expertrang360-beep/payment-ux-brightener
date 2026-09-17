import { ArrowDownLeft, ArrowUpRight, Smartphone, Zap, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

export type TransactionStatus = "Successful" | "Pending" | "Failed";
export type TransactionKind = "Money in" | "Money out" | "Bills";

export type TransactionItem = {
  id: string;
  title: string;
  meta: string;
  amount: number;
  status: TransactionStatus;
  kind: TransactionKind;
  icon: "in" | "out" | "airtime" | "power" | "tv";
};

export const customerTransactions: TransactionItem[] = [
  { id: "PYX-892310-4421", title: "MTN Airtime", meta: "Today · 09:42", amount: -1000, status: "Successful", kind: "Bills", icon: "airtime" },
  { id: "PYX-892310-4418", title: "Ada Ibeh", meta: "Today · 08:11 · Transfer in", amount: 15000, status: "Successful", kind: "Money in", icon: "in" },
  { id: "PYX-892310-4389", title: "Wallet funding", meta: "Yesterday · 18:11", amount: 50000, status: "Successful", kind: "Money in", icon: "in" },
  { id: "PYX-892310-4374", title: "IKEDC Electricity", meta: "Yesterday · 12:04", amount: -8500, status: "Successful", kind: "Bills", icon: "power" },
  { id: "PYX-892310-4361", title: "Transfer to Chidi", meta: "Yesterday · 10:22", amount: -12500, status: "Pending", kind: "Money out", icon: "out" },
  { id: "PYX-892310-4280", title: "DSTV Compact Plus", meta: "Mon · 14:08", amount: -19800, status: "Failed", kind: "Bills", icon: "tv" },
];

const icons = { in: ArrowDownLeft, out: ArrowUpRight, airtime: Smartphone, power: Zap, tv: Tv };

export function TransactionList({ items }: { items: TransactionItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
        <p className="text-sm font-semibold text-foreground">No transactions found</p>
        <p className="mt-1 text-xs text-muted-foreground">Try another search or filter.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
      {items.map((transaction) => {
        const Icon = icons[transaction.icon];
        const credit = transaction.amount > 0;
        return (
          <div key={transaction.id} className="flex min-h-18 items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/50">
            <span className={cn("flex h-10 w-10 flex-none items-center justify-center rounded-xl", credit ? "bg-success/10 text-success" : "bg-secondary text-foreground")}>
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{transaction.title}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{transaction.meta}</p>
            </div>
            <div className="text-right">
              <p className={cn("whitespace-nowrap text-sm font-semibold", credit ? "text-success" : "text-foreground")}>
                {credit ? "+" : "−"}₦{Math.abs(transaction.amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
              <p className={cn("mt-0.5 text-[10px] font-medium", transaction.status === "Successful" && "text-success", transaction.status === "Pending" && "text-warning", transaction.status === "Failed" && "text-destructive")}>
                {transaction.status}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}