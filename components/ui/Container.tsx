import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full";
}

export function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  const sizeMap = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1360px]",
    full: "max-w-full",
  };

  return (
    <div
      className={twMerge(
        clsx("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}
