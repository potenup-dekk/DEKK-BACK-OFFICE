import { tv } from "tailwind-variants";

export const navItemStyle = tv({
  base: "w-full rounded-sm border px-3 py-2 text-left text-sm font-medium transition-colors",
  variants: {
    active: {
      true: "border-primary bg-primary text-white",
      false: "border-gray bg-white text-primary hover:border-primary",
    },
  },
});

export const actionTextButtonStyle = tv({
  base: "cursor-pointer rounded-sm border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white",
});

export const statusBadgeStyle = tv({
  base: "inline-flex rounded-sm border px-2 py-1 text-xs font-medium",
  variants: {
    status: {
      active: "border-primary bg-white text-primary",
      paused: "border-gray bg-white text-gray",
    },
  },
});