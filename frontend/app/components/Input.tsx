import React, { useState } from "react";
import { LucideIcon, Eye, EyeClosed } from "lucide-react";

type Variants = "primary" | "select" | "password" | "number";

interface InputProps {
  variant: Variants;
  label: string;
  hint?: string;
  error?: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  options?: { label: string; value: string }[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const Input = ({
  variant,
  label,
  hint,
  error,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  options,
  onChange,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      {variant == "primary" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-0.5 items-start justify-center"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary">{label}</span>
            {error && <span className="text-xs text-red-700"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle flex items-center justify-start bg-surface-subtle py-1 px-2">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed" />}
            <input
              id={label}
              type="text"
              className="outline-none border-none px-2 w-full text-text-primary text-xs"
              placeholder={hint}
              onChange={onChange}
            />
            {TrailingIcon && <TrailingIcon className="w-5 text-text-dimmed" />}
          </div>
        </label>
      )}

      {variant == "number" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-0.5 items-start justify-center"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary">{label}</span>
            {error && <span className="text-xs text-red-700"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle flex items-center justify-start bg-surface-subtle py-1 px-2">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed" />}
            <input
              id={label}
              type="number"
              className="outline-none border-none px-2 w-full text-text-primary text-xs"
              placeholder={hint}
              onChange={onChange}
            />
            {TrailingIcon && <TrailingIcon className="w-5 text-text-dimmed" />}
          </div>
        </label>
      )}

      {variant == "password" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-0.5 items-start justify-center"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary">{label}</span>
            {error && <span className="text-xs text-red-700"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle flex items-center justify-start bg-surface-subtle py-1 px-2">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed" />}
            <input
              id={label}
              type={showPassword ? "text" : "password"}
              className="outline-none border-none px-2 w-full text-text-primary text-xs"
              placeholder={hint}
              onChange={onChange}
            />
            {showPassword ? (
              <Eye
                className="w-5 text-text-dimmed cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeClosed
                className="w-5 text-text-dimmed cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </label>
      )}

      {variant == "select" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-0.5 items-start justify-center"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary">{label}</span>
            {error && <span className="text-xs text-red-700"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle flex items-center justify-start bg-surface-subtle py-1 px-2">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed" />}
            <select
              id={label}
              className="outline-none border-none px-2 w-full text-text-primary text-xs bg-surface-subtle"
              onChange={onChange}
              defaultValue=""
            >
              <option value="" disabled>
                {hint ?? `Select ${label.toLowerCase()}`}
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {TrailingIcon && <TrailingIcon className="w-5 text-text-dimmed" />}
          </div>
        </label>
      )}
    </>
  );
};

export default Input;
