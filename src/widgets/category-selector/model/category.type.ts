type CategoryStep = "primary" | "secondary";

interface CategoryGroup {
  primary: string;
  secondary: string[];
}

export type { CategoryStep };
export type { CategoryGroup };
