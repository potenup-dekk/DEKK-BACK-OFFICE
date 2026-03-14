import type { CategoryGroup } from "@/widgets/category-selector/model/category.type";

interface CategorySelectorProps {
  className?: string;
  initialGroups: CategoryGroup[];
  initialFetchErrorMessage?: string | null;
}

export default CategorySelectorProps;
