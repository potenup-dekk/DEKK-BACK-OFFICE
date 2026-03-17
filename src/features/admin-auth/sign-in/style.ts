import { tv } from "tailwind-variants";

const signInFormStyle = tv({
  slots: {
    root: "flex flex-col items-center w-full max-w-sm rounded-md border border-border bg-card p-6",
    form: "mt-6 flex flex-col gap-3 w-full",
    errorMessage: "text-center text-sm text-red-600",
  },
});

export default signInFormStyle;
