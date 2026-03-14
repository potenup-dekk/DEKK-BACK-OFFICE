import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: Readonly<AuthLayoutProps>) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      {children}
    </main>
  );
};

export default AuthLayout;
