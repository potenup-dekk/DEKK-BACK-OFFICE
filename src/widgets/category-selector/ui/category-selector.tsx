"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";

import createCategoryAction from "@/shared/api/actions/categories/create-category.action";
import deleteCategoryAction from "@/shared/api/actions/categories/delete-category.action";
import cn from "@/shared/lib/utils";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import type CategorySelectorProps from "@/widgets/category-selector/model/props.type";
import type {
  CategoryGroup,
  SecondaryCategory,
  CategoryStep,
} from "@/widgets/category-selector/model/category.type";
import CategoryStepSwitcher from "@/widgets/category-selector/ui/category-step-switcher";
import categorySelectorStyle from "../style";

const CategorySelector = ({
  className,
  initialGroups,
  initialFetchErrorMessage,
}: CategorySelectorProps) => {
  const [isPending, startTransition] = useTransition();
  const [groups, setGroups] = useState<CategoryGroup[]>(initialGroups);
  const [currentStep, setCurrentStep] = useState<CategoryStep>("primary");
  const [selectedPrimaryId, setSelectedPrimaryId] = useState<number | null>(null);
  const [selectedSecondaryIds, setSelectedSecondaryIds] = useState<number[]>([]);
  const [draftCategory, setDraftCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const slots = useMemo(() => categorySelectorStyle(), []);

  const activePrimaryId = useMemo(() => {
    if (selectedPrimaryId === null) {
      return null;
    }

    const hasSelectedPrimary = groups.some(
      (group) => group.categoryId === selectedPrimaryId,
    );

    return hasSelectedPrimary ? selectedPrimaryId : null;
  }, [groups, selectedPrimaryId]);

  const selectedPrimaryCategory = useMemo(() => {
    if (activePrimaryId === null) {
      return null;
    }

    return groups.find((group) => group.categoryId === activePrimaryId) ?? null;
  }, [activePrimaryId, groups]);

  const secondaryOptions = useMemo(() => {
    return selectedPrimaryCategory?.children ?? [];
  }, [selectedPrimaryCategory]);

  const selectedSecondaryNames = useMemo(() => {
    return secondaryOptions
      .filter((category) => selectedSecondaryIds.includes(category.categoryId))
      .map((category) => category.name);
  }, [secondaryOptions, selectedSecondaryIds]);

  const handlePrimarySelect = (primaryCategoryId: number) => {
    setSelectedPrimaryId(primaryCategoryId);
    setSelectedSecondaryIds([]);
  };

  const handleSecondarySelect = (secondaryCategoryId: number) => {
    setSelectedSecondaryIds((prev) => {
      if (prev.includes(secondaryCategoryId)) {
        return prev.filter((item) => item !== secondaryCategoryId);
      }

      return [...prev, secondaryCategoryId];
    });
  };

  const createLocalCategoryId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  const executeCategoryAdd = async () => {
    const nextCategory = draftCategory.trim();

    if (!nextCategory) {
      setErrorMessage("카테고리 이름을 입력해주세요.");
      return;
    }

    setErrorMessage(null);

    if (currentStep === "primary") {
      const hasPrimary = groups.some((group) => group.name === nextCategory);

      if (hasPrimary) {
        setErrorMessage("이미 존재하는 1차 카테고리입니다.");
        return;
      }

      const result = await createCategoryAction({
        level: "primary",
        name: nextCategory,
      });

      if (!result.isSuccess) {
        setErrorMessage(result.message);
        return;
      }

      const createdPrimaryCategoryId =
        result.createdCategoryId ?? createLocalCategoryId();

      setGroups((prev) => [
        ...prev,
        {
          categoryId: createdPrimaryCategoryId,
          name: nextCategory,
          children: [],
        },
      ]);
      setSelectedPrimaryId(createdPrimaryCategoryId);
      setSelectedSecondaryIds([]);
      setCurrentStep("secondary");
      setDraftCategory("");
      return;
    }

    if (activePrimaryId === null) {
      setErrorMessage("2차 카테고리를 추가하려면 1차 카테고리를 선택해주세요.");
      return;
    }

    const hasSecondary = secondaryOptions.some(
      (category) => category.name === nextCategory,
    );

    if (hasSecondary) {
      setErrorMessage("이미 존재하는 2차 카테고리입니다.");
      return;
    }

    const result = await createCategoryAction({
      level: "secondary",
      name: nextCategory,
      parentCategoryId: activePrimaryId,
    });

    if (!result.isSuccess) {
      setErrorMessage(result.message);
      return;
    }

    const createdSecondaryCategory: SecondaryCategory = {
      categoryId: result.createdCategoryId ?? createLocalCategoryId(),
      name: nextCategory,
    };

    setGroups((prev) => {
      return prev.map((group) => {
        if (group.categoryId !== activePrimaryId) {
          return group;
        }

        return {
          ...group,
          children: [...group.children, createdSecondaryCategory],
        };
      });
    });
    setSelectedSecondaryIds((prev) => [...prev, createdSecondaryCategory.categoryId]);
    setDraftCategory("");
  };

  const executeCategoryDelete = async () => {
    setErrorMessage(null);

    if (currentStep === "primary") {
      if (activePrimaryId === null) {
        setErrorMessage("삭제할 1차 카테고리를 선택해주세요.");
        return;
      }

      const result = await deleteCategoryAction({
        level: "primary",
        categoryId: activePrimaryId,
      });

      if (!result.isSuccess) {
        setErrorMessage(result.message);
        return;
      }

      setGroups((prev) => {
        return prev.filter((group) => group.categoryId !== activePrimaryId);
      });
      setSelectedPrimaryId(null);
      setSelectedSecondaryIds([]);
      setCurrentStep("primary");
      return;
    }

    if (selectedPrimaryId === null || selectedSecondaryIds.length === 0) {
      setErrorMessage("삭제할 2차 카테고리를 선택해주세요.");
      return;
    }

    const result = await deleteCategoryAction({
      level: "secondary",
      categoryIds: selectedSecondaryIds,
    });

    if (!result.isSuccess) {
      setErrorMessage(result.message);
      return;
    }

    const selectedIds = selectedSecondaryIds;

    setGroups((prev) => {
      return prev.map((group) => {
        if (group.categoryId !== selectedPrimaryId) {
          return group;
        }

        return {
          ...group,
          children: group.children.filter(
            (child) => !selectedIds.includes(child.categoryId),
          ),
        };
      });
    });
    setSelectedSecondaryIds([]);
  };

  const handleCategoryAdd = () => {
    startTransition(() => {
      void executeCategoryAdd();
    });
  };

  const handleCategoryDelete = () => {
    startTransition(() => {
      void executeCategoryDelete();
    });
  };

  return (
    <section className={cn(slots.root(), className)}>
      <CategoryStepSwitcher
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        selectedPrimary={selectedPrimaryCategory?.name ?? null}
        selectedSecondary={selectedSecondaryNames}
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
          disabled={
            isPending ||
            (currentStep === "secondary" && activePrimaryId === null)
          }
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
            isPending ||
            (currentStep === "primary"
              ? activePrimaryId === null
              : selectedSecondaryIds.length === 0)
          }
          onClick={handleCategoryDelete}
          size="icon-circle"
          type="button"
          variant="danger"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {errorMessage ?? initialFetchErrorMessage ? (
        <p className={slots.helperText()}>
          {errorMessage ?? initialFetchErrorMessage}
        </p>
      ) : null}

      {currentStep === "primary" ? (
        <>
          <div className={slots.badgeWrap()}>
            {groups.map((group) => (
              <button
                className={cn(
                  slots.badgeButton(),
                  activePrimaryId === group.categoryId
                    ? slots.badgeButtonSelected()
                    : undefined,
                )}
                key={group.categoryId}
                onClick={() => handlePrimarySelect(group.categoryId)}
                type="button"
              >
                {group.name}
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
                  selectedSecondaryIds.includes(item.categoryId)
                    ? slots.badgeButtonSelected()
                    : undefined,
                )}
                key={item.categoryId}
                onClick={() => handleSecondarySelect(item.categoryId)}
                type="button"
              >
                {item.name}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CategorySelector;
