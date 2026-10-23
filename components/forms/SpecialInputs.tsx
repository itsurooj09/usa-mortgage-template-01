import React from "react";
import { clsx } from "clsx";

/**
 * CurrencyInput
 * Renders an input with '$' prefix and formats display with thousands separators
 */
export interface CurrencyInputProps {
  id?: string;
  name?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  id,
  name,
  value,
  onChange,
  min = 0,
  max,
  error,
  placeholder = "0",
  className,
  disabled,
}: CurrencyInputProps) {
  const displayValue = value ? Number(value).toLocaleString("en-US") : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const parsed = raw ? parseInt(raw, 10) : 0;
    if (max !== undefined && parsed > max) {
      onChange(max);
    } else if (parsed < min) {
      onChange(min);
    } else {
      onChange(parsed);
    }
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3.5 pointer-events-none text-slate-500 font-semibold text-sm">
        $
      </span>
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        disabled={disabled}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        className={clsx(
          "w-full rounded-md border bg-white pl-8 pr-3.5 py-2.5 text-sm font-medium text-navy-midnight placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-50",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-border-subtle hover:border-slate-300 focus:border-navy-midnight focus:ring-navy-midnight/15",
          className
        )}
      />
    </div>
  );
}

/**
 * PercentageInput
 */
export interface PercentageInputProps {
  id?: string;
  name?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  className?: string;
}

export function PercentageInput({
  id,
  name,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 0.125,
  error,
  className,
}: PercentageInputProps) {
  return (
    <div className="relative flex items-center">
      <input
        id={id}
        name={name}
        type="number"
        step={step}
        min={min}
        max={max}
        value={value === 0 ? "" : value}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          onChange(isNaN(val) ? 0 : val);
        }}
        className={clsx(
          "w-full rounded-md border bg-white pl-3.5 pr-8 py-2.5 text-sm font-medium text-navy-midnight placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-border-subtle hover:border-slate-300 focus:border-navy-midnight focus:ring-navy-midnight/15",
          className
        )}
      />
      <span className="absolute right-3.5 pointer-events-none text-slate-500 font-semibold text-sm">
        %
      </span>
    </div>
  );
}

/**
 * Select
 */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: string;
}

export function Select({ options, error, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={clsx(
          "w-full appearance-none rounded-md border bg-white px-3.5 py-2.5 pr-9 text-sm text-navy-midnight transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-50",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-border-subtle hover:border-slate-300 focus:border-navy-midnight focus:ring-navy-midnight/15",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Radio Card Group (For multi-step surveys, loan purposes, property types)
 */
export interface RadioCardOption {
  value: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface RadioCardGroupProps {
  name: string;
  options: RadioCardOption[];
  value: string;
  onChange: (val: string) => void;
  columns?: 1 | 2 | 3 | 4;
}

export function RadioCardGroup({
  name,
  options,
  value,
  onChange,
  columns = 2,
}: RadioCardGroupProps) {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={clsx("grid gap-3", colClass)}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              "flex flex-col text-left p-4 rounded-lg border cursor-pointer transition-all duration-200 select-none",
              isSelected
                ? "border-navy-midnight bg-navy-midnight/[0.03] ring-2 ring-navy-midnight/20 shadow-sm"
                : "border-border-subtle bg-white hover:border-slate-300 hover:bg-slate-50/50"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                {opt.icon && <span className="text-navy-midnight">{opt.icon}</span>}
                <span className="text-sm font-semibold text-navy-midnight">{opt.title}</span>
              </span>
              <span
                className={clsx(
                  "w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? "border-navy-midnight bg-navy-midnight"
                    : "border-slate-300 bg-white"
                )}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
            </div>
            {opt.description && (
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {opt.description}
              </p>
            )}
          </label>
        );
      })}
    </div>
  );
}

/**
 * Checkbox
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export function Checkbox({ label, error, className, id, ...props }: CheckboxProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          id={id}
          type="checkbox"
          className={clsx(
            "mt-1 h-4 w-4 rounded border-border-subtle text-navy-midnight focus:ring-navy-midnight/20 focus:ring-offset-0 transition-colors",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        <span className="text-xs text-slate-600 leading-normal">{label}</span>
      </label>
      {error && <p className="text-xs text-red-600 pl-7">{error}</p>}
    </div>
  );
}

/**
 * Multi-Step Progress Bar
 */
export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        {stepLabels && stepLabels[currentStep - 1] && (
          <span className="font-semibold text-navy-midnight">
            {stepLabels[currentStep - 1]}
          </span>
        )}
        <span>{percentage}% Complete</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-navy-midnight transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
