import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ArrowLeftRight, BarChart3, Settings2,
  ShieldCheck, LifeBuoy, LogOut, Bell, Coins, Wallet as WalletIcon,
  Network, ScrollText, Mail,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

const overview = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Transactions", url: "/admin/transactions", icon: ArrowLeftRight },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

const crypto = [
  { title: "Crypto Overview", url: "/admin/crypto", icon: Coins },
  { title: "PRX Token", url: "/admin/token", icon: Coins },
  { title: "Wallets", url: "/admin/wallets", icon: WalletIcon },
  { title: "Network", url: "/admin/network", icon: Network },
];

const operations = [
  { title: "Audit Log", url: "/admin/audit", icon: ScrollText },
  { title: "Email Templates", url: "/admin/emails", icon: Mail },
  { title: "Compliance", url: "/admin/settings", icon: ShieldCheck },
  { title: "Settings", url: "/admin/settings", icon: Settings2 },
  { title: "Support inbox", url: "/admin/settings", icon: LifeBuoy },
];


export function AdminSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (path: string) =>
    path === "/admin" ? currentPath === "/admin" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/60">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-primary">
            <span className="text-sm font-bold">P</span>
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">Payroxa</p>
            <p className="truncate text-[10px] text-muted-foreground">Admin Console</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {[
          { label: "Overview", items: overview },
          { label: "Crypto", items: crypto },
          { label: "Operations", items: operations },
        ].map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Alerts">
              <Bell />
              <span>Alerts</span>
              <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive-foreground group-data-[collapsible=icon]:hidden">
                3
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign out">
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            AD
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">Admin Ops</p>
            <p className="truncate text-[10px] text-muted-foreground">ops@payroxa.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
