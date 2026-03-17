import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";

const isApproveCardSuccessCode = (code: string) => {
  switch (code) {
    case "SC200003": {
      return true;
    }
    default: {
      return code.startsWith("SC");
    }
  }
};

const approveCard = async (cardId: number) => {
  const response = await requestApi(`/adm/v1/cards/${cardId}/approve`, {
    method: "PATCH",
  });

  if (isApproveCardSuccessCode(response.code)) {
    return;
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default approveCard;
