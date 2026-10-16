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
          className="w-full h-fit flex flex-col gap-1 items-start justify-center transition-all duration-300"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary transition-all duration-300">{label}</span>
            {error && <span className="text-xs text-red-700 transition-all duration-300"> - {error}</span>}
          </div>

          <div className="w-full h-8 rounded-lg border border-border-subtle focus-within:border-border-hover flex items-center justify-start bg-surface-subtle py-1 px-2 transition-all duration-300">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed transition-all duration-300" />}
            <input
              id={label}
              type="text"
              className="outline-none border-none px-2 w-full text-text-primary text-sm placeholder:text-xs transition-all duration-300"
              placeholder={hint}
              onChange={onChange}
            />
            {TrailingIcon && <TrailingIcon className="w-5 text-text-dimmed transition-all duration-300" />}
          </div>
        </label>
      )}

      {variant == "number" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-1 items-start justify-center transition-all duration-300"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary transition-all duration-300">{label}</span>
            {error && <span className="text-xs text-red-700 transition-all duration-300"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle focus-within:border-border-hover flex items-center justify-start bg-surface-subtle py-1 px-2 transition-all duration-300">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed transition-all duration-300" />}
            <input
              id={label}
              type="number"
              className="outline-none border-none px-2 w-full text-text-primary text-sm placeholder:text-xs transition-all duration-300"
              placeholder={hint}
              onChange={onChange}
            />
            {TrailingIcon && <TrailingIcon className="w-5 text-text-dimmed transition-all duration-300" />}
          </div>
        </label>
      )}

      {variant == "password" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-1 items-start justify-center transition-all duration-300"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary transition-all duration-300">{label}</span>
            {error && <span className="text-xs text-red-700 transition-all duration-300"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle focus-within:border-border-hover flex items-center justify-start bg-surface-subtle py-1 px-2 transition-all duration-300">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed transition-all duration-300" />}
            <input
              id={label}
              type={showPassword ? "text" : "password"}
              className="outline-none border-none px-2 w-full text-text-primary text-sm placeholder:text-xs transition-all duration-300"
              placeholder={hint}
              onChange={onChange}
            />
            {showPassword ? (
              <Eye
                className="w-5 text-text-dimmed cursor-pointer transition-all duration-300"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeClosed
                className="w-5 text-text-dimmed cursor-pointer transition-all duration-300"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </label>
      )}

      {variant == "select" && (
        <label
          htmlFor={label}
          className="w-full h-fit flex flex-col gap-1 items-start justify-center transition-all duration-300"
        >
          <div className="flex w-full gap-0.5 items-center justify-start">
            <span className="text-xs text-text-secondary transition-all duration-300">{label}</span>
            {error && <span className="text-xs text-red-700 transition-all duration-300"> - {error}</span>}
          </div>
          <div className="w-full h-8 rounded-lg border border-border-subtle focus-within:border-border-hover flex items-center justify-start bg-surface-subtle py-1 px-2 transition-all duration-300">
            {LeadingIcon && <LeadingIcon className="w-4 text-text-dimmed transition-all duration-300" />}
            <select
              id={label}
              className="outline-none border-none px-2 w-full text-text-primary text-sm placeholder:text-xs bg-surface-subtle transition-all duration-300"
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
            {TrailingIcon && <TrailingIcon className="w-5 text-text-dimmed transition-all duration-300" />}
          </div>
        </label>
      )}
    </>
  );
};

export default Input;
