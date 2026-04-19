import getCategoryTree from "@/shared/api/services/categories/get-category-tree.service";
import type CategoryTreeNode from "@/shared/api/services/categories/category-tree-node.type";
import CategorySelector from "@/widgets/category-selector";
import type { CategoryGroup } from "@/widgets/category-selector/model/category.type";

interface InitialCategoryGroupsData {
  categoryGroups: CategoryGroup[];
  initialFetchErrorMessage: string | null;
}

const mapToCategoryGroups = (
  categoryTree: CategoryTreeNode[],
): CategoryGroup[] => {
  return categoryTree.map((primaryCategory) => {
    return {
      categoryId: primaryCategory.categoryId,
      name: primaryCategory.name,
      children: (primaryCategory.children ?? []).map((secondaryCategory) => {
        return {
          categoryId: secondaryCategory.categoryId,
          name: secondaryCategory.name,
        };
      }),
    };
  });
};

const loadInitialCategoryGroupsData =
  async (): Promise<InitialCategoryGroupsData> => {
    try {
      const categoryTree = await getCategoryTree();

      return {
        categoryGroups: mapToCategoryGroups(categoryTree),
        initialFetchErrorMessage: null,
      };
    } catch (error) {
      const apiError = error as { message?: string };

      return {
        categoryGroups: [],
        initialFetchErrorMessage:
          apiError.message ?? "카테고리 목록을 불러오지 못했습니다.",
      };
    }
  };

const CategoriesPage = async () => {
  const { categoryGroups, initialFetchErrorMessage } =
    await loadInitialCategoryGroupsData();

  return (
    <CategorySelector
      initialFetchErrorMessage={initialFetchErrorMessage}
      initialGroups={categoryGroups}
    />
  );
};

export default CategoriesPage;
