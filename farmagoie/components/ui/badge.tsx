import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#0057B8] text-white hover:bg-[#0057B8]/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-foreground",
        critico: "border-transparent bg-red-100 text-red-700 border-red-200",
        alto: "border-transparent bg-orange-100 text-orange-700 border-orange-200",
        medio: "border-transparent bg-yellow-100 text-yellow-700 border-yellow-200",
        baixo: "border-transparent bg-green-100 text-green-700 border-green-200",
        success: "border-transparent bg-green-100 text-green-700 border-green-200",
        info: "border-transparent bg-blue-100 text-blue-700 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
