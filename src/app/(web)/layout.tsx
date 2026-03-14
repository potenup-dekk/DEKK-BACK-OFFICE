import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getIsAdminAuthenticated } from "@/shared/lib/auth";
import BackofficeHeader from "@/widgets/header";
import BackofficeSidebar from "@/widgets/sidebar";

interface WebLayoutProps {
  children: ReactNode;
}

const WebLayout = async ({ children }: Readonly<WebLayoutProps>) => {
  const isAuthenticated = await getIsAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <BackofficeSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <BackofficeHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default WebLayout;
