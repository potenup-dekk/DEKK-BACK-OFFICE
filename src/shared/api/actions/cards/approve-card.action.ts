"use server";

import type CardManagementActionResult from "@/shared/api/actions/cards/model/card-management-action-result.type";
import type ApproveCardParams from "@/shared/api/actions/cards/model/approve-card-params.type";
import approveCard from "@/shared/api/services/cards/approve-card.service";
import { revalidatePath } from "next/cache";

const approveCardAction = async (
  params: ApproveCardParams,
): Promise<CardManagementActionResult> => {
  try {
    await approveCard(params.cardId);

    revalidatePath("/cards");
    revalidatePath(`/cards/${params.cardId}`);

    return {
      isSuccess: true,
      message: "카드를 승인했습니다.",
    };
  } catch (error) {
    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message: apiError.message ?? "카드 승인에 실패했습니다.",
      code: apiError.code,
    };
  }
};

export default approveCardAction;
