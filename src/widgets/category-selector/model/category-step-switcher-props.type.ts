import type { CategoryStep } from "@/widgets/category-selector/model/category.type";

interface CategoryStepSwitcherProps {
  currentStep: CategoryStep;
  onStepChange: (step: CategoryStep) => void;
  selectedPrimary: string | null;
  selectedSecondary: string[];
}

export default CategoryStepSwitcherProps;
