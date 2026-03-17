import { tv } from "tailwind-variants";

const signInFormStyle = tv({
  slots: {
    root: "w-full max-w-sm rounded-md border border-border bg-card p-6",
    title: "text-center text-lg font-semibold text-foreground",
    form: "mt-6 flex flex-col gap-3",
    errorMessage: "text-center text-sm text-red-600",
  },
});

export default signInFormStyle;
