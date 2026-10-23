import React from "react";
import { clsx } from "clsx";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  optional,
  helperText,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={htmlFor}
            className="text-xs font-semibold uppercase tracking-wider text-navy-dark"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {optional && (
            <span className="text-xs text-slate-400 font-normal">Optional</span>
          )}
        </div>
      )}
      {children}
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 inline-block flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftPrefix?: React.ReactNode;
  rightSuffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftPrefix, rightSuffix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftPrefix && (
          <div className="absolute left-3.5 pointer-events-none text-slate-500 text-sm font-medium">
            {leftPrefix}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-navy-midnight placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-50 disabled:text-slate-500",
            leftPrefix && "pl-8",
            rightSuffix && "pr-8",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-border-subtle hover:border-slate-300 focus:border-navy-midnight focus:ring-navy-midnight/15",
            className
          )}
          {...props}
        />
        {rightSuffix && (
          <div className="absolute right-3.5 pointer-events-none text-slate-500 text-sm font-medium">
            {rightSuffix}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
