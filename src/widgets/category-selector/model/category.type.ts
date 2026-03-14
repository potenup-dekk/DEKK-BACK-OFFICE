type CategoryStep = "primary" | "secondary";

interface SecondaryCategory {
  categoryId: number;
  name: string;
}

interface CategoryGroup {
  categoryId: number;
  name: string;
  children: SecondaryCategory[];
}

export type { CategoryStep };
export type { SecondaryCategory };
export type { CategoryGroup };
