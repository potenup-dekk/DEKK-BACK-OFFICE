type SidebarMenuId = "inspection" | "cards" | "members" | "categories";

interface SidebarNavItem {
  id: SidebarMenuId;
  href: string;
  label: string;
  icon: "inspection" | "cards" | "members" | "categories";
}

export type { SidebarMenuId, SidebarNavItem };
