import * as React from "react"
import { cn } from "@/lib/utils"

function Container({ className, children, size = "default", ...props }) {
    return (
        <div
        className={cn(
            "container",
            {
            "max-w-screen-sm": size === "small",
            "max-w-screen-md": size === "medium",
            "max-w-screen-lg": size === "large",
            "max-w-screen-xl": size === "xl",
            "max-w-screen-2xl": size === "2xl",
            },
            className
        )}
        {...props}
        >
        {children}
        </div>
    )
}

export { Container };
