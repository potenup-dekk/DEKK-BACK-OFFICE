"use server";

import type AuthActionResult from "@/shared/api/actions/auth/model/auth-action-result.type";
import logout from "@/shared/api/services/auth/logout.service";
import {
  applySetCookieHeaders,
  clearAdminAuthenticated,
} from "@/shared/lib/auth";
import { revalidatePath } from "next/cache";

const logoutAction = async (): Promise<AuthActionResult> => {
  try {
    const { setCookieHeaders } = await logout();

    await applySetCookieHeaders(setCookieHeaders);
    await clearAdminAuthenticated();
    revalidatePath("/", "layout");

    return {
      isSuccess: true,
      message: "로그아웃했습니다.",
    };
  } catch (error) {
    await clearAdminAuthenticated();

    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message: apiError.message ?? "로그아웃에 실패했습니다.",
      code: apiError.code,
    };
  }
};

export default logoutAction;
