"use server";

import type CategoryActionResult from "@/shared/api/actions/categories/model/category-action-result.type";
import type DeleteCategoryParams from "@/shared/api/actions/categories/model/delete-category-params.type";
import deleteChildCategory from "@/shared/api/services/categories/delete-child-category.service";
import deleteParentCategory from "@/shared/api/services/categories/delete-parent-category.service";
import { revalidatePath } from "next/cache";

const deleteCategoryAction = async (
  params: DeleteCategoryParams,
): Promise<CategoryActionResult> => {
  try {
    if (params.level === "primary") {
      const childCategoryIds = params.childCategoryIds ?? [];

      if (childCategoryIds.length > 0) {
        await Promise.allSettled(
          childCategoryIds.map((categoryId) => deleteChildCategory(categoryId)),
        );
      }

      await deleteParentCategory(params.categoryId);
    } else {
      await Promise.all(
        params.categoryIds.map((categoryId) => deleteChildCategory(categoryId)),
      );
    }

    revalidatePath("/categories");

    return {
      isSuccess: true,
      message: "카테고리를 삭제했습니다.",
    };
  } catch (error) {
    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message:
        apiError.message ??
        "카테고리 삭제 중 오류가 발생했습니다. 하위 카테고리 상태를 확인해 주세요.",
      code: apiError.code,
    };
  }
};

export default deleteCategoryAction;
