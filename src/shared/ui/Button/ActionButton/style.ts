import { tv } from "tailwind-variants";

const actionButtonStyle = tv({
  base: "cursor-pointer rounded-sm border disabled:cursor-not-allowed disabled:opacity-60",

  variants: {
    color: {
      primary: "text-white bg-primary border-primary",
      secondary: "text-primary bg-white border-primary",
      cancel: "text-white bg-error border-primary",
      disabled: "text-gray bg-white border-gray",
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
