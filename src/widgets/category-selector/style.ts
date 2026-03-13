import { tv } from "tailwind-variants";

const categorySelectorStyle = tv({
  slots: {
    root: "space-y-4 rounded-md border border-border bg-card p-5",
    title: "text-base font-semibold text-foreground",
    stepSwitcher: "flex items-start justify-between gap-3",
    stepSwitcherGroup: "flex items-start gap-3",
    stepItem: "flex flex-col gap-1",
    stepButton:
      "bg-transparent p-0 text-3xl font-bold text-[#8a8a8a] transition-colors hover:text-foreground",
    stepButtonActive: "text-primary",
    stepSelectedText: "text-sm text-muted-foreground",
    stepDivider: "h-px w-full bg-border",
    addRow: "flex items-center gap-2",
    helperText: "text-sm text-muted-foreground",
    badgeWrap: "flex flex-wrap gap-2",
    badgeButton:
      "rounded-sm border border-border bg-[#d8d8d8] px-2.5 py-1 text-xs font-medium text-[#3e3e3e] transition-colors hover:bg-[#c9c9c9]",
    badgeButtonSelected: "border-primary bg-primary text-primary-foreground",
    summaryBox: "rounded-sm border border-border bg-muted p-3 text-sm",
  },
});

export default categorySelectorStyle;
