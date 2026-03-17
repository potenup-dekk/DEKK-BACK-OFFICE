import { tv } from "tailwind-variants";

const adminCardReviewStyle = tv({
  slots: {
    root: "relative flex h-full min-h-0 w-full min-w-0 gap-0 overflow-hidden rounded-md border border-border bg-card",
    leftPane: "flex h-full min-h-0 min-w-0 flex-1 flex-col gap-5 p-5",
    alertStack:
      "pointer-events-none absolute right-5 top-5 z-20 flex max-w-xs flex-col gap-2",
    alertItem:
      "rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 shadow-sm",
    pageControlArea: "flex w-full items-center justify-start",
    backLink:
      "inline-flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
    backLinkIcon: "h-5 w-5",
    cardArea:
      "flex h-full min-h-0 w-full min-w-0 flex-1 flex-nowrap items-center justify-center gap-5 overflow-x-auto pb-1",
    previewColumn: "shrink-0 space-y-2",
    imageCard:
      "relative w-72 aspect-1/1.5 overflow-hidden rounded-md border border-border bg-muted shadow-sm xl:w-80",
    infoCard:
      "flex w-72 aspect-1/1.5 flex-col overflow-hidden rounded-md border border-border bg-white shadow-sm xl:w-80",
    backBody: "flex-1 space-y-3 p-3",
    productList: "space-y-2",
    productPreview:
      "flex items-start gap-2 rounded-sm border border-border bg-card p-2",
    productThumb:
      "relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-border bg-muted",
    productMeta: "min-w-0 flex-1 space-y-1",
    productBrand: "truncate text-[11px] font-semibold text-muted-foreground",
    productName: "line-clamp-2 text-xs font-medium",
    productLink:
      "inline-flex h-7 items-center rounded-sm border border-border px-2 text-[11px] font-semibold",
    backHint:
      "rounded-sm border border-border bg-muted px-2 py-1 text-xs text-muted-foreground",
    loginActionRow: "grid grid-cols-2 gap-2",
    loginButton:
      "inline-flex h-8 items-center justify-center rounded-sm border border-border bg-card text-[11px] font-semibold text-muted-foreground",
    backTagArea: "bg-white p-3",
    infoTitle: "text-sm font-semibold",
    chipWrap: "flex flex-wrap gap-1",
    rightPane:
      "flex h-full min-h-0 w-1/4 min-w-[14rem] shrink-0 flex-col border-l border-border p-5",
    categoryArea: "h-full min-h-0 w-full space-y-4 overflow-y-auto pr-1",
    categoryColumn: "space-y-2",
    categoryEmptyText: "text-xs text-muted-foreground",
    categoryGroupTitle: "text-lg font-bold text-foreground",
    categoryButton:
      "rounded-sm border border-border bg-card px-2 py-1 text-xs transition-colors hover:border-primary",
    categoryButtonActive: "border-primary bg-primary text-primary-foreground",
    footer: "mt-auto space-y-2 border-t border-border pt-3",
    actionRow: "flex gap-2",
    notice: "rounded-sm border border-border bg-muted px-2 py-1 text-xs",
    error:
      "rounded-sm border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700",
    success:
      "rounded-sm border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-700",
  },
});

const productStyle = tv({
  slots: {
    root: "flex h-fit justify-center gap-3",
    image: "size-10 rounded-lg",
    content: "flex flex-col flex-1 justify-between",
    brand: "text-sm font-bold text-black",
    name: "text-[11px] text-black",
  },
});

export { adminCardReviewStyle, productStyle };
