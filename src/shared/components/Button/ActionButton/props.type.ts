import { MouseEventHandler } from "react";

type Color = "primary" | "secondary" | "cancel" | "disabled";
type Size = "lg" | "md" | "sm";

interface ActionButtonProps {
  label: string;

  color?: Color;
  size?: Size;

  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type { ActionButtonProps };
