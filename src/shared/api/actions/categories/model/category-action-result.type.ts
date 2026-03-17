interface CategoryActionResult {
  isSuccess: boolean;
  message: string;
  code?: string;
  createdCategoryId?: number;
}

export default CategoryActionResult;
