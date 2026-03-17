import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";
import type GetAdminCardsParams from "@/shared/api/services/cards/model/get-admin-cards-params.type";
import type PageResponseAdminCard from "@/shared/api/services/cards/model/page-response-admin-card.type";
import config from "@/shared/constatns/config";

const createEmptyAdminCardPage = (): PageResponseAdminCard => {
  return {
    content: [],
    currentPage: 0,
    size: config.adminCardsPageSize,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
  };
};

const isAdminCardListSuccessCode = (code: string) => {
  switch (code) {
    case "SC200005": {
      return true;
    }
    default: {
      return false;
    }
  }
};

const toQueryString = (params: GetAdminCardsParams) => {
  const query = new URLSearchParams();

  if (typeof params.page === "number") {
    query.set("page", String(params.page));
  }

  if (typeof params.size === "number") {
    query.set("size", String(params.size));
  }

  if (params.sort) {
    query.set("sort", params.sort);
  }

  if (params.status) {
    query.set("status", params.status);
  }

  if (typeof params.cardId === "number") {
    query.set("cardId", String(params.cardId));
  }

  if (params.originId) {
    query.set("originId", params.originId);
  }

  if (params.startDate) {
    query.set("startDate", params.startDate);
  }

  if (params.endDate) {
    query.set("endDate", params.endDate);
  }

  if (params.categoryIds && params.categoryIds.length > 0) {
    params.categoryIds.forEach((categoryId) => {
      query.append("categoryIds", String(categoryId));
    });
  }

  return query.toString();
};

const getAdminCards = async (params: GetAdminCardsParams = {}) => {
  const queryString = toQueryString(params);
  const endpoint = queryString
    ? `/adm/v1/cards?${queryString}`
    : "/adm/v1/cards";
  const response = await requestApi<PageResponseAdminCard>(endpoint, {
    method: "GET",
  });

  if (isAdminCardListSuccessCode(response.code)) {
    return response.data ?? createEmptyAdminCardPage();
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default getAdminCards;
