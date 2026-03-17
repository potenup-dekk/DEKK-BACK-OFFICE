"use server";

import type AssignCardCategoriesParams from "@/shared/api/actions/cards/model/assign-card-categories-params.type";
import type CardManagementActionResult from "@/shared/api/actions/cards/model/card-management-action-result.type";
import assignCardCategories from "@/shared/api/services/cards/assign-card-categories.service";
import { revalidatePath } from "next/cache";

const assignCardCategoriesAction = async (
  params: AssignCardCategoriesParams,
): Promise<CardManagementActionResult> => {
  try {
    await assignCardCategories(params.cardId, {
      categoryIds: params.categoryIds,
    });

    revalidatePath("/cards");
    revalidatePath(`/cards/${params.cardId}`);

    return {
      isSuccess: true,
      message: "카테고리를 저장했습니다.",
    };
  } catch (error) {
    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message: apiError.message ?? "카테고리 저장에 실패했습니다.",
      code: apiError.code,
    };
  }
};

export default assignCardCategoriesAction;
