import { notFound } from "next/navigation";

import getCategoryTree from "@/shared/api/services/categories/get-category-tree.service";
import type CategoryTreeNode from "@/shared/api/services/categories/category-tree-node.type";
import getAdminCardDetail from "@/shared/api/services/cards/get-admin-card-detail.service";
import type AdminCardCategory from "@/shared/api/services/cards/model/admin-card-category.type";
import type AdminCardResponse from "@/shared/api/services/cards/model/admin-card-response.type";
import AdminCardReview from "@/widgets/admin-card-review";

interface CardReviewPageProps {
  params: Promise<{ cardId: string }>;
}

interface InitialCardReviewData {
  card: AdminCardResponse | null;
  categoryTree: CategoryTreeNode[];
  errorMessage: string | null;
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

const loadInitialCardReviewData = async (
  cardId: number,
): Promise<InitialCardReviewData> => {
  try {
    const [card, categoryTree] = await Promise.all([
      getAdminCardDetail(cardId),
      getCategoryTree(),
    ]);

    return {
      card,
      categoryTree,
      errorMessage: null,
    };
  } catch (error) {
    const apiError = error as { message?: string };

    return {
      card: null,
      categoryTree: [],
      errorMessage: apiError.message ?? "카드 검수 정보를 불러오지 못했습니다.",
    };
  }
};

const CardReviewPage = async ({ params }: CardReviewPageProps) => {
  const resolvedParams = await params;
  const cardId = toNumberParam(resolvedParams.cardId);

  if (cardId === null) {
    notFound();
  }

  const { card, categoryTree, errorMessage } =
    await loadInitialCardReviewData(cardId);

  if (!card) {
    return (
      <section className="rounded-md border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        {errorMessage}
      </section>
    );
  }

  const initialCategoryIds = toInitialCategoryIds(card);

  return (
    <AdminCardReview
      card={card}
      categoryTree={categoryTree}
      initialCategoryIds={initialCategoryIds}
    />
  );
};

export default CardReviewPage;
