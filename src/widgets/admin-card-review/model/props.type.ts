import type CategoryTreeNode from "@/shared/api/services/categories/category-tree-node.type";
import type AdminCardResponse from "@/shared/api/services/cards/model/admin-card-response.type";

interface AdminCardReviewProps {
  card: AdminCardResponse;
  categoryTree: CategoryTreeNode[];
  initialCategoryIds: number[];
}

interface ProductProps {
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
  fallbackImageUrl: string;
}

export type { ProductProps, AdminCardReviewProps };
