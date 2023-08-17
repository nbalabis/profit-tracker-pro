import * as React from "react";

import { cn } from "@/lib/utils";

const Selector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-5 rounded-md bg-slate-200 p-1 text-muted-foreground shadow-inner",
      className,
    )}
    {...props}
  />
));
Selector.displayName = "Selector";

interface SelectOptionProps {
  value: string;
  action: (value: string) => void;
  current: string;
  label: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  action,
  current,
  label,
}) => {
  return (
    <p
      onClick={() => action(value)}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        current === value && "bg-background text-foreground shadow-sm",
      )}
    >
      {label}
    </p>
  );
};
SelectOption.displayName = "SelectOption";

export { Selector, SelectOption };
