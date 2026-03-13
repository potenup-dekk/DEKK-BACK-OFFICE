interface CategoryStepItemProps {
  label: string;
  isActive: boolean;
  selectedCategory: string | null;
  onClick: () => void;
}

export default CategoryStepItemProps;
