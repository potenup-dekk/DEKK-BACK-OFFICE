import type { SidebarNavItem } from "@/widgets/sidebar/model/nav-item.type";

const navItems: SidebarNavItem[] = [
  {
    id: "cards",
    href: "/cards",
    label: "카드 목록",
    icon: "cards",
  },
  // {
  //   id: "members",
  //   href: "/members",
  //   label: "회원 관리",
  //   icon: "members",
  // },
  {
    id: "categories",
    href: "/categories",
    label: "카테고리 관리",
    icon: "categories",
  },
];

export default navItems;
