import type AdminCardStatus from "@/shared/api/services/cards/model/admin-card-status.type";

interface AdminCardDetailCategoryChild {
  categoryId: number;
  name: string;
}

interface AdminCardDetailCategory {
  categoryId: number;
  name: string;
  children?: AdminCardDetailCategoryChild[];
}

interface AdminCardDetailImage {
  imageId: number;
  originUrl?: string;
  imageUrl?: string;
}

interface AdminCardDetailProduct {
  productId: number;
  brand: string;
  name: string;
  price?: number;
  option?: string;
  isSimilar?: boolean;
  productUrl: string;
  isActive?: boolean;
  productImage?: AdminCardDetailImage;
}

interface AdminCardDetailResponse {
  cardId: number;
  originId: string;
  status: AdminCardStatus;
  platform: string;
  targetGender: string;
  height: number;
  weight: number;
  tags: string[];
  cardImage?: AdminCardDetailImage;
  products?: AdminCardDetailProduct[];
  categories?: AdminCardDetailCategory[];
  createdAt: string;
  updatedAt: string;
}

export type {
  AdminCardDetailCategory,
  AdminCardDetailCategoryChild,
  AdminCardDetailProduct,
};

export default AdminCardDetailResponse;
