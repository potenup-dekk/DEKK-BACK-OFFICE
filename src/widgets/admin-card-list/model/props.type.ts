import type GetAdminCardsParams from "@/shared/api/services/cards/model/get-admin-cards-params.type";
import type PageResponseAdminCard from "@/shared/api/services/cards/model/page-response-admin-card.type";

interface AdminCardListProps {
  initialPage: PageResponseAdminCard;
  initialFilters: GetAdminCardsParams;
  initialFetchErrorMessage?: string | null;
}

export default AdminCardListProps;
