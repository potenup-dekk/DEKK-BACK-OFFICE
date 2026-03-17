import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";

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
      <body
        className={`${notoSansKr.variable} bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
