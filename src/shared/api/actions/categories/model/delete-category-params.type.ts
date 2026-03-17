type DeleteCategoryParams =
  | {
      level: "primary";
      categoryId: number;
      childCategoryIds?: number[];
    }
  | {
      level: "secondary";
      categoryIds: number[];
    };

export default DeleteCategoryParams;
