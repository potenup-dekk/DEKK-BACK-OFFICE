import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const cache = "no-store";

import type ApiError from "@/shared/api/fetcher/api-error.type";
import getAdminCards from "@/shared/api/services/cards/get-admin-cards.service";
import type AdminCardStatus from "@/shared/api/services/cards/model/admin-card-status.type";
import config from "@/shared/constatns/config";

const availableStatuses: AdminCardStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "DELETE_REQUESTED",
];

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
} as const;

const invalidateAllCaches = () => {
  revalidatePath("/", "layout");
  revalidatePath("/cards");
  revalidatePath("/categories");
};

const isUnauthorizedApiError = (apiError: ApiError) => {
  return apiError.code.includes("401");
};

const toOptionalNumber = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return parsed;
};

const toOptionalStatus = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  if (availableStatuses.includes(value as AdminCardStatus)) {
    return value as AdminCardStatus;
  }

  return undefined;
};

const toCategoryIds = (searchParams: URLSearchParams) => {
  const rawValues = searchParams.getAll("categoryIds");

  if (rawValues.length === 0) {
    return undefined;
  }

  const parsedCategoryIds = rawValues
    .flatMap((rawValue) => rawValue.split(","))
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value));

  if (parsedCategoryIds.length === 0) {
    return undefined;
  }

  return parsedCategoryIds;
};

const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  try {
    const data = await getAdminCards({
      page: toOptionalNumber(searchParams.get("page")) ?? 0,
      size:
        toOptionalNumber(searchParams.get("size")) ?? config.adminCardsPageSize,
      sort: searchParams.get("sort") === "ASC" ? "ASC" : "DESC",
      status: toOptionalStatus(searchParams.get("status")),
      cardId: toOptionalNumber(searchParams.get("cardId")),
      originId: searchParams.get("originId") ?? undefined,
      startDate: searchParams.get("startDate") ?? undefined,
      endDate: searchParams.get("endDate") ?? undefined,
      categoryIds: toCategoryIds(searchParams),
    });

    return NextResponse.json(
      {
        code: "SC200005",
        message: "관리자 카드 목록 조회 성공",
        data,
      },
      {
        headers: noStoreHeaders,
      },
    );
  } catch (error) {
    const apiError = error as ApiError;

    if (isUnauthorizedApiError(apiError)) {
      invalidateAllCaches();
      return NextResponse.redirect(new URL("/login", request.url), {
        headers: noStoreHeaders,
      });
    }

    return NextResponse.json(
      {
        code: apiError.code ?? "EC50000",
        message: apiError.message ?? "카드 목록 조회에 실패했습니다.",
        errors: apiError.errors,
      },
      {
        status: 500,
        headers: noStoreHeaders,
      },
    );
  }
};

export { GET };
