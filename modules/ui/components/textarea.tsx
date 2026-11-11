import * as React from "react";

import { cn } from "@ui/lib";
import { fieldClassName } from "./input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldClassName, "min-h-[8.5rem] resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
