import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestAuthApi from "@/shared/api/fetcher/request-auth-api";

interface AdminLoginRequest {
  email: string;
  password: string;
}

interface LoginServiceResult {
  setCookieHeaders: string[];
}

const isKnownLoginSuccessCode = (code: string) => {
  switch (code) {
    case "SA20001":
    case "SAD20001":
    case "AD20001": {
      return true;
    }
    default: {
      return false;
    }
  }
};

const login = async (payload: AdminLoginRequest) => {
  const { response, setCookieHeaders } = await requestAuthApi<null>(
    "/adm/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  if (isKnownLoginSuccessCode(response.code) || response.code.startsWith("S")) {
    return { setCookieHeaders } satisfies LoginServiceResult;
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default login;
