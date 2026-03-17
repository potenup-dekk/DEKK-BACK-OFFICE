import type ApiError from "@/shared/api/fetcher/api-error.type";
import requestApi from "@/shared/api/fetcher/request-api";

const isRejectCardSuccessCode = (code: string) => {
  switch (code) {
    case "SC200004": {
      return true;
    }
    default: {
      return code.startsWith("SC");
    }
  }
};

const rejectCard = async (cardId: number) => {
  const response = await requestApi(`/adm/v1/cards/${cardId}/reject`, {
    method: "PATCH",
  });

  if (isRejectCardSuccessCode(response.code)) {
    return;
  }

  throw {
    code: response.code,
    message: response.message,
    errors: response.errors,
  } satisfies ApiError;
};

export default rejectCard;
