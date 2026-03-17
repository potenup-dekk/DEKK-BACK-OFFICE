import { tv } from "tailwind-variants";

const backofficeHeaderStyle = tv({
  slots: {
    root: "sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6",
    leftGroup: "flex items-center gap-4",
    title: "text-lg font-semibold text-foreground",
    rightGroup: "flex items-center gap-3",
    iconButton:
      "inline-flex size-9 items-center justify-center rounded-sm border border-border bg-card text-foreground hover:bg-muted",
  },
});

export default backofficeHeaderStyle;
