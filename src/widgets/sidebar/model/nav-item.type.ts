type SidebarMenuId = "inspection" | "cards" | "members";

interface SidebarNavItem {
  id: SidebarMenuId;
  href: string;
  label: string;
  icon: "inspection" | "cards" | "members";
}

export type { SidebarMenuId, SidebarNavItem };
