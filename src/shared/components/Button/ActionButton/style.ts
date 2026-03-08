import clsx from "clsx";
import { tv } from "tailwind-variants";

const actionButtonStyle = tv({
  base: clsx("cursor-pointer", "rounded-sm", "border"),

  variants: {
    color: {
      primary: clsx("text-white bg-primary", "border-primary"),
      secondary: clsx("text-primary bg-white", "border-primary"),
      cancel: clsx("text-white bg-error", "border-primary"),
      disabled: clsx("text-gray bg-white", "border-gray"),
    },

    size: {
      lg: "h-13 text-base min-w-40",
      md: "h-10 text-base min-w-28.75",
      sm: "h-7.5 text-xs min-w-20",
    },
  },

  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export default actionButtonStyle;
