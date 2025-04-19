import React from "react";
import { cn } from "@/lib/utils";

const TransparentInput = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full h-full bg-transparent border-none outline-none focus:ring-0 focus:border-none focus:outline-none focus-visible:ring-0 p-3",
        className
      )}
      {...props}
    />
  );
};

export { TransparentInput };
