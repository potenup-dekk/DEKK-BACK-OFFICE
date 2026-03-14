import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";
import type CategoryCreateResult from "@/shared/api/services/categories/category-create-result.type";

interface CreateCategoryRequest {
  name: string;
}

const createChildCategory = async (
  parentCategoryId: number,
  payload: CreateCategoryRequest,
) => {
  const response = await requestApi<CategoryCreateResult>(
    `/adm/v1/categories/${parentCategoryId}/sub`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  switch (response.code) {
    case "SCT20101": {
      return response.data;
    }
    default: {
      throw {
        code: response.code,
        message: response.message,
        errors: response.errors,
      } satisfies ApiError;
    }
  }
};

export default createChildCategory;
