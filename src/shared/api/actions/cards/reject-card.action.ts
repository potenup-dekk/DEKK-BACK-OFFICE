"use server";

import type CardManagementActionResult from "@/shared/api/actions/cards/model/card-management-action-result.type";
import type RejectCardParams from "@/shared/api/actions/cards/model/reject-card-params.type";
import rejectCard from "@/shared/api/services/cards/reject-card.service";
import { revalidatePath } from "next/cache";

const rejectCardAction = async (
  params: RejectCardParams,
): Promise<CardManagementActionResult> => {
  try {
    await rejectCard(params.cardId);

    revalidatePath("/cards");
    revalidatePath(`/cards/${params.cardId}`);

    return {
      isSuccess: true,
      message: "카드를 반려했습니다.",
    };
  } catch (error) {
    const apiError = error as { code?: string; message?: string };

    return {
      isSuccess: false,
      message: apiError.message ?? "카드 반려에 실패했습니다.",
      code: apiError.code,
    };
  }
};

export default rejectCardAction;
