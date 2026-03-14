type DeleteCategoryParams =
  | {
      level: "primary";
      categoryId: number;
    }
  | {
      level: "secondary";
      categoryIds: number[];
    };

export default DeleteCategoryParams;
