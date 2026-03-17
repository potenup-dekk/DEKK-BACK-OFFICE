import type AdminCardResponse from "@/shared/api/services/cards/model/admin-card-response.type";

interface PageResponseAdminCard {
  content: AdminCardResponse[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export default PageResponseAdminCard;
