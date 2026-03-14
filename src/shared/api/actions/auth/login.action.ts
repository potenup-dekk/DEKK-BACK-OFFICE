"use server";

import type AuthActionResult from "@/shared/api/actions/auth/model/auth-action-result.type";
import type LoginParams from "@/shared/api/actions/auth/model/login-params.type";
import login from "@/shared/api/services/auth/login.service";
import {
  applySetCookieHeaders,
  markAdminAuthenticated,
} from "@/shared/lib/auth";
import { revalidatePath } from "next/cache";

const loginAction = async (params: LoginParams): Promise<AuthActionResult> => {
  if (!params.email || !params.password) {
    return {
      isSuccess: false,
      message: "이메일과 비밀번호를 입력해 주세요.",
      code: "INVALID_LOGIN_PARAMS",
    };
  }

  try {
    const { setCookieHeaders } = await login({
      email: params.email,
      password: params.password,
    });

    if (setCookieHeaders.length === 0) {
      return {
        isSuccess: false,
        message: "인증 쿠키를 받지 못했습니다. 다시 로그인해 주세요.",
        code: "AUTH_COOKIE_MISSING",
      };
    }

    await applySetCookieHeaders(setCookieHeaders);
    await markAdminAuthenticated();
    revalidatePath("/", "layout");

    return {
      isSuccess: true,
      message: "로그인에 성공했습니다.",
    };
  } catch (error) {
    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message: apiError.message ?? "로그인에 실패했습니다.",
      code: apiError.code,
    };
  }
};

export default loginAction;
