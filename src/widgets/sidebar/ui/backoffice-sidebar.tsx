"use client";

import {
  ClipboardCheck,
  CreditCard,
  PanelLeftClose,
  PanelLeftOpen,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import cn from "@/shared/lib/utils";
import navItems from "@/widgets/sidebar/model/nav-items.const";
import type BackofficeSidebarProps from "@/widgets/sidebar/model/props.type";
import backofficeSidebarStyle from "@/widgets/sidebar/style";

const iconByType = {
  inspection: ClipboardCheck,
  cards: CreditCard,
  members: Users,
} as const;

const BackofficeSidebar = ({ className }: BackofficeSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const slots = useMemo(
    () => backofficeSidebarStyle({ collapsed: isCollapsed }),
    [isCollapsed],
  );

  return (
    <aside className={cn(slots.root(), className)}>
      <div className={slots.brandArea()}>
        <span className={slots.brandDot()} />
        {!isCollapsed ? (
          <p className={slots.brandText()}>DEKK Backoffice</p>
        ) : null}
        <button
          aria-label="toggle sidebar"
          className={slots.collapseButton()}
          onClick={() => setIsCollapsed((prev) => !prev)}
          type="button"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelLeftClose size={16} />
          )}
        </button>
      </div>
      <nav aria-label="backoffice navigation" className={slots.nav()}>
        {navItems.map((item) => {
          const Icon = iconByType[item.icon];
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              className={cn(
                slots.navLink(),
                isActive ? slots.navLinkActive() : undefined,
              )}
              href={item.href}
              key={item.id}
            >
              <Icon size={16} />
              {!isCollapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default BackofficeSidebar;
