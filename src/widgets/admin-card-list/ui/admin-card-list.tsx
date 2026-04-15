"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type GetAdminCardsParams from "@/shared/api/services/cards/model/get-admin-cards-params.type";
import type AdminCardResponse from "@/shared/api/services/cards/model/admin-card-response.type";
import type AdminCardStatus from "@/shared/api/services/cards/model/admin-card-status.type";
import config from "@/shared/constatns/config";
import getCardImageUrl from "@/shared/lib/get-card-image-url";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import type AdminCardListProps from "@/widgets/admin-card-list/model/props.type";
import adminCardListStyle from "@/widgets/admin-card-list/style";

const statusOptions: Array<{ label: string; value: AdminCardStatus | "" }> = [
  { label: "전체", value: "" },
  { label: "대기 중", value: "PENDING" },
  { label: "승인 완료", value: "APPROVED" },
  { label: "반려된 카드", value: "REJECTED" },
  { label: "삭제된 카드", value: "DELETE_REQUESTED" },
];

const toDateInputValue = (value?: string) => {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
};

const getFilterValue = (
  value: GetAdminCardsParams[keyof GetAdminCardsParams],
) => {
  if (Array.isArray(value)) {
    return value.join(",");
  }

  if (typeof value === "number") {
    return String(value);
  }

  return value ?? "";
};

const isSuccessCode = (code: string) => {
  return code.startsWith("SC");
};

const createInfiniteQueryString = (
  params: GetAdminCardsParams,
  page: number,
  size: number,
) => {
  const query = new URLSearchParams();

  query.set("page", String(page));
  query.set("size", String(size));
  query.set("sort", params.sort === "ASC" ? "ASC" : "DESC");

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

const AdminCardList = ({
  initialPage,
  initialFilters,
  initialFetchErrorMessage,
}: AdminCardListProps) => {
  const router = useRouter();
  const slots = adminCardListStyle();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [cards, setCards] = useState(initialPage.content);
  const [currentPage, setCurrentPage] = useState(initialPage.currentPage);
  const [hasNext, setHasNext] = useState(initialPage.hasNext);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(
    initialFetchErrorMessage ?? null,
  );

  const baseFilters = useMemo(() => {
    return {
      ...initialFilters,
      page: undefined,
      size: undefined,
    } satisfies GetAdminCardsParams;
  }, [initialFilters]);

  useEffect(() => {
    setCards(initialPage.content);
    setCurrentPage(initialPage.currentPage);
    setHasNext(initialPage.hasNext);
    setFetchErrorMessage(initialFetchErrorMessage ?? null);
    setIsFetchingNextPage(false);
  }, [initialFetchErrorMessage, initialPage]);

  const fetchNextPage = useCallback(async () => {
    if (!hasNext || isFetchingNextPage) {
      return;
    }

    const nextPage = currentPage + 1;
    setIsFetchingNextPage(true);

    try {
      const queryString = createInfiniteQueryString(
        baseFilters,
        nextPage,
        config.adminCardsPageSize,
      );
      const response = await fetch(`/api/admin/cards?${queryString}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401 || response.redirected) {
        router.replace("/login");
        router.refresh();
        return;
      }

      const body = (await response.json()) as {
        code?: string;
        message?: string;
        data?: {
          content?: AdminCardResponse[];
          currentPage?: number;
          hasNext?: boolean;
        };
      };

      if (!body.code || !isSuccessCode(body.code) || !body.data) {
        throw new Error(
          body.message ?? "다음 카드 목록을 불러오지 못했습니다.",
        );
      }

      setCards((prevCards) => [...prevCards, ...(body.data?.content ?? [])]);
      setCurrentPage(body.data.currentPage ?? nextPage);
      setHasNext(Boolean(body.data.hasNext));
      setFetchErrorMessage(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "다음 카드 목록을 불러오지 못했습니다.";

      setFetchErrorMessage(message);
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [baseFilters, currentPage, hasNext, isFetchingNextPage, router]);

  useEffect(() => {
    const target = sentinelRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (!firstEntry?.isIntersecting) {
          return;
        }

        void fetchNextPage();
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage]);

  return (
    <section className={slots.root()}>
      <div className={slots.filterPanel()}>
        <form action="/cards" className={slots.filterGrid()}>
          <div className={slots.filterItem()}>
            <p className={slots.filterLabel()}>상태 필터</p>
            <select
              className="h-9 rounded-sm border border-border bg-card px-3 text-sm"
              defaultValue={getFilterValue(initialFilters.status)}
              name="status"
            >
              {statusOptions.map((statusOption) => {
                return (
                  <option key={statusOption.label} value={statusOption.value}>
                    {statusOption.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={slots.filterItem()}>
            <p className={slots.filterLabel()}>카드 ID 검색</p>
            <Input
              defaultValue={getFilterValue(initialFilters.cardId)}
              name="cardId"
              placeholder="카드 ID"
              type="number"
            />
          </div>

          <div className={slots.filterItem()}>
            <p className={slots.filterLabel()}>조회 시작일</p>
            <Input
              defaultValue={toDateInputValue(initialFilters.startDate)}
              name="startDate"
              type="date"
            />
          </div>

          <div className={slots.filterItem()}>
            <p className={slots.filterLabel()}>조회 종료일</p>
            <Input
              defaultValue={toDateInputValue(initialFilters.endDate)}
              name="endDate"
              type="date"
            />
          </div>

          <input
            defaultValue={getFilterValue(initialFilters.page) || "0"}
            name="page"
            type="hidden"
          />
          <input
            defaultValue={
              getFilterValue(initialFilters.size) ||
              String(config.adminCardsPageSize)
            }
            name="size"
            type="hidden"
          />

          <div className={slots.filterItem()}>
            <p className={slots.filterLabel()}>정렬 기준</p>
            <select
              className="h-9 rounded-sm border border-border bg-card px-3 text-sm"
              defaultValue={getFilterValue(initialFilters.sort)}
              name="sort"
            >
              <option value="DESC">최신순</option>
              <option value="ASC">오래된순</option>
            </select>
          </div>

          <div className={slots.filterActions()}>
            <Button
              aria-label="필터 적용"
              className="h-9 w-9 p-0"
              type="submit"
              variant="primary"
            >
              <Search size={16} />
            </Button>
            <Link
              aria-label="필터 초기화"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card transition-colors hover:bg-muted"
              href="/cards"
            >
              <RotateCcw size={16} />
            </Link>
          </div>
        </form>
      </div>

      {fetchErrorMessage ? (
        <p className={slots.error()}>{fetchErrorMessage}</p>
      ) : null}

      {cards.length === 0 ? (
        <div className={slots.empty()}>
          조회된 카드가 없습니다. 필터를 변경해 다시 시도해 주세요.
        </div>
      ) : (
        <>
          <div className={slots.grid()}>
            {cards.map((card) => {
              const imageUrl = getCardImageUrl({
                cardId: card.cardId,
                imageUrl: card.imageUrl,
                cardImageUrl: card.cardImageUrl,
              });

              return (
                <article className={slots.card()} key={card.cardId}>
                  <Link href={`/cards/${card.cardId}`}>
                    <div className={slots.cardImageWrap()}>
                      <Image
                        alt={`card-${card.cardId}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        fill
                        sizes="352px"
                        src={imageUrl}
                        unoptimized
                      />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          <div
            className="flex justify-center py-2 text-sm text-muted-foreground"
            ref={sentinelRef}
          >
            {isFetchingNextPage
              ? "카드를 더 불러오는 중..."
              : hasNext
                ? `스크롤하면 다음 카드 ${config.adminCardsPageSize}개를 불러옵니다.`
                : "모든 카드를 불러왔습니다."}
          </div>
        </>
      )}
    </section>
  );
};

export default AdminCardList;
