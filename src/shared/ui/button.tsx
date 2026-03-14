import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import cn from "@/shared/lib/utils";

const buttonStyle = cva(
  "inline-flex items-center justify-center rounded-sm border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:bg-[#3a3a3a]",
        subtle: "border-border bg-card text-foreground hover:bg-muted",
        danger: "border-red-600 bg-red-700 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        "icon-circle": "h-9 rounded-full px-6",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyle> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonStyle({ variant, size }), className)}
      {...props}
    />
  );
};

export default Button;
