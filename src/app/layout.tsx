import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";

import BackofficeHeader from "@/widgets/header";
import BackofficeSidebar from "@/widgets/sidebar";

import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "DEKK Backoffice",
  description: "DEKK admin backoffice shell",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <div className="flex min-h-screen bg-background">
          <BackofficeSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <BackofficeHeader />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
