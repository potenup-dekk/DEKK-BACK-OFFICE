import { tv } from "tailwind-variants";

const tagStyle = tv({
  base: "inline-flex m-0.5 px-2 py-1 backdrop-blur-xs bg-[#E4E4E4]/75 rounded-full size-fit",
});

const tagLabelStyle = tv({
  base: "text-[11px] text-black",
});

export { tagStyle, tagLabelStyle };
