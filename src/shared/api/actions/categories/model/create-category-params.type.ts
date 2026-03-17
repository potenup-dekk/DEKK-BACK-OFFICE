type CreateCategoryParams =
  | {
      level: "primary";
      name: string;
    }
  | {
      level: "secondary";
      name: string;
      parentCategoryId: number;
    };

export default CreateCategoryParams;
