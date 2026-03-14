import type ApiError from "@/shared/api/fetcher/api-error.type";
import type ApiResponse from "@/shared/api/fetcher/api-response.type";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

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
  return typeof candidate.code === "string" && typeof candidate.message === "string";
};

const createInvalidResponseError = (): ApiError => {
  return {
    code: "INVALID_API_RESPONSE",
    message: "응답 형식이 올바르지 않습니다.",
  };
};

const requestApi = async <T>(endpoint: string, init?: RequestInit): Promise<ApiResponse<T>> => {
  const response = await fetch(buildApiUrl(endpoint), {
    ...init,
    cache: init?.cache ?? "no-store",
    headers: {
      "Content-Type": "application/json",
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

  return body;
};

export default requestApi;
