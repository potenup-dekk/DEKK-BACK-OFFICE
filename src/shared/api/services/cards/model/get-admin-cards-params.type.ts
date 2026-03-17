import type AdminCardStatus from "@/shared/api/services/cards/model/admin-card-status.type";

interface GetAdminCardsParams {
  page?: number;
  size?: number;
  sort?: "ASC" | "DESC";
  status?: AdminCardStatus;
  cardId?: number;
  originId?: string;
  startDate?: string;
  endDate?: string;
  categoryIds?: number[];
}

export default GetAdminCardsParams;
