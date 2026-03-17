import type ApiError from "@/shared/api/fetcher/api-error.type";
import type ApiResponse from "@/shared/api/fetcher/api-response.type";

interface AuthApiRequestResult<T> {
  response: ApiResponse<T>;
  setCookieHeaders: string[];
}

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const buildApiUrl = (endpoint: string) => {
  if (!API_BASE_URL) {
    return endpoint;
  }

  return `${API_BASE_URL.replace(/\/$/, "")}${endpoint}`;
};

const isApiResponse = <T>(value: unknown): value is ApiResponse<T> => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.code === "string" && typeof candidate.message === "string"
  );
};

const createInvalidResponseError = (): ApiError => {
  return {
    code: "INVALID_API_RESPONSE",
    message: "응답 형식이 올바르지 않습니다.",
  };
};

const getServerCookieHeader = async () => {
  if (typeof window !== "undefined") {
    return undefined;
  }

  const { cookies } = await import("next/headers");
  return (await cookies()).toString();
};

const splitSetCookieHeader = (rawSetCookie: string) => {
  const chunks: string[] = [];
  let current = "";
  let inExpiresAttribute = false;

  for (let index = 0; index < rawSetCookie.length; index += 1) {
    const char = rawSetCookie[index];

    if (char === "," && !inExpiresAttribute) {
      if (current.trim()) {
        chunks.push(current.trim());
      }

      current = "";
      continue;
    }

    current += char;

    const lowerCurrent = current.toLowerCase();

    if (lowerCurrent.endsWith("expires=")) {
      inExpiresAttribute = true;
    }

    if (inExpiresAttribute && char === ";") {
      inExpiresAttribute = false;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
};

const readSetCookieHeaders = (response: Response) => {
  if (typeof response.headers.getSetCookie === "function") {
    return response.headers.getSetCookie();
  }

  const rawSetCookie = response.headers.get("set-cookie");
  return rawSetCookie ? splitSetCookieHeader(rawSetCookie) : [];
};

const requestAuthApi = async <T>(
  endpoint: string,
  init?: RequestInit,
): Promise<AuthApiRequestResult<T>> => {
  const serverCookieHeader = await getServerCookieHeader();

  const response = await fetch(buildApiUrl(endpoint), {
    ...init,
    credentials: init?.credentials ?? "include",
    cache: init?.cache ?? "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(serverCookieHeader ? { Cookie: serverCookieHeader } : {}),
      ...init?.headers,
    },
  });

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw createInvalidResponseError();
  }

  if (!isApiResponse<T>(body)) {
    throw createInvalidResponseError();
  }

  return {
    response: body,
    setCookieHeaders: readSetCookieHeaders(response),
  };
};

export default requestAuthApi;
