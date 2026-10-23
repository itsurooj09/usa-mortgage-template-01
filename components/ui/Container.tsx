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
    narrow: "max-w-5xl",
    default: "max-w-[1600px]",
    wide: "max-w-[1600px]",
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
