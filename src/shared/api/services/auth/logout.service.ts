import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestAuthApi from "@/shared/api/fetcher/request-auth-api";

interface LogoutServiceResult {
  setCookieHeaders: string[];
}

const isKnownLogoutSuccessCode = (code: string) => {
  switch (code) {
    case "SA20002":
    case "SAD20002":
    case "AD20002": {
      return true;
    }
    default: {
      return false;
    }
  }
};

const logout = async () => {
  const { response, setCookieHeaders } = await requestAuthApi<null>(
    "/adm/v1/auth/logout",
    {
      method: "POST",
    },
  );

  if (
    isKnownLogoutSuccessCode(response.code) ||
    response.code.startsWith("S")
  ) {
    return { setCookieHeaders } satisfies LogoutServiceResult;
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default logout;
