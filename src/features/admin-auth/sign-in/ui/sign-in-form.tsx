"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState, useTransition } from "react";

import loginAction from "@/shared/api/actions/auth/login.action";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import type SignInFormProps from "@/features/admin-auth/sign-in/model/props.type";
import signInFormStyle from "@/features/admin-auth/sign-in/style";
import Image from "next/image";
import Logo from "../../../../../public/logo.png";

const SignInForm = ({ className }: SignInFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const slots = signInFormStyle();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    startTransition(async () => {
      const result = await loginAction({ email, password });

      if (!result.isSuccess) {
        setErrorMessage(result.message);
        return;
      }

      setErrorMessage(null);
      router.replace("/");
      router.refresh();
    });
  };

  return (
    <section className={[slots.root(), className].filter(Boolean).join(" ")}>
      <Image src={Logo} width={130} alt="" />
      <form className={slots.form()} onSubmit={handleSubmit}>
        <Input
          autoComplete="email"
          name="email"
          placeholder="이메일"
          type="email"
        />
        <Input
          autoComplete="current-password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <Button disabled={isPending} type="submit" variant="primary">
          로그인
        </Button>
      </form>
      {errorMessage ? (
        <p className={slots.errorMessage()}>{errorMessage}</p>
      ) : null}
    </section>
  );
};

export default SignInForm;
