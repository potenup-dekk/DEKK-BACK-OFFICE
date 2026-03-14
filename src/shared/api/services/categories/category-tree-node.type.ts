interface CategoryTreeNode {
  categoryId: number;
  name: string;
  children?: CategoryTreeNode[];
}

export default CategoryTreeNode;
