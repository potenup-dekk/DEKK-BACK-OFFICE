import { redirect } from "next/navigation";

import SignInForm from "@/features/admin-auth/sign-in";
import { getIsAdminAuthenticated } from "@/shared/lib/auth";

const LoginPage = async () => {
  const isAuthenticated = await getIsAdminAuthenticated();

  if (isAuthenticated) {
    redirect("/");
  }

  return <SignInForm />;
};

export default LoginPage;