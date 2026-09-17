import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Download, MoreHorizontal, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users · Payroxa Admin" },
      { name: "description", content: "Manage Payroxa customers, KYC status, wallet balances and account actions." },
    ],
  }),
  component: AdminUsers,
});

const users = [
  { name: "Olamide Adeyemi", email: "olamide@payroxa.com", tier: 2, status: "Active", balance: 248650.75, joined: "Feb 12, 2025" },
  { name: "Ada Ibeh", email: "ada.ibeh@gmail.com", tier: 2, status: "Active", balance: 84210.00, joined: "Mar 04, 2025" },
  { name: "Chidi Okoro", email: "chidi.o@yahoo.com", tier: 1, status: "Pending KYC", balance: 12400.50, joined: "May 18, 2026" },
  { name: "Fatima Yusuf", email: "fatima@gtb.com", tier: 3, status: "Active", balance: 1250800.00, joined: "Jan 06, 2024" },
  { name: "Tolu James", email: "tolu.j@outlook.com", tier: 2, status: "Restricted", balance: 4520.00, joined: "Apr 22, 2025" },
  { name: "Ngozi E.", email: "ngozi@payroxa.com", tier: 1, status: "Active", balance: 320.10, joined: "Jul 01, 2026" },
  { name: "Bello Ibrahim", email: "bello.i@mail.com", tier: 2, status: "Active", balance: 62050.25, joined: "Dec 30, 2024" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success",
  "Pending KYC": "bg-warning/10 text-warning",
  Restricted: "bg-destructive/10 text-destructive",
};

function AdminUsers() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">142,908 total · 3,204 new this week</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            + Invite user
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/60 p-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search by name, email, phone…"
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </div>
          {["All", "Active", "Pending KYC", "Restricted"].map((t, i) => (
            <button
              key={t}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                i === 0 ? "border-primary bg-primary-soft text-primary" : "border-border bg-background text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
          <button className="flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium">
            <Filter className="h-3.5 w-3.5" /> More
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-3 py-3 font-medium">Tier</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 text-right font-medium">Wallet</th>
                <th className="px-3 py-3 font-medium">Joined</th>
                <th className="px-3 py-3 pr-5" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-t border-border/60 transition hover:bg-secondary/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                        {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-[11px] text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-foreground">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Tier {u.tier}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-foreground">
                    ₦{u.balance.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">{u.joined}</td>
                  <td className="px-3 py-3 pr-5 text-right">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 px-5 py-3 text-xs text-muted-foreground">
          <span>Showing 1–7 of 142,908</span>
          <div className="flex items-center gap-1">
            <button className="rounded-md border border-border px-2 py-1">Prev</button>
            <button className="rounded-md bg-primary px-2 py-1 font-semibold text-primary-foreground">1</button>
            <button className="rounded-md border border-border px-2 py-1">2</button>
            <button className="rounded-md border border-border px-2 py-1">3</button>
            <button className="rounded-md border border-border px-2 py-1">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
