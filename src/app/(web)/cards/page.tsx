import getAdminCards from "@/shared/api/services/cards/get-admin-cards.service";
import type GetAdminCardsParams from "@/shared/api/services/cards/model/get-admin-cards-params.type";
import type AdminCardStatus from "@/shared/api/services/cards/model/admin-card-status.type";
import type PageResponseAdminCard from "@/shared/api/services/cards/model/page-response-admin-card.type";
import config from "@/shared/constatns/config";
import AdminCardList from "@/widgets/admin-card-list";

interface CardsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const availableStatuses: AdminCardStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "DELETE_REQUESTED",
];

const readQueryValue = (value: string | string[] | undefined) => {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
};

const toOptionalNumber = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return parsed;
};

const toOptionalNumberArray = (value: string | string[] | undefined) => {
  if (!value) {
    return undefined;
  }

  const rawValues = Array.isArray(value) ? value : value.split(",");
  const parsedValues = rawValues
    .map((rawValue) => Number(rawValue.trim()))
    .filter((parsedValue) => Number.isInteger(parsedValue));

  if (parsedValues.length === 0) {
    return undefined;
  }

  return parsedValues;
};

const toStatusFilter = (value: string | undefined) => {
  if (!value) {
    return "PENDING";
  }

  if (availableStatuses.includes(value as AdminCardStatus)) {
    return value as AdminCardStatus;
  }

  return "PENDING";
};

const parseFilters = (
  params: Record<string, string | string[] | undefined>,
): GetAdminCardsParams => {
  const page = toOptionalNumber(readQueryValue(params.page));
  const size = toOptionalNumber(readQueryValue(params.size));
  const sort = readQueryValue(params.sort);

  return {
    page: page ?? 0,
    size: size ?? config.adminCardsPageSize,
    sort: sort === "ASC" ? "ASC" : "DESC",
    status: toStatusFilter(readQueryValue(params.status)),
    cardId: toOptionalNumber(readQueryValue(params.cardId)),
    originId: readQueryValue(params.originId),
    startDate: readQueryValue(params.startDate),
    endDate: readQueryValue(params.endDate),
    categoryIds: toOptionalNumberArray(params.categoryIds),
  };
};

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

const CardsPage = async ({ searchParams }: CardsPageProps) => {
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialFilters = parseFilters(resolvedSearchParams);

  let initialPage = createEmptyAdminCardPage();
  let initialFetchErrorMessage: string | null = null;

  try {
    initialPage = await getAdminCards(initialFilters);
  } catch (error) {
    const apiError = error as { message?: string };
    initialFetchErrorMessage =
      apiError.message ?? "카드 목록을 불러오지 못했습니다.";
    initialPage = createEmptyAdminCardPage();
  }

  return (
    <AdminCardList
      initialFetchErrorMessage={initialFetchErrorMessage}
      initialFilters={initialFilters}
      initialPage={initialPage}
    />
  );
};

export default CardsPage;
