import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cosmicButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-cosmic text-primary-foreground hover:scale-105 shadow-lg hover:shadow-xl",
        hero: "btn-hero text-primary-foreground animate-cosmic-pulse",
        glass: "glass text-foreground hover:bg-muted/20 border hover:border-primary/50",
        gradient: "bg-gradient-cosmic text-primary-foreground hover:scale-105 shadow-lg hover:shadow-xl",
        outline: "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        ghost: "hover:bg-primary/10 hover:text-primary text-muted-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CosmicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cosmicButtonVariants> {
  asChild?: boolean;
}

const CosmicButton = React.forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(cosmicButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
CosmicButton.displayName = "CosmicButton";

export { CosmicButton, cosmicButtonVariants };