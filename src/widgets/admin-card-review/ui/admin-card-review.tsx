"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { ChevronLeft } from "lucide-react";

import approveCardAction from "@/shared/api/actions/cards/approve-card.action";
import assignCardCategoriesAction from "@/shared/api/actions/cards/assign-card-categories.action";
import rejectCardAction from "@/shared/api/actions/cards/reject-card.action";
import type CategoryTreeNode from "@/shared/api/services/categories/category-tree-node.type";
import getCardImageUrl from "@/shared/lib/get-card-image-url";
import cn from "@/shared/lib/utils";
import AccordianView from "@/shared/ui/accordian-view";
import Tag from "@/shared/ui/Badge";
import Button from "@/shared/ui/button";
import type { AdminCardReviewProps } from "@/widgets/admin-card-review/model/props.type";
import { adminCardReviewStyle } from "@/widgets/admin-card-review/style";
import Product from "@/widgets/admin-card-review/ui/product";

interface ErrorAlert {
  id: number;
  message: string;
}

const getSelectableCategories = (primaryCategory: CategoryTreeNode) => {
  const secondaryCategories = primaryCategory.children ?? [];

  if (secondaryCategories.length > 0) {
    return secondaryCategories;
  }

  return [
    {
      categoryId: primaryCategory.categoryId,
      name: primaryCategory.name,
      children: [],
    },
  ];
};

const AdminCardReview = ({
  card,
  categoryTree,
  initialCategoryIds,
}: AdminCardReviewProps) => {
  const [selectedCategoryIds, setSelectedCategoryIds] =
    useState<number[]>(initialCategoryIds);
  const [optimisticCategoryIds, setOptimisticCategoryIds] = useOptimistic<
    number[],
    number[]
  >(selectedCategoryIds, (_previousCategoryIds, nextCategoryIds) => {
    return nextCategoryIds;
  });
  const [errorAlerts, setErrorAlerts] = useState<ErrorAlert[]>([]);
  const [isPending, startTransition] = useTransition();
  const committedCategoryIdsRef = useRef<number[]>(initialCategoryIds);
  const queuedCategoryIdsRef = useRef<number[] | null>(null);
  const isSavingCategoriesRef = useRef(false);
  const errorAlertIdRef = useRef(0);
  const errorAlertTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>(
    [],
  );

  const slots = adminCardReviewStyle();

  const imageUrl = useMemo(() => {
    return getCardImageUrl({
      imageUrl: card.imageUrl,
      cardImageUrl: card.cardImageUrl,
    });
  }, [card.imageUrl, card.cardImageUrl]);

  useEffect(() => {
    return () => {
      errorAlertTimeoutsRef.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  const pushErrorAlert = (message: string) => {
    const nextAlertId = errorAlertIdRef.current + 1;
    errorAlertIdRef.current = nextAlertId;

    setErrorAlerts((previousAlerts) => {
      return [...previousAlerts, { id: nextAlertId, message }];
    });

    const timeoutId = setTimeout(() => {
      setErrorAlerts((previousAlerts) => {
        return previousAlerts.filter((alert) => alert.id !== nextAlertId);
      });

      errorAlertTimeoutsRef.current = errorAlertTimeoutsRef.current.filter(
        (activeTimeoutId) => activeTimeoutId !== timeoutId,
      );
    }, 1000);

    errorAlertTimeoutsRef.current.push(timeoutId);
  };

  const processCategorySaveQueue = async () => {
    if (isSavingCategoriesRef.current) {
      return;
    }

    if (!queuedCategoryIdsRef.current) {
      return;
    }

    isSavingCategoriesRef.current = true;
    while (queuedCategoryIdsRef.current) {
      const nextCategoryIds = queuedCategoryIdsRef.current;
      queuedCategoryIdsRef.current = null;

      const result = await assignCardCategoriesAction({
        cardId: card.cardId,
        categoryIds: nextCategoryIds,
      });

      if (!result.isSuccess) {
        const rollbackCategoryIds = committedCategoryIdsRef.current;

        setSelectedCategoryIds(rollbackCategoryIds);
        startTransition(() => {
          setOptimisticCategoryIds(rollbackCategoryIds);
        });
        queuedCategoryIdsRef.current = null;
        pushErrorAlert(result.message);
        break;
      }

      committedCategoryIdsRef.current = nextCategoryIds;
      setSelectedCategoryIds(nextCategoryIds);
    }

    isSavingCategoriesRef.current = false;
  };

  const handleCategoryToggle = (categoryId: number) => {
    const nextCategoryIds = optimisticCategoryIds.includes(categoryId)
      ? optimisticCategoryIds.filter((selectedCategoryId) => {
          return selectedCategoryId !== categoryId;
        })
      : [...optimisticCategoryIds, categoryId];

    if (nextCategoryIds.length === 0) {
      pushErrorAlert("카테고리는 최소 1개 이상 선택해야 합니다.");
      return;
    }

    startTransition(() => {
      setOptimisticCategoryIds(nextCategoryIds);
    });
    setSelectedCategoryIds(nextCategoryIds);
    queuedCategoryIdsRef.current = nextCategoryIds;
    void processCategorySaveQueue();
  };

  const handleApprove = () => {
    startTransition(async () => {
      const result = await approveCardAction({ cardId: card.cardId });

      if (!result.isSuccess) {
        pushErrorAlert(result.message);
        return;
      }
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      const result = await rejectCardAction({ cardId: card.cardId });

      if (!result.isSuccess) {
        pushErrorAlert(result.message);
        return;
      }
    });
  };

  const products = card.products ?? [];

  return (
    <section className={slots.root()}>
      {errorAlerts.length > 0 ? (
        <div className={slots.alertStack()}>
          {errorAlerts.map((alert) => {
            return (
              <p className={slots.alertItem()} key={alert.id} role="alert">
                {alert.message}
              </p>
            );
          })}
        </div>
      ) : null}

      <div className={slots.leftPane()}>
        <div className={slots.pageControlArea()}>
          <Link
            aria-label="목록으로 이동"
            className={slots.backLink()}
            href="/cards?status=PENDING"
            title="목록으로"
          >
            <ChevronLeft className={slots.backLinkIcon()} />
          </Link>
        </div>

        <div className={slots.cardArea()}>
          <article className={slots.previewColumn()}>
            <div className={slots.imageCard()}>
              <Image
                alt={`admin-card-front-${card.cardId}`}
                className="h-full w-full object-cover"
                src={imageUrl}
                width={320}
                height={480}
                unoptimized
              />
            </div>
          </article>

          <article className={slots.previewColumn()}>
            <div className={slots.infoCard()}>
              <div className={slots.backBody()}>
                {products.length > 0 ? (
                  <section className={slots.productList()}>
                    {products.map((product) => {
                      return (
                        <Product
                          brand={product.brand}
                          fallbackImageUrl={imageUrl}
                          key={product.productId}
                          name={product.name}
                          productImageUrl={getCardImageUrl({
                            imageUrl: product.productImageUrl,
                          })}
                          productUrl={product.productUrl}
                        />
                      );
                    })}
                  </section>
                ) : (
                  <section className={slots.backHint()}>
                    등록된 상품 정보가 없습니다.
                  </section>
                )}
              </div>

              <section className={slots.backTagArea()}>
                <div className={slots.chipWrap()}>
                  {card.tags.length > 0
                    ? card.tags.map((tag) => {
                        return (
                          <Tag
                            key={`${card.cardId}-${tag}`}
                            label={`#${tag}`}
                          />
                        );
                      })
                    : null}
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>

      <article className={slots.rightPane()}>
        <AccordianView title={"카테고리 정보"}>
          <section className={slots.categoryArea()}>
            {categoryTree.length === 0 ? (
              <p className={slots.categoryEmptyText()}>
                표시할 카테고리가 없습니다.
              </p>
            ) : (
              categoryTree.map((primaryCategory) => {
                const selectableCategories =
                  getSelectableCategories(primaryCategory);

                return (
                  <div
                    className={slots.categoryColumn()}
                    key={primaryCategory.categoryId}
                  >
                    <h4 className={slots.categoryGroupTitle()}>
                      {primaryCategory.name}
                    </h4>

                    <div className={slots.chipWrap()}>
                      {selectableCategories.map((secondaryCategory) => {
                        const isSelected = optimisticCategoryIds.includes(
                          secondaryCategory.categoryId,
                        );

                        return (
                          <button
                            className={cn(
                              slots.categoryButton(),
                              isSelected
                                ? slots.categoryButtonActive()
                                : undefined,
                            )}
                            disabled={false}
                            key={`${primaryCategory.categoryId}-${secondaryCategory.categoryId}`}
                            onClick={() =>
                              handleCategoryToggle(secondaryCategory.categoryId)
                            }
                            type="button"
                          >
                            {secondaryCategory.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </AccordianView>

        <div className={slots.footer()}>
          <div className={slots.actionRow()}>
            <Button
              className="flex-1"
              disabled={isPending}
              onClick={handleApprove}
              variant="primary"
            >
              승인
            </Button>
            <Button
              className="flex-1"
              disabled={isPending}
              onClick={handleReject}
              variant="danger"
            >
              반려
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AdminCardReview;
