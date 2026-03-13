import { useMemo } from "react";

import Button from "@/shared/ui/button";
import type CategoryStepSwitcherProps from "@/widgets/category-selector/model/category-step-switcher-props.type";
import CategoryStepItem from "@/widgets/category-selector/ui/category-step-item";
import categorySelectorStyle from "../style";

const CategoryStepSwitcher = ({
  currentStep,
  onStepChange,
  selectedPrimary,
  selectedSecondary,
}: CategoryStepSwitcherProps) => {
  const slots = useMemo(() => categorySelectorStyle(), []);
  const selectedSecondaryText =
    selectedSecondary.length > 0 ? selectedSecondary.join(", ") : null;

  return (
    <div className={slots.stepSwitcher()}>
      <div className={slots.stepSwitcherGroup()}>
        <CategoryStepItem
          isActive={currentStep === "primary"}
          label="1차 카테고리"
          onClick={() => onStepChange("primary")}
          selectedCategory={selectedPrimary}
        />
        <CategoryStepItem
          isActive={currentStep === "secondary"}
          label="2차 카테고리"
          onClick={() => onStepChange("secondary")}
          selectedCategory={selectedSecondaryText}
        />
      </div>

      <Button type="button" variant="primary">
        저장
      </Button>
    </div>
  );
};

export default CategoryStepSwitcher;
