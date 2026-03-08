"use client";

import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { navItemStyle } from "./style";

type MenuKey = "codi-review" | "all-codi";

interface BackOfficeShellProps extends PropsWithChildren {
  activeMenu: MenuKey;
  title: string;
}

const menuItems = [
  { key: "codi-review", label: "코디 검수", href: "/" },
  { key: "all-codi", label: "모든 코디", href: "/all-codi" },
] as const;

const BackOfficeShell = ({ activeMenu, title, children }: BackOfficeShellProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-primary">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl">
        <aside className="hidden w-60 shrink-0 border-r border-gray bg-white p-4 md:block">
          <p className="mb-4 text-base font-bold">DEKK Back Office</p>
          <nav className="flex flex-col gap-2">
            {menuItems.map((menu) => (
              <Link
                key={menu.key}
                href={menu.href}
                className={navItemStyle({ active: activeMenu === menu.key })}
              >
                {menu.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-gray px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="rounded-sm border border-primary px-2 py-1 text-sm font-medium md:hidden"
              >
                메뉴
              </button>
              <h1 className="text-base font-semibold md:text-lg">{title}</h1>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="메뉴 닫기"
          />
          <aside className="relative z-30 h-full w-64 border-r border-gray bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-bold">DEKK Back Office</p>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-sm border border-primary px-2 py-1 text-xs"
              >
                닫기
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {menuItems.map((menu) => (
                <Link
                  key={menu.key}
                  href={menu.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className={navItemStyle({ active: activeMenu === menu.key })}
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default BackOfficeShell;
