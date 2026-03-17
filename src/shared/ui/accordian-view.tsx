"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import cn from "@/shared/lib/utils";

interface AccordianViewProps {
  children: ReactNode;
  title?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const AccordianView = ({
  children,
  title = "정보 추가/삭제",
  defaultOpen = true,
  className,
}: AccordianViewProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <section className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <button
        aria-expanded={isOpen}
        className="flex items-center justify-between text-left text-2xl font-bold"
        onClick={handleToggle}
        type="button"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isOpen ? "rotate-180" : undefined,
          )}
        />
      </button>

      <div className={cn("min-h-0 flex-1 pt-3", isOpen ? "block" : "hidden")}>
        {children}
      </div>
    </section>
  );
};

export default AccordianView;
