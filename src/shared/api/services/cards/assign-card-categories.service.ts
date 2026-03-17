import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";

interface AssignCardCategoriesRequest {
  categoryIds: number[];
}

const isAssignCardCategoriesSuccessCode = (code: string) => {
  switch (code) {
    case "SC200005": {
      return true;
    }
    default: {
      return code.startsWith("SC");
    }
  }
};

const assignCardCategories = async (
  cardId: number,
  payload: AssignCardCategoriesRequest,
) => {
  const response = await requestApi(`/adm/v1/cards/${cardId}/categories`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (isAssignCardCategoriesSuccessCode(response.code)) {
    return;
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default assignCardCategories;
