import { tv } from "tailwind-variants";

const backofficeSidebarStyle = tv({
  slots: {
    root: "flex h-screen flex-col border-r border-[#5a5a5a] bg-primary text-primary-foreground transition-all duration-200",
    brandArea: "flex h-16 items-center gap-2 border-b border-[#5a5a5a] px-4",
    brandDot: "size-2 rounded-full bg-[#f2f2f2]",
    brandText: "text-sm font-semibold tracking-tight",
    collapseButton:
      "ml-auto inline-flex size-7 items-center justify-center rounded-sm bg-[#5a5a5a] text-primary-foreground hover:bg-[#676767]",
    nav: "flex flex-1 flex-col gap-2 p-3",
    navLink:
      "inline-flex h-10 items-center gap-3 rounded-sm px-3 text-sm font-medium text-[#d9d9d9] hover:bg-[#565656] hover:text-[#f2f2f2]",
    navLinkActive: "bg-[#f2f2f2] text-primary",
  },
  variants: {
    collapsed: {
      true: {
        root: "w-20",
        brandArea: "justify-center px-2",
        navLink: "justify-center px-0",
      },
      false: {
        root: "w-64",
      },
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export default backofficeSidebarStyle;
