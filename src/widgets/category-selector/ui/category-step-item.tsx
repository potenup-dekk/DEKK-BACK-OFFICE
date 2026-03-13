import cn from "@/shared/lib/utils";
import type CategoryStepItemProps from "@/widgets/category-selector/model/category-step-item-props.type";
import categorySelectorStyle from "../style";

const CategoryStepItem = ({
  label,
  isActive,
  selectedCategory,
  onClick,
}: CategoryStepItemProps) => {
  const slots = categorySelectorStyle();

  return (
    <div className={slots.stepItem()}>
      <button
        className={cn(
          slots.stepButton(),
          isActive ? slots.stepButtonActive() : undefined,
        )}
        onClick={onClick}
        type="button"
      >
        {label}
      </button>
      <p className={slots.stepSelectedText()}>
        {selectedCategory ?? "선택 없음"}
      </p>
    </div>
  );
};

export default CategoryStepItem;
