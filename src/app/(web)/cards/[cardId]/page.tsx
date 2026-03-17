import getCategoryTree from "@/shared/api/services/categories/get-category-tree.service";
import type CategoryTreeNode from "@/shared/api/services/categories/category-tree-node.type";
import getAdminCardDetail from "@/shared/api/services/cards/get-admin-card-detail.service";
import type AdminCardCategory from "@/shared/api/services/cards/model/admin-card-category.type";
import type AdminCardResponse from "@/shared/api/services/cards/model/admin-card-response.type";
import AdminCardReview from "@/widgets/admin-card-review";

interface CardReviewPageProps {
  params: Promise<{ cardId: string }>;
}

const toNumberParam = (value: string) => {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
};

const toInitialCategoryIds = (card: AdminCardResponse) => {
  if (Array.isArray(card.categoryIds)) {
    return card.categoryIds;
  }

  if (Array.isArray(card.categories)) {
    return card.categories.map(
      (category: AdminCardCategory) => category.categoryId,
    );
  }

  return [];
};

const CardReviewPage = async ({ params }: CardReviewPageProps) => {
  const resolvedParams = await params;
  const cardId = toNumberParam(resolvedParams.cardId);

  if (cardId === null) {
    return (
      <section className="rounded-md border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        유효하지 않은 카드 ID입니다.
      </section>
    );
  }

  let card: AdminCardResponse | null = null;
  let categoryTree: CategoryTreeNode[] = [];
  let errorMessage: string | null = null;

  try {
    const [cardDetail, categories] = await Promise.all([
      getAdminCardDetail(cardId),
      getCategoryTree(),
    ]);

    card = cardDetail;
    categoryTree = categories;
  } catch (error) {
    const apiError = error as { message?: string };
    errorMessage = apiError.message ?? "카드 검수 정보를 불러오지 못했습니다.";
    card = null;
    categoryTree = [];
  }

  if (!card) {
    return (
      <section className="rounded-md border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        {errorMessage}
      </section>
    );
  }

  const initialCategoryIds = toInitialCategoryIds(card);
  const initialCategorySyncWarning =
    initialCategoryIds.length === 0
      ? "현재 카드에 연결된 카테고리 정보가 응답에 없어 빈 상태로 시작합니다."
      : null;

  return (
    <AdminCardReview
      card={card}
      categoryTree={categoryTree}
      initialCategoryIds={initialCategoryIds}
      initialCategorySyncWarning={initialCategorySyncWarning}
    />
  );
};

export default CardReviewPage;
