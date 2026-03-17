import type AdminCardCategory from "@/shared/api/services/cards/model/admin-card-category.type";
import type AdminCardProduct from "@/shared/api/services/cards/model/admin-card-product.type";
import type AdminCardStatus from "@/shared/api/services/cards/model/admin-card-status.type";

interface AdminCardResponse {
  cardId: number;
  originId: string;
  status: AdminCardStatus;
  platform: string;
  targetGender: string;
  height: number;
  weight: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  cardImageUrl?: string;
  products?: AdminCardProduct[];
  categoryIds?: number[];
  categories?: AdminCardCategory[];
}

export default AdminCardResponse;
