import * as React from "react";

import { cn } from "@ui/lib";

/** Shared field styles for Input and Textarea; `aria-invalid` turns the field red. */
export const fieldClassName =
  "flex w-full rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-red-500/70 aria-[invalid=true]:focus-visible:ring-red-500/25";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(fieldClassName, "h-11", className)}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
