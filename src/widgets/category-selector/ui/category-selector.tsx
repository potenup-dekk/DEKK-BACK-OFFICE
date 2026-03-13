"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import cn from "@/shared/lib/utils";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import categoryGroups from "@/widgets/category-selector/model/category-options.const";
import type CategorySelectorProps from "@/widgets/category-selector/model/props.type";
import type {
  CategoryGroup,
  CategoryStep,
} from "@/widgets/category-selector/model/category.type";
import CategoryStepSwitcher from "@/widgets/category-selector/ui/category-step-switcher";
import categorySelectorStyle from "../style";

const CategorySelector = ({ className }: CategorySelectorProps) => {
  const [groups, setGroups] = useState<CategoryGroup[]>(categoryGroups);
  const [currentStep, setCurrentStep] = useState<CategoryStep>("primary");
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<string[]>([]);
  const [draftCategory, setDraftCategory] = useState("");

  const slots = useMemo(() => categorySelectorStyle(), []);

  const secondaryOptions = useMemo(() => {
    if (!selectedPrimary) {
      return [];
    }

    return (
      groups.find((group) => group.primary === selectedPrimary)?.secondary ?? []
    );
  }, [groups, selectedPrimary]);

  const handlePrimarySelect = (primaryCategory: string) => {
    setSelectedPrimary(primaryCategory);
    setSelectedSecondary([]);
  };

  const handleSecondarySelect = (secondaryCategory: string) => {
    setSelectedSecondary((prev) => {
      if (prev.includes(secondaryCategory)) {
        return prev.filter((item) => item !== secondaryCategory);
      }

      return [...prev, secondaryCategory];
    });
  };

  const handleCategoryAdd = () => {
    const nextCategory = draftCategory.trim();

    if (!nextCategory) {
      return;
    }

    if (currentStep === "primary") {
      const hasPrimary = groups.some((group) => group.primary === nextCategory);

      if (hasPrimary) {
        return;
      }

      setGroups((prev) => [...prev, { primary: nextCategory, secondary: [] }]);
      setSelectedPrimary(nextCategory);
      setSelectedSecondary([]);
      setCurrentStep("secondary");
      setDraftCategory("");
      return;
    }

    if (!selectedPrimary) {
      return;
    }

    const hasSecondary = secondaryOptions.includes(nextCategory);

    if (hasSecondary) {
      return;
    }

    setGroups((prev) =>
      prev.map((group) => {
        if (group.primary !== selectedPrimary) {
          return group;
        }

        return {
          ...group,
          secondary: [...group.secondary, nextCategory],
        };
      }),
    );
    setSelectedSecondary((prev) => [...prev, nextCategory]);
    setDraftCategory("");
  };

  const handleCategoryDelete = () => {
    if (currentStep === "primary") {
      if (!selectedPrimary) {
        return;
      }

      setGroups((prev) =>
        prev.filter((group) => group.primary !== selectedPrimary),
      );
      setSelectedPrimary(null);
      setSelectedSecondary([]);
      setCurrentStep("primary");
      return;
    }

    if (!selectedPrimary || selectedSecondary.length === 0) {
      return;
    }

    setGroups((prev) =>
      prev.map((group) => {
        if (group.primary !== selectedPrimary) {
          return group;
        }

        return {
          ...group,
          secondary: group.secondary.filter(
            (item) => !selectedSecondary.includes(item),
          ),
        };
      }),
    );
    setSelectedSecondary([]);
  };

  return (
    <section className={cn(slots.root(), className)}>
      <CategoryStepSwitcher
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        selectedPrimary={selectedPrimary}
        selectedSecondary={selectedSecondary}
      />

      <div aria-hidden className={slots.stepDivider()} />

      <div className={slots.addRow()}>
        <Input
          onChange={(event) => setDraftCategory(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return;
            }

            event.preventDefault();
            handleCategoryAdd();
          }}
          placeholder={
            currentStep === "primary"
              ? "1차 카테고리 추가"
              : "2차 카테고리 추가"
          }
          value={draftCategory}
        />
        <Button
          aria-label="카테고리 추가"
          disabled={currentStep === "secondary" && !selectedPrimary}
          onClick={handleCategoryAdd}
          size="icon-circle"
          type="button"
          variant="primary"
        >
          <Plus size={16} />
        </Button>
        <Button
          aria-label="카테고리 삭제"
          disabled={
            currentStep === "primary"
              ? !selectedPrimary
              : selectedSecondary.length === 0
          }
          onClick={handleCategoryDelete}
          size="icon-circle"
          type="button"
          variant="danger"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {currentStep === "primary" ? (
        <>
          <div className={slots.badgeWrap()}>
            {groups.map((group) => (
              <button
                className={cn(
                  slots.badgeButton(),
                  selectedPrimary === group.primary
                    ? slots.badgeButtonSelected()
                    : undefined,
                )}
                key={group.primary}
                onClick={() => handlePrimarySelect(group.primary)}
                type="button"
              >
                {group.primary}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={slots.badgeWrap()}>
            {secondaryOptions.map((item) => (
              <button
                className={cn(
                  slots.badgeButton(),
                  selectedSecondary.includes(item)
                    ? slots.badgeButtonSelected()
                    : undefined,
                )}
                key={item}
                onClick={() => handleSecondarySelect(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CategorySelector;
