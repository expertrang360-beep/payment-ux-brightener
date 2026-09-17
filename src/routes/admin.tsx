import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary/40">
        <AdminSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col bg-secondary/40">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/90 px-4 backdrop-blur-md">
            <SidebarTrigger />
            <div className="hidden flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 sm:flex md:max-w-md">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search users, transactions, tickets…"
                className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                ⌘K
              </kbd>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                AD
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
