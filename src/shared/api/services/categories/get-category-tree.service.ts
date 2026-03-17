import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";
import type CategoryTreeNode from "@/shared/api/services/categories/category-tree-node.type";

const isCategoryTreeSuccessCode = (code: string) => {
  switch (code) {
    case "SCT20010": {
      return true;
    }
    default: {
      return code.startsWith("S");
    }
  }
};

const getCategoryTree = async () => {
  const response = await requestApi<CategoryTreeNode[]>("/adm/v1/categories", {
    method: "GET",
  });

  if (isCategoryTreeSuccessCode(response.code)) {
    return Array.isArray(response.data) ? response.data : [];
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default getCategoryTree;
