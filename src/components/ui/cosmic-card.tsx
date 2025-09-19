import * as React from "react";
import { cn } from "@/lib/utils";

const CosmicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-glass hover:shadow-2xl", className)}
    {...props}
  />
));
CosmicCard.displayName = "CosmicCard";

const CosmicCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-6", className)}
    {...props}
  />
));
CosmicCardHeader.displayName = "CosmicCardHeader";

const CosmicCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight bg-gradient-cosmic bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
));
CosmicCardTitle.displayName = "CosmicCardTitle";

const CosmicCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CosmicCardDescription.displayName = "CosmicCardDescription";

const CosmicCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pb-6", className)} {...props} />
));
CosmicCardContent.displayName = "CosmicCardContent";

const CosmicCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
));
CosmicCardFooter.displayName = "CosmicCardFooter";

export {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardFooter,
  CosmicCardTitle,
  CosmicCardDescription,
  CosmicCardContent,
};