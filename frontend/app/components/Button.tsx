import { LucideIcon, Variable } from "lucide-react";
import React from "react";

type Variants = "primary" | "secondary" | "transparent";

interface ButtonProps {
  variant: Variants;
  btnText: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  textColor?: string;
  hoverTextColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  variant,
  btnText,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  textColor,
  hoverTextColor,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <>
      {variant == "primary" && (
        <button
          className={`w-full flex items-center justify-center gap-1 cursor-pointer text-sm ${bgColor ? bgColor : "bg-white"}  ${hoverBgColor ? `hover:${hoverBgColor}` : "hover:bg-white/80"} rounded-lg py-1.5 ${textColor ? textColor : "text-black"} font-medium hover:font-semibold transition-all duration-300 outline-none ${hoverTextColor ? `hover:${hoverTextColor}` : "hover:text-black"} active:scale-95 ${className}`}
          onClick={onClick}
        >
          {LeadingIcon && <LeadingIcon className="w-5" />}
          <span>{btnText}</span>
          {TrailingIcon && <TrailingIcon className="w-5" />}
        </button>
      )}

      {variant == "secondary" && (
        <button
          className={`w-full flex items-center justify-center gap-1 cursor-pointer text-sm ${bgColor ? bgColor : "bg-surface-elevated"}  ${hoverBgColor ? `hover:${hoverBgColor}` : "hover:bg-surface-hover"} border ${borderColor ? borderColor : "border-border-subtle"} ${hoverBorderColor ? `hover:${hoverBorderColor}`:"hover:border-border-hover"} rounded-lg py-1.5 ${textColor ? textColor : "text-text-secondary"} font-medium hover:font-semibold transition-all duration-300 outline-none ${hoverTextColor ? `hover:${hoverTextColor}` : "hover:text-text-secondary"} active:scale-95 ${className}`}
          onClick={onClick}
        >
          {LeadingIcon && <LeadingIcon className="w-5" />}
          <span>{btnText}</span>
          {TrailingIcon && <TrailingIcon className="w-5" />}
        </button>
      )}

      {variant == "transparent" && (
        <button
          className={`w-fit h-fit flex items-center justify-center gap-1 cursor-pointer text-sm rounded-lg ${bgColor ?? "bg-transparent"} ${hoverBgColor ? `hover:${hoverBgColor}` : ""} ${textColor ?? "text-white"} font-medium hover:font-semibold transition-all duration-300 outline-none ${hoverTextColor ? `hover:${hoverTextColor}` : "hover:text-text-dimmed"} active:scale-95 ${className}`}
          onClick={onClick}
        >
          {LeadingIcon && <LeadingIcon className="w-5" />}
          <span>{btnText}</span>
          {TrailingIcon && <TrailingIcon className="w-5" />}
        </button>
      )}
    </>
  );
};

export default Button;
