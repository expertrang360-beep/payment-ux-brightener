import { createFileRoute } from "@tanstack/react-router";
import { Search, Snowflake, ShieldCheck, ExternalLink, MoreHorizontal } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/wallets")({
  head: () => ({
    meta: [
      { title: "Wallets · Payroxa Admin" },
      { name: "description", content: "Search, freeze and inspect Solana wallets custodied for Payroxa users." },
    ],
  }),
  component: AdminWallets,
});

const rows = [
  { user: "Olamide Adeyemi", email: "olamide@payroxa.com", addr: "9xPq3f…Kq22Zn", prx: "12,480", sol: "0.42", status: "Active" },
  { user: "Ada Ibeh", email: "ada.i@gmail.com", addr: "3aBc7t…L9m8uL", prx: "5,204", sol: "0.19", status: "Active" },
  { user: "Chidi Okoye", email: "chidi.ok@yahoo.com", addr: "7wYxT2…N3JbT9", prx: "0", sol: "0.00", status: "Frozen" },
  { user: "Fatima Yusuf", email: "fatima.y@icloud.com", addr: "2f9dRk…4488Sw", prx: "802", sol: "0.05", status: "Active" },
  { user: "Tolu Johnson", email: "tolu@bandtech.io", addr: "1kVn9m…H5Hpqr", prx: "3,120", sol: "0.11", status: "Pending" },
  { user: "Bisi Adekunle", email: "bisi.a@payroxa.com", addr: "8mZp1x…P2G4vk", prx: "980", sol: "0.03", status: "Active" },
];

const statusStyle: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Frozen: "bg-destructive/10 text-destructive",
  Pending: "bg-warning/10 text-warning",
};

function AdminWallets() {
  return (
    <AdminPage
      title="Wallets"
      subtitle="Custodial Solana wallets · Turnkey backed"
      actions={
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> Bulk freeze
        </button>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search by user, email, or wallet address…"
            className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select className="rounded-lg border border-border bg-card px-3 py-2 text-xs">
          <option>All statuses</option>
          <option>Active</option>
          <option>Frozen</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-3 py-3 font-medium">Address</th>
                <th className="px-3 py-3 text-right font-medium">PRX</th>
                <th className="px-3 py-3 text-right font-medium">SOL</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 pr-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.addr} className="border-t border-border/60">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground">{r.user}</p>
                    <p className="text-[11px] text-muted-foreground">{r.email}</p>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <code className="font-mono text-[11px] text-primary">{r.addr}</code>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-foreground">{r.prx}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-muted-foreground">{r.sol}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 pr-5">
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-destructive" title="Freeze">
                        <Snowflake className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-lg border border-border p-1.5 text-muted-foreground">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  );
}
