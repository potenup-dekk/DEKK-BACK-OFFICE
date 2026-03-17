"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import logoutAction from "@/shared/api/actions/auth/logout.action";
import Button from "@/shared/ui/button";
import type SignOutButtonProps from "@/features/admin-auth/sign-out/model/props.type";

const SignOutButton = ({ className }: SignOutButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await logoutAction();
      router.replace("/login");
      router.refresh();
    });
  };

  return (
    <Button
      className={className}
      disabled={isPending}
      onClick={handleClick}
      size="sm"
      type="button"
      variant="subtle"
    >
      로그아웃
    </Button>
  );
};

export default SignOutButton;
