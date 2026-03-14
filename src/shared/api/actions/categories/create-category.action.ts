"use server";

import createChildCategory from "@/shared/api/services/categories/create-child-category.service";
import createParentCategory from "@/shared/api/services/categories/create-parent-category.service";
import type CreateCategoryParams from "@/shared/api/actions/categories/model/create-category-params.type";
import type CategoryActionResult from "@/shared/api/actions/categories/model/category-action-result.type";
import { revalidatePath } from "next/cache";

const createCategoryAction = async (
  params: CreateCategoryParams,
): Promise<CategoryActionResult> => {
  try {
    let createdCategoryId: number | undefined;

    if (params.level === "primary") {
      const createdCategory = await createParentCategory({ name: params.name });
      createdCategoryId = createdCategory?.categoryId;
    } else {
      const createdCategory = await createChildCategory(params.parentCategoryId, {
        name: params.name,
      });
      createdCategoryId = createdCategory?.categoryId;
    }

    revalidatePath("/categories");
    return {
      isSuccess: true,
      message: "카테고리를 추가했습니다.",
      createdCategoryId,
    };
  } catch (error) {
    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message: apiError.message ?? "카테고리 추가에 실패했습니다.",
      code: apiError.code,
    };
  }
};

export default createCategoryAction;
