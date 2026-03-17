import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";
import type AdminCardCategory from "@/shared/api/services/cards/model/admin-card-category.type";
import type AdminCardProduct from "@/shared/api/services/cards/model/admin-card-product.type";
import type AdminCardResponse from "@/shared/api/services/cards/model/admin-card-response.type";
import type {
  AdminCardDetailCategory,
  AdminCardDetailCategoryChild,
  AdminCardDetailProduct,
} from "@/shared/api/services/cards/model/admin-card-detail-response.type";
import type AdminCardDetailResponse from "@/shared/api/services/cards/model/admin-card-detail-response.type";

const isAdminCardDetailSuccessCode = (code: string) => {
  switch (code) {
    case "SC200006": {
      return true;
    }
    default: {
      return code.startsWith("SC");
    }
  }
};

const toAdminCardProduct = (
  product: AdminCardDetailProduct,
): AdminCardProduct => {
  return {
    productId: product.productId,
    brand: product.brand,
    name: product.name,
    productImageUrl: product.productImage?.imageUrl ?? "",
    productUrl: product.productUrl,
  };
};

const toLeafCategories = (
  category: AdminCardDetailCategory,
): AdminCardCategory[] => {
  const children = category.children ?? [];

  if (children.length === 0) {
    return [
      {
        categoryId: category.categoryId,
        name: category.name,
      },
    ];
  }

  return children.map((child: AdminCardDetailCategoryChild) => {
    return {
      categoryId: child.categoryId,
      name: child.name,
    };
  });
};

const toAdminCardResponse = (
  detail: AdminCardDetailResponse,
): AdminCardResponse => {
  const mappedCategories = (detail.categories ?? []).flatMap(toLeafCategories);

  return {
    cardId: detail.cardId,
    originId: detail.originId,
    status: detail.status,
    platform: detail.platform,
    targetGender: detail.targetGender,
    height: detail.height,
    weight: detail.weight,
    tags: detail.tags ?? [],
    imageUrl: detail.cardImage?.imageUrl,
    cardImageUrl: detail.cardImage?.imageUrl,
    products: (detail.products ?? []).map(toAdminCardProduct),
    categories: mappedCategories,
    categoryIds: mappedCategories.map((category) => category.categoryId),
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
  };
};

const getAdminCardDetail = async (cardId: number) => {
  const response = await requestApi<AdminCardDetailResponse>(
    `/adm/v1/cards/${cardId}`,
    {
      method: "GET",
    },
  );

  if (isAdminCardDetailSuccessCode(response.code)) {
    if (!response.data) {
      throw {
        code: "EMPTY_CARD_DETAIL",
        message: "카드 상세 데이터가 비어 있습니다.",
      } satisfies ApiError;
    }

    return toAdminCardResponse(response.data);
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default getAdminCardDetail;
