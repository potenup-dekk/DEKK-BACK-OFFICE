import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";

const deleteChildCategory = async (categoryId: number) => {
  const response = await requestApi(`/adm/v1/categories/sub/${categoryId}`, {
    method: "DELETE",
  });

  switch (response.code) {
    case "SCT20003": {
      return;
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

export default deleteChildCategory;
