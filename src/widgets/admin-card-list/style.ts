import { tv } from "tailwind-variants";

const adminCardListStyle = tv({
  slots: {
    root: "space-y-4",
    filterPanel: "rounded-md border border-border bg-card p-4",
    filterGrid: "flex w-full items-center gap-3 overflow-x-auto pb-1",
    filterItem: "flex min-w-[9rem] flex-col gap-1",
    filterLabel: "text-xs font-medium text-muted-foreground",
    grid: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8",
    card: "group",
    cardImageWrap:
      "relative w-full aspect-[1/1.5] cursor-pointer overflow-hidden rounded-md border border-border bg-muted shadow-sm",
    empty:
      "rounded-md border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground",
    error:
      "rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
    filterActions: "ml-auto flex shrink-0 items-center justify-end gap-2",
  },
});

export default adminCardListStyle;
