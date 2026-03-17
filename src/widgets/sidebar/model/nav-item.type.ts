type SidebarMenuId = "cards" | "members" | "categories";

interface SidebarNavItem {
  id: SidebarMenuId;
  href: string;
  label: string;
  icon: "cards" | "members" | "categories";
}

export type { SidebarMenuId, SidebarNavItem };
